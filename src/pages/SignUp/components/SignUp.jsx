import React from 'react'
import { useState } from 'react';
import './SignUp.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { object,string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [errors,setErrors] = useState([]);

  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  const handelImageChange = (e) => {
    const {name,files} = e.target;
    setUser({
      ...user,
      [name]:files[0]
     
    });
  };
  const validateData= async()=>{
    
    const SignupSchema = object({
      userName:string().min(5).max(20).required(),
      email:string().email().required(),
      password:string().min(8).max(20).required(),
      image:string().required(),
     });
     try{
      await SignupSchema.validate(user,{abortEarly:false});
      return true;
     }catch(error){
      setErrors(error.errors);
      return false;
      // console.log(errors);
     }
     
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if(await validateData()){
    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', user.image);
   try{
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
    // console.log(data);
    if(data.message== 'success')
     toast('your account has been created successfully',{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition:Bounce
    });
    setUser({
    userName: '',
    email: '',
    password: '',
    image: '',
    });
    navigate('/SignIn');
   }catch(error){
    if(error.response.status === 409){
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
   }
   

  }
  
}
  return (
    <> 
    {errors.length > 0 ?errors.map(error=>
     <p className="text-danger">{error}</p>

    ):''}
 
      <div className='text-center'>
      <img src={'/images/AjyadShop1.svg'}  width={70} height={70} className="d-inline-block align-text-top" />
        <form className='form-signin' onSubmit={handelSubmit}>
          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
          <div className="form-floating">
            <input type="text" name="userName" value={user.userName} className="form-control" onChange={handelChange} placeholder="username" required />
            <label >userName</label>
            {}
          </div>
          <div className="form-floating">
            <input type="email" name="email" value={user.email} className="form-control" onChange={handelChange} placeholder="name@example.com" required />
            <label >email</label>
            <p className="text-danger">{errors}</p>
          </div>
          <div className="form-floating">
            <input type="password" name="password" value={user.password} className="form-control" onChange={handelChange} placeholder="Password" required />
            <label>password</label>
            <p className="text-danger">{errors}</p>
          </div>
          <div className="form-floating">
            <input type="file" name="image" onChange={handelImageChange} className="form-control" placeholder="image" required />
            <label>image</label>
            <p className="text-danger">{errors}</p>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign UP</button>

        </form>


      </div>
    </>

  )
}
