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
        return axios.post("http://localhost:3003/menu",data);
      }

      updateMenu(id,data){
        return axios.put("http://localhost:3003/menu/"+id,data);
      }

      deleteMenu(id){
        return axios.delete("http://localhost:3003/menu/"+id);
      }

    
    
    
}
export default new MenuService