import axios from "axios";


const url='http://localhost:8080/';

 class BranchService {
    getBranchesByBusinessId(id){ 
        return axios.get(url + "branches/"+id);    
      }

    getBranchById(id){
      return axios.get(url+"branch/"+id);
    }  
    addBranch(data){
      return axios.post(url+"branch",data);
    }

    updateBranch(id,data){
      return axios.put(url+"branch/"+id,data);
    }

    deleteBranch(id){
      return axios.delete(url+"branch/"+id);
    }
    
}
export default new BranchService