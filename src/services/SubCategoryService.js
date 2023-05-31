import axios from "axios";


const url='http://localhost:3003/';

 class SubCategoryService {

    getSubCategoriesByCategoryId(id){ 
        console.warn("get sub categories by category id")
        return axios.get(url + "subcategories/"+id);    
      }
   
    
}
export default new SubCategoryService