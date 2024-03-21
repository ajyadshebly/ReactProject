import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SignIn.css'
import axios from 'axios';
import { object,string } from 'yup';

export default function SignIn() {
  const [errors,setErrors] = useState([]);
  const [user, setUser ] =useState({
    email:'',
    password:'',
  });
  const handelChange=(e)=>{
    const {name,value} = e.target;
    setUser({
      ...user,
      [name]:value
    })

  };
  const validateData= async()=>{
    
    const SignupSchema = object({
      email:string().email().required(),
      password:string().min(8).max(20).required(),
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
  const handelForm =async(e)=>{
    e.preventDefault();
    if(await validateData()){
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,user);
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
        <form className='form-signin' onSubmit={handelForm}>
          <h1 className="h3 mb-3 fw-normal">Sign In</h1>
          <div className="form-floating">
            <input type="email" name="email" value={user.email} className="form-control" onChange={handelChange} placeholder="name@example.com" required/>
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" name="password" value={user.password} className="form-control" onChange={handelChange} placeholder="Password" required/>
            <label>Password</label>
          </div>
          
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
        </form>
       
        <a href='#'>Forgot your Password?</a>
      </div>

    </>

  )
}
