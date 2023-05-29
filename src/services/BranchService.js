import axios from "axios";


const url='http://localhost:8080/';

 class BranchService {
    getBranchesByBusinessId(id){ 
        return axios.get(url + "branches/"+id);    
      }
    
    
}
export default new BranchService