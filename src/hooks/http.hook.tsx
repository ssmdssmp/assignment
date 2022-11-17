import axios from "axios";

export const getData = () =>
  axios.get("http://localhost:3001/items").then((res) => res.data);
export const createNewItem = (newItem:object) =>
  axios.post("http://localhost:3001/items", newItem);
export const deleteItemRequest = (id:number) => 
  axios.delete(`http://localhost:3001/items/${id}`)