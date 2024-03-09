import React, { useEffect } from "react";
import axios from "axios";
import api from '../api/axios_file';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeSelectedProduct, setuserlist } from "../redux/actions/productsActions";

const ProductDetails = () => {

  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  let user = useSelector((state) => state.userDetails.userdetails);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    const response = await api.get(`/productlist/${id}`);
    // const response = await axios
      // .get(`https://fakestoreapi.com/products/${id}`)
      // .catch((err) => {
      //   console.log("Err: ", err);
      // });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  
  const addToCart = async () => {
    
    let response = await api.get(`/userlist/${user.id}`);
    let useritem = response.data;

    let cart = useritem.cart;
    var exists = cart.some((item) => {
      return item.id === productId;
    })

    if(exists === true)
    {
      cart.map((item) => {
        if(item.id == productId) item.count += 1;
      });
    }
    else
    {
    cart.push(product);
    cart.map((item) => {
      if(item.id == productId) item.count = 1;
    })
  }

    let {id, userid, password, username, totalprice} = useritem;
    var newuseritem = {
      userid: userid,
      username: username,
      password: password,
      totalprice: totalprice+price,
      id: id,
      cart: cart
    }
    const respons = await api.put(`/userlist/${id}`, newuseritem);
    const respon = await api.get('/userlist');
    dispatch(setuserlist(respon.data));
  }


  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} style={{height:"700px", width:"900px"}}/>
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">Rs. {price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0" onClick = {addToCart}>
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content" >Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;