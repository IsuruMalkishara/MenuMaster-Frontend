import axios from "axios";


const url='http://localhost:8080/';

 class BackgroundService {
    addBackground(data){ 
        return axios.post("http://localhost:3003/background",data);    
      }

    getBackground(id){
      return axios.get("http://localhost:3003/background/"+id);
    }  
    updateBackground(id,data){
      return axios.put("http://localhost:3003/background/"+id,data);
    }

    removeBackground(id){
      return axios.delete("http://localhost:3003/background/"+id);
    }

    addBackgrountToBranch(data){ 
        return axios.post("http://localhost:3003/background/branch",data);    
      }

    getBackgrountOfBranch(id){
      return axios.get("http://localhost:3003/background/branch/"+id);
    }  
    updateBackgroundOfBranch(id,data){
      return axios.put("http://localhost:3003/background/branch/"+id,data);
    }

    removeBackgroundOfBranch(id){
      return axios.delete("http://localhost:3003/background/branch/"+id);
    }
    
}
export default new BackgroundService