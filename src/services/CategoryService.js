import axios from "axios";


const url='http://localhost:8080/';

 class CategoryService {
    getCategoriesByMenuId(id){ 
        return axios.get(url + "categories/"+id);    
      }

      getCategoryById(id){ 
        return axios.get( "http://localhost:3003/category/"+id);    
      }
     
    
    
}
export default new CategoryService