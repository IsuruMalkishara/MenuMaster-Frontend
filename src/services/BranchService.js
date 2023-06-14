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
      return axios.post("http://localhost:3003/branch",data);
    }

    updateBranch(id,data){
      return axios.put("http://localhost:3003/branch/"+id,data);
    }

    deleteBranch(id){
      return axios.delete("http://localhost:3003/branch/"+id);
    }
    
}
export default new BranchService