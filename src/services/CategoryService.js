import axios from "axios";


const url='http://localhost:8080/';

 class CategoryService {
    getCategoriesByMenuId(id){ 
        return axios.get(url + "categories/"+id);    
      }

      getCategoryById(id){ 
        return axios.get( "http://localhost:3003/category/"+id);    
      }
     
    
      addCategory(data){
        return axios.post("http://localhost:3003/category",data);
      }

      updateCategory(id,data){
        return axios.put("http://localhost:3003/category/"+id,data);
      }

      deleteCategory(id){
        return axios.delete("http://localhost:3003/category/"+id);
      }
    
}
export default new CategoryService