import React from 'react';
import api from '../api/axios_file';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productsActions';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const Addproduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let newobj = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  }

  const addfunc = () => {

    if (document.getElementById('title').value === "") {
      document.getElementsByClassName('c7')[0].innerHTML = "title can't be empty";
    }
    else if (document.getElementById('price').value <= 0) {
      document.getElementByClassName('c7')[0].innerHTML = "price can't be non-positive";
    }
    else if (document.getElementById('description').value === "") {
      document.getElementByClassName('c7')[0].innerHTML = "description can't be empty";
    }
    else if (document.getElementById('category').value === "") {
      document.getElementByClassName('c7')[0].innerHTML = "category can't be empty";
    }
    else if (document.getElementById('image link').value === "") {
      document.getElementByClassName('c7')[0].innerHTML = "image link can't be empty";
    }
    else if (document.getElementById('rating rate').value < 0 || document.getElementById('rating rate').value > 5) {
      document.getElementByClassName('c7')[0].innerHTML = "rating rate should be >=0 and <=5";
    }
    else if (document.getElementById('rating count').value <= 0) {
      document.getElementByClassName('c7')[0].innerHTML = "rating count cant be <= 0";
    }
    else {
      newobj.title = document.getElementById('title').value;
      newobj.price = document.getElementById('price').value;
      newobj.description = document.getElementById('description').value;
      newobj.category = document.getElementById('category').value;
      newobj.image = document.getElementById('image link').value;
      newobj.rating.rate = document.getElementById('rating rate').value;
      newobj.rating.count = document.getElementById('rating count').value;

      update();
      navigate('/productslist');
    }
  }


  const update = async () => {
    const response = await api.post('/productlist', newobj);
    const respons = await api.get('/productlist');
    dispatch(setProducts(respons.data));
  }


  return (
    <div>
      <br /><br /><br />
      <div className='c1' style={{height:"420px"}}>
        <div className='c2'>Add Product</div>
        <form className='c3'>
          <div className='c6'>
            <label>title : </label>
            <input id='title' type='text' placeholder='title' />
          </div>
          <div className='c6'>
            <label>price : </label>
            <input id='price' type='number' placeholder='price' />
          </div>
          <div className='c6'>
            <label>description : </label>
            <input id='description' type='text' placeholder='description' />
          </div>
          <div className='c6'>
            <label>category : </label>
            <input id='category' type='text' placeholder='category' />
          </div>
          <div className='c6'>
            <label>image link : </label>
            <input id='image link' type='text' placeholder='image link' />
          </div>
          <div className='c6'>
            <label>rating rate : </label>
            <input id='rating rate' type='number' placeholder='rating rate' />
          </div>
          <div className='c6'>
            <label>rating count : </label>
            <input id='rating count' type='number' placeholder='rating count' />
          </div>
        </form>
        <div className='c8'>
          <button onClick={addfunc} className='c9'>Add</button>
        </div>
        <div className='c7'></div>
      </div>
    </div>
  )
}

export default Addproduct;
