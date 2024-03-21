import React from 'react'
import { useState } from 'react';
import './SignUp.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { object,string } from 'yup';


export default function SignUp() {
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

    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
    // console.log(data);
    }
  };

  return (
    <> 
    {errors.length > 0 ?errors.map(error=>
    <h2>{error}</h2>

    ):''};
 
      <div className='text-center'>
        <h2>Ajyad Shop</h2>
        <form className='form-signin' onSubmit={handelSubmit}>
          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
          <div className="form-floating">
            <input type="text" name="userName" value={user.userName} className="form-control" onChange={handelChange} placeholder="username" required />
            <label >userName</label>
          </div>
          <div className="form-floating">
            <input type="email" name="email" value={user.email} className="form-control" onChange={handelChange} placeholder="name@example.com" required />
            <label >email</label>
          </div>
          <div className="form-floating">
            <input type="password" name="password" value={user.password} className="form-control" onChange={handelChange} placeholder="Password" required />
            <label>password</label>
          </div>
          <div className="form-floating">
            <input type="file" name="image" onChange={handelImageChange} className="form-control" placeholder="image" required />
            <label>image</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign UP</button>

        </form>


      </div>
    </>

  )
}
