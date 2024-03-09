import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setuserlist } from '../redux/actions/productsActions';
import api from '../api/axios_file';
import '../styles/Cart.css';

const Cart = () => {

  const userlist = useSelector((state) => state.userlist.userslist);
  let user = useSelector((state) => state.userDetails.userdetails);
  var changedproid = 0;
  const dispatch = useDispatch();

  let useritem = userlist.filter((item) => {
    return item.userid === user.userId;
  });

  let cart = useritem.map((item) => { 
    return item.cart;
   });

  const renderList = cart.map((cartlist) => {
    return cartlist.map((item) => {
      const {title, price, image, count, id} = item;
      return (
        <div className='a3'>
          <img className='a4' src={image}/>
          <div className='a7'>
            <div className='a5'>{title}</div>
            <div className='a5'>price : Rs. {price}</div>
            <div className='a5'>
              <span>count : {count} </span>
              <button className='a6' onClick={() => { changedproid = id; if (count === 1) removeItem(); else minusItem(); }}>  -  </button>
              <button className='a6' onClick={() => { changedproid = id; plusItem(); }}>  +  </button>
            </div>
          </div>
        </div>
      );
    })
  });


  const minusItem = async () => {

    var totalcost = 0;
    cart.map((cartlist) => {
       cartlist.map((item) => {
        if(item.id === changedproid) {
          item.count = item.count-1;
        }
        totalcost += item.price*item.count;
      })
    })

    let {id, userid, password, username} = useritem[0];
    var newuseritem = {
      userid: userid,
      username: username,
      password: password,
      totalprice: totalcost,
      id: id,
      cart: cart[0]
    }
console.log(newuseritem);
    const response = await api.put(`/userlist/${id}`, newuseritem);
    fetchUserlist();
  }


  const removeItem = async () => {

    var totalcost = 0;
    var newcart = cart.map((cartlist) => {
      return cartlist.filter((item) => {
        return item.id !== changedproid;
      })
    })

    newcart.map((cartlist) => {
      cartlist.map((item) => {
        totalcost += item.price*item.count;
      })
    })

    let {id, userid, password, username} = useritem[0];
    var newuseritem = {
      userid: userid,
      username: username,
      password: password,
      totalprice: totalcost,
      id: id,
      cart: newcart[0]
    }

    const response = await api.put(`/userlist/${id}`, newuseritem);
    fetchUserlist();
  }


  const plusItem = async () => {

    var totalcost = 0;
    cart.map((cartlist) => {
       cartlist.map((item) => {
        if(item.id === changedproid) {
          item.count = item.count+1;
        }
        totalcost += item.price*item.count;
      })
    })

    let {id, userid, password, username} = useritem[0];
    var newuseritem = {
      userid: userid,
      username: username,
      password: password,
      totalprice: totalcost,
      id: id,
      cart: cart[0]
    }
console.log(newuseritem);
    const response = await api.put(`/userlist/${id}`, newuseritem);
    fetchUserlist();
    }

  const fetchUserlist = async() => {
    const response = await api.get('/userlist');
    dispatch(setuserlist(response.data));
  }


  return (
    <div>
      <br/><br/><br/>
      <div className='a1'>
        Total : {useritem.map((item) => {
          return item.totalprice;
        })}
      </div>
      <div className='a2'>{renderList}</div>
    </div>
  );

}

export default Cart;
