import axios from "axios";


const url='http://localhost:8080/';

 class MenuService {
    getMenusByBranchId(id){ 
        return axios.get(url + "menus/"+id);    
      }

    
    
    
}
export default new MenuService