import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./tableSlice";
export default configureStore({
  reducer: {
    table:tableSlice
  },
});
