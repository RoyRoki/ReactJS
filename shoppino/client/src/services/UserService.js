import axios from "axios";

class UserService {

    async updateUserDetails(data, user_id) {
        console.log(data, "in userservice")
        try {
            const response = await axios.put(
                `http://localhost:8080/user/update/${user_id}`,
                data,
                {withCredentials: true},
            )
            console.log(response.data);
            return response.data;
            
        } catch(error) {
            throw error; 
        }
    }
}

export default new UserService();