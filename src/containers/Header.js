import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  let userlist = useSelector( (state) => state.userlist.userslist );
  let user = useSelector((state) => state.userDetails.userdetails);
  const [noofitems, setnoofitems] =  useState(0);
  const [temp, settemp] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
    const interval = setTimeout(() => {
      settemp(temp+1);
    }, 2000);
  }, [temp]);

  const getItems = () => {
    let useritem = userlist.filter((item) => {
      return item.userid == user.userId;
    });
    let cart = useritem.map((item) => { return item.cart });
    var t = 0;
    cart.map((item) => { item.map((temp) => { t += temp.count }) });
    setnoofitems(t);
  }


  return (

    <div className="ui fixed menu">
      <div className="ui container center">
        <h2>CartLive</h2>
        
        { user.userId === "-1" ?
        (
          <span></span>
        ) : 
        (
         user.userId === "0" ? 
        (
          <button className="ui button blue " 
          style={{marginRight:"10px", marginLeft:"80%"}}
          onClick = { () => { navigate('/addProduct'); } } >
            Add Product
          </button>    
        ) :
        (
          <button className="ui button blue"
          style={{marginRight:"10px", marginLeft:"80%"}}
          onClick = { () => { navigate(`/cart/${user.userId}`); } } >
            Cart : {noofitems}
          </button> 
        ) 
        )
        }
  
      </div>
    </div>
  );
};

export default Header;