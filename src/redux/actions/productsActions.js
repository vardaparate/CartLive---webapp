import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const setuserlist = (userlist) => {
  return {
    type: ActionTypes.SET_USERLIST,
    payload: userlist
  }
}

export const setuser = (userDetails) => {
  return {
    type: ActionTypes.SET_USER,
    payload: userDetails
  }
}