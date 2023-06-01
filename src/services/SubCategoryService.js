import axios from "axios";


const url='http://localhost:3003/';

 class SubCategoryService {

    getSubCategoriesByCategoryId(id){ 
        console.warn("get sub categories by category id")
        return axios.get(url + "subcategories/"+id);    
      }
   
      getSubCategoryById(id){ 
        return axios.get( "http://localhost:3003/subcategory/"+id);    
      }

      addSubCategory(data){
        return axios.post("http://localhost:3003/subcategory",data);
      }

      updateSubCategory(id,data){
        return axios.put("http://localhost:3003/subcategory/"+id,data);
      }

      deleteSubCategory(id){
        return axios.delete("http://localhost:3003/subcategory/"+id);
      }
    
}
export default new SubCategoryService