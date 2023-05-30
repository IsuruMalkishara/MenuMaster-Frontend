import axios from "axios";


const url='http://localhost:8080/';

 class CategoryService {
    getCategoriesByMenuId(id){ 
        return axios.get(url + "categories/"+id);    
      }

     
    
    
}
export default new CategoryService