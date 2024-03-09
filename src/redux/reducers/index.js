import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer, setuserlistreducer, userreducer } from "./productsReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  userlist: setuserlistreducer,
  userDetails: userreducer
});
export default reducers;