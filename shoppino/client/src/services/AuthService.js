import axios from "axios";

class AuthService {
    async login(data) {
        try {
            console.log("In AuthService in Try ", data.username,data.password);
            const response = await axios.post(
                    'http://localhost:8080/auth/login',
                    {username: data.username, password: data.password,},
                    {withCredentials: true},
                );
            return response.data;
        
        } catch (error) {
            throw new Error(error.response.data.message || 'Login failed');
        };
    }

    async register(data) {
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/signup',
                {username:data.username, email:data.email, password:data.password},
                {withCredentials: true},
            );
            return response.data;
        } catch(error) {
            throw new Error(error.response.data.message || 'Register failed');
        };
         
        
    }

    async logout() {
        return axios.post(
            '/auth/userout',
            {withCredentials: true},
        ).then((response) => {
            return response.data;
        }).catch((error) => {
            throw new Error(error.response.data.message || 'Logout failed');
        });
    }
}

export default new AuthService();