import { ActionTypes } from "../constants/action-types";
const intialState = {
  products: [],
};

const initialUsers = {
  userslist: []
}

const userDetails = {
  userdetails: [{ id: "-1", userId: "-1", username: "", password: "" }]
}

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const setuserlistreducer = (state = initialUsers, {type, payload}) => {
  // console.log(type);
  switch(type) {
    case ActionTypes.SET_USERLIST:
      return {...state, userslist: payload};
    default:
      return state;
  }
}

export const userreducer = (state = userDetails, {type, payload}) => {
  // console.log(type);
  switch(type) {
    case ActionTypes.SET_USER:
      return {...state, userdetails: payload};
    default:
      return state;
  }
}