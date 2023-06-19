import axios from "axios";


const url='http://localhost:8080/';

 class ItemService {

    getItemsBySubCategoryId(id){ 
        return axios.get(url+"sub/"+id+"/item");    
      }

      getItemsByCategoryId(id){ 
        return axios.get(url+"category/"+id+"/item");    
      }
   
      addItem(data){
        return axios.post(url+"item",data);
      }

      updateItem(id,data){
        return axios.put(url+"item/"+id,data);
      }

      deleteItem(id){
        return axios.delete(url+"item/"+id);
      }

    
}
export default new ItemService