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

      updateItem(id,data){
        return axios.put("http://localhost:3003/item/"+id,data);
      }

      deleteItem(id){
        return axios.delete("http://localhost:3003/item/"+id);
      }

    
}
export default new ItemService