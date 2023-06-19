import axios from "axios";


const url='http://localhost:8080/';

 class SubCategoryService {

    getSubCategoriesByCategoryId(id){ 
        console.warn("get sub categories by category id")
        return axios.get(url + "subcategories/"+id);    
      }
   
      getSubCategoryById(id){ 
        return axios.get( url+"subcategory/"+id);    
      }

      addSubCategory(data){
        return axios.post(url+"subcategory",data);
      }

      updateSubCategory(id,data){
        return axios.put(url+"subcategory/"+id,data);
      }

      deleteSubCategory(id){
        return axios.delete(url+"subcategory/"+id);
      }
    
}
export default new SubCategoryService