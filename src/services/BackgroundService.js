import axios from "axios";


const url='http://localhost:8080/';

 class BackgroundService {
    

    getBackground(id){
      return axios.get(url+"background/"+id);
    }  
    updateBackground(id,data){
      return axios.put(url+"background/"+id,data);
    }

    removeBackground(id){
      return axios.delete(url+"background/"+id);
    }


    getBackgrountOfBranch(id){
      return axios.get(url+"background/branch/"+id);
    }  
    updateBackgroundOfBranch(id,data){
      return axios.put(url+"background/branch/"+id,data);
    }

    removeBackgroundOfBranch(id){
      return axios.delete(url+"background/branch/"+id);
    }
    
}
export default new BackgroundService