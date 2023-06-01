import axios from "axios";


const url='http://localhost:3003/';

 class ItemService {

    getItemsBySubCategoryId(id){ 
        return axios.get("http://localhost:3003/sub/"+id+"/item");    
      }

      getItemsByCategoryId(id){ 
        return axios.get("http://localhost:3003/category/"+id+"/item");    
      }
   
      addItem(data){
        return axios.post("http://localhost:3003/item",data);
      }
    
}
export default new ItemService