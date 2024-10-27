package com.camino.camino_v1.config;

import java.io.IOException;

import org.springframework.context.ApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.camino.camino_v1.model.RefreshToken;
import com.camino.camino_v1.repository.UserRepository;
import com.camino.camino_v1.service.JWTService;
import com.camino.camino_v1.service.MyUserDetailsService;
import com.camino.camino_v1.service.RefreshTokenService;
import com.camino.camino_v1.util.AppConstants;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    @Autowired
    private JWTService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ApplicationContext context;

    @Autowired
    AppConstants appConstants;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {


        String requestURI = request.getRequestURI();
        logger.info("/{} hit",requestURI);
        // Allow access to public URLs without checking JWT
        if(isPublicUrl(requestURI)) {
            logger.info("Accessing public URL: {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }
        
        String accessToken = null;
        String refreshToken = null;
        UserDetails userDetails = null;
        String email = null;

        accessToken = extracJwtToken(request);
        boolean validJwtToken = tryCheckJwtExpirey(accessToken);

        if(accessToken == null || !validJwtToken) {
            refreshToken = getTokenFromCookie("RefreshToken", request);

            if(refreshToken != null) {
                RefreshToken refreshTokenEntity = refreshTokenService.varifyExpiration(refreshToken);
                if(refreshTokenEntity != null) {
                    // Refresh token is valid, create a new JWT
                   accessToken = setNewTokensReturnJWT(response, refreshTokenEntity.getUser().getId()); //set new token and update jwt
                }
            } else {
                logger.info("Need Login (No cookie found return;)");
                clearCookies(response);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Refresh token expired");
                return;  
            }
        }

        // Process with the valid access token
            email = jwtService.extractEmail(accessToken);
            logger.info(email+" extract from jtw token");

            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            userDetails = context.getBean(MyUserDetailsService.class)
                                 .loadUserByUsername(email);
                if(jwtService.validateToken(accessToken, userDetails)) {

                     UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken
                                (email, null, userDetails.getAuthorities());
                    
                    authToken.setDetails(new WebAuthenticationDetailsSource()
                                            .buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Authentication successful with valid access token");
                }
              }  
            
        filterChain.doFilter(request, response);
        
  }

    private String extracJwtToken(HttpServletRequest request) {

         String authHeader = request.getHeader("Authorization");

         if(authHeader != null && authHeader.startsWith("Bearer ")) {
             return authHeader.substring(7);
         }
        return getTokenFromCookie("Authorization", request); //not in header then use cookie

    }

    
    public String getTokenFromCookie(String tokenName , HttpServletRequest request) {
        Cookie cookies[] = request.getCookies();
            if(cookies != null) {
                for(Cookie cookie : cookies) {
                    if(tokenName.equals(cookie.getName())){                           
                        return cookie.getValue();
                    }
                }
            }
        logger.info("No cookies in request");
        return null;                
    }

    public String setNewTokensReturnJWT(HttpServletResponse response, long user_id) {

        RefreshToken newRefToken = refreshTokenService.createRefreshToken(user_id);
        String newJwtToken = jwtService.generateToken(userRepository.getReferenceById(user_id).getEmail());

        Cookie refreshTokenCookie = new Cookie("RefreshToken", newRefToken.getToken());
            refreshTokenCookie.setMaxAge(appConstants.getJWT_REFRESHCOOKIE_EXPIRATION_TIME());
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setHttpOnly(false); //@TODO true

        Cookie jwtTokenCookie = new Cookie("Authorization", newJwtToken);
            jwtTokenCookie.setMaxAge(appConstants.getJWT_ACCESSCOOKIE_EXPIRATION_TIME());
            jwtTokenCookie.setPath("/");
            jwtTokenCookie.setHttpOnly(false); //@TODO true

        response.addCookie(refreshTokenCookie);
        response.addCookie(jwtTokenCookie);

        return newJwtToken;
    }

    public boolean tryCheckJwtExpirey(String jwtToken) {
        if(jwtToken == null) return false;
        try {
           return !jwtService.isTokenExpired(jwtToken);
        } catch (Exception e) {
            return false;
        }
    }

    private void clearCookies(HttpServletResponse response) {
        // Clear both JWT and refresh token cookies
        Cookie jwtCookie = new Cookie("Authorization", null);
        jwtCookie.setMaxAge(0); 
        jwtCookie.setPath("/");
    
        Cookie refreshTokenCookie = new Cookie("RefreshToken", null);
        refreshTokenCookie.setMaxAge(0); 
        refreshTokenCookie.setPath("/");
    
        response.addCookie(jwtCookie);
        response.addCookie(refreshTokenCookie);
    }

    public boolean isPublicUrl(String requestUrl) {
        for (String publicUrl : appConstants.getPublicEndpoints()) {
            if (requestUrl.startsWith(publicUrl.trim())) {
                return true;
            }
        }
        return false;
    }
}
