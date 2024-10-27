import axios from "axios";

class AuthService {
    async login(data) {
        try {
            console.log("In AuthService in Try ", data.username,data.password);
            const response = await axios.post(
                    'http://localhost:8080/auth/login',
                    {email: data.email, password: data.password,},
                    {withCredentials: true},
                );
            return response.data;
        
        } catch (error) {
            throw new Error(error.response.data.message || 'Login failed');
        };
    }

    async register(data) {
        console.log("attend to register")
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
            'http://localhost:8080/auth/userout',
            {withCredentials: true},
        ).then((response) => {
            return response.data;
        }).catch((error) => {
            throw new Error(error.response.data.message || 'Logout failed');
        });
    }

    async getUser() {
        try {
            const response = await axios.get(
                'http://localhost:8080/auth/user',
                {withCredentials: true},
            );
            console.log("/user hit , "+response)
            if(!response.data) {
                return null;
            }
            return response.data;            
        } catch(error) {
            console.log("faild to /user so login ")
            return null;
        }

    }
}

export default new AuthService();