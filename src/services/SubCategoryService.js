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
    
}
export default new SubCategoryService