import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios_file';
import { setuser, setuserlist } from '../redux/actions/productsActions';
import { v4 as uuid } from 'uuid';
import '../styles/LoginPage.css';

const CreateAccount = () => {

  const [name, setname] = useState('');
  const [pwd, setpwd] = useState('');
  const [confpwd, setconfpwd] = useState('');
  const userlist = useSelector((state) => state.userlist.userslist);
  const user = useSelector((state) => state.userDetails.userdetails)
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const addFunc = async () => {

    const id = uuid();
    const request = {
      userid: id,
      username: name,
      password: pwd,
      totalprice: 0,
      cart: []
    }
    const response = await api.post("/userlist", request);
    dispatch(setuserlist(response.data));

    var tid;
    userlist.map((item) => {
      if (item.userid == id) tid = item.id;
    })
    user.id = tid;
    user.userId = id;
    user.username = name;
    user.password = pwd;
    dispatch(setuser(user));
  }

  const submitFunc = () => {

    var exists = userlist.some((user) => {
      return user.username === name;
    });

    if (name.length < 1) {
      document.getElementsByClassName('c7')[0].innerHTML = "username should be min 8 letters";
    }
    if (exists === true) {
      document.getElementsByClassName('c7')[0].innerHTML = "username already exist, try another";
    }
    else if (pwd.length < 1) {
      document.getElementsByClassName('c7')[0].innerHTML = "password should be min 8 letters";
    }
    else if (pwd !== confpwd) {
      document.getElementsByClassName('c7')[0].innerHTML = "password does not matches with confirm pwd";
    }
    else {
      addFunc();
      navigate('/productslist');
    }

  }

  return (
    <div>
      <br /><br /><br />
      <div className='c1'>
        <div className='c2'>Get Started</div>
        <form className='c3'>
          <div className='c6'>
            <label>Username : </label>
            <input
              type='text'
              placeholder='Username'
              value={name}
              onChange={(e) => { setname(e.target.value) }}
            />
          </div>
          <div className='c6'>
            <label>Password : </label>
            <input
              type='password'
              placeholder='Password'
              value={pwd}
              onChange={(e) => { setpwd(e.target.value) }}
            />
          </div>
          <div className='c6'>
            <label>Confirm Password : </label>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confpwd}
              onChange={(e) => { setconfpwd(e.target.value) }}
            />
          </div>
        </form>
        <div className='c8'>
          <button className='c9' onClick={submitFunc}>Get Started</button>
        </div>
        <div className='c7'></div>
      </div>
    </div>
  )
}

export default CreateAccount;
