import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getData, createNewItem, deleteItemRequest} from '../hooks/http.hook';
export const setRows = createAsyncThunk('table/setRows', () =>{
 return getData()
});

export const deleteItem = createAsyncThunk('table/deleteItem', (id:number) => {
  return deleteItemRequest(id)
})

export const tableSlice = createSlice({
    name: 'table',
    initialState: {
      rows:[],
      nextId:1
    },
    reducers: {
      addRow: (state, action:object) => {
        // @ts-ignore
        state.rows.push(action.payload);
        state.nextId = state.nextId + 1 ;
        
      },
      deleteRow: (state, action) => {
       // @ts-ignore
      state.rows = state.rows.filter((el) => el.id !== action.payload);
      
      },
    },
    extraReducers:builder => {
      builder.addCase(setRows.fulfilled,(state, action) => {
        state.rows = action.payload;
        state.nextId = action.payload.at(-1).id + 1;
        
      });
  }
});
  export const { addRow, deleteRow} = tableSlice.actions
  
  export default tableSlice.reducer