package com.camino.camino_v1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.camino.camino_v1.repository")
public class CaminoV1Application {
    /*
	 * @author roki roy date 25sep 2024
	 */
	public static void main(String[] args) {
		SpringApplication.run(CaminoV1Application.class, args);
	}

}

