import axios from "axios";


const url='http://localhost:8080/';

 class CategoryService {
    getCategoriesByMenuId(id){ 
        return axios.get(url + "categories/"+id);    
      }

      getCategoryById(id){ 
        return axios.get( url+"category/"+id);    
      }
     
    
      addCategory(data){
        return axios.post(url+"category",data);
      }

      updateCategory(id,data){
        return axios.put(url+"category/"+id,data);
      }

      deleteCategory(id){
        return axios.delete(url+"category/"+id);
      }
    
}
export default new CategoryService