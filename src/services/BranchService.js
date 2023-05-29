import axios from "axios";


const url='http://localhost:8080/';

 class BranchService {
    getBranchesByBusinessId(id){ 
        return axios.get(url + "branches/"+id);    
      }

    getBranchById(id){
      return axios.get(url+"branch/"+id);
    }  
    
    
}
export default new BranchService