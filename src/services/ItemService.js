import axios from "axios";


const url='http://localhost:3003/';

 class ItemService {

    getItemsBySubCategoryId(id){ 
        return axios.get("http://localhost:3003/sub/"+id+"/item");    
      }

      getItemsByCategoryId(id){ 
        return axios.get("http://localhost:3003/category/"+id+"/item");    
      }
   
    
}
export default new ItemService