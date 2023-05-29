import axios from "axios";


const url='http://localhost:8080/';

 class UserService {
    login(user){ 
        return axios.post(url + "login", user);    
      }
    addUser(data){
        return axios.post(url+"signup",data);
      }

      getUserById(id){
        return axios.get(url+"user/"+id);
      }
    
}
export default new UserService