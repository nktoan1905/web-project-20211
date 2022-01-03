import { configureStore } from "@reduxjs/toolkit";
import inactiveReducer from "../components/SideMenu/inactiveSlice";
const rootReducer = {
  status: inactiveReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
