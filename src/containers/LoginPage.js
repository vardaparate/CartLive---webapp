import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setuser, setuserlist } from '../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/axios_file';
import '../styles/LoginPage.css';

const LoginPage = () => {

  const userlist = useSelector((state) => state.userlist.userslist);
  const user = useSelector((state) => state.userDetails.userdetails);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  var tempuser = '';
  var temppwd = '';
  var tempid = '-1';
  var tid;

  const fetchuserlist = async () => {
    const response = await api.get(`/userlist`);
    dispatch(setuserlist(response.data));
  }

  useEffect(() => {
    fetchuserlist();
    user.id = "-1";
    user.userId = '-1';
    user.username = '';
    user.password = '';
    dispatch(setuser(user));
  }, []);

  const funclogin = () => {
    userlist.map((user) => {
      if (user.username === username) {
        tempuser = user.username;
        temppwd = user.password;
        tempid = user.userid;
        tid = user.id;
      }
    });

    if (temppwd !== password || tempuser === '') {
      document.getElementsByClassName('c7')[0].innerHTML = "Invalid username or password";
    }
    else {
      user.id = tid;
      user.userId = tempid;
      user.username = tempuser;
      user.password = temppwd;
      dispatch(setuser(user));
      navigate('/productslist');
    }
  }

  return (
    <div>
      <br /><br /><br />
      <div className='c1'>
        <div className='c2'>
          Sign In
        </div>
        <form className='c3'>
          <div className='c6'>
            <label className='c4'>Username : </label>
            <input className='c5'
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>
          <div className='c6'>
            <label className='c4'>Password : </label>
            <input className='c5'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
        </form>
        <div className='c8'>
          <button onClick={funclogin} className='c9'>Login</button>
          <Link to="/createAccount">
            <button className='c9'>Create New Account</button>
          </Link>
        </div>
        <div className='c7'></div>
      </div>
    </div>
  );
};

export default LoginPage;
