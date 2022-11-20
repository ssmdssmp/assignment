import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, deleteItemRequest } from "../hooks/requests";
export const setRows = createAsyncThunk("table/setRows", () => {
  return getData();
});

export const deleteItem = createAsyncThunk("table/deleteItem", (id: number) => {
  return deleteItemRequest(id);
});

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    rows: [],
    nextId: 1,
    isOpenForm: false,
  },
  reducers: {
    handleIsOpenForm: (state) => {
      state.isOpenForm = !state.isOpenForm;
    },
    addRow: (state, action: object) => {
      // @ts-ignore
      state.rows.push(action.payload);
      state.nextId = state.nextId + 1;
    },
    deleteRow: (state, action) => {
      // @ts-ignore
      state.rows = state.rows.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setRows.fulfilled, (state, action) => {
      state.rows = action.payload;
      state.nextId = action.payload.at(-1).id + 1;
    });
  },
});
export const { addRow, deleteRow, handleIsOpenForm } = tableSlice.actions;

export default tableSlice.reducer;
