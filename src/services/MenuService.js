import axios from "axios";


const url='http://localhost:8080/';

 class MenuService {
    getMenusByBranchId(id){ 
        return axios.get(url + "menus/"+id);    
      }

      getMenusById(id){ 
        return axios.get(url + "menu/"+id);    
      }

      addMenu(data){
        return axios.post(url+"menu",data);
      }

      updateMenu(id,data){
        return axios.put(url+"menu/"+id,data);
      }

      deleteMenu(id){
        return axios.delete(url+"menu/"+id);
      }

    
    
    
}
export default new MenuService