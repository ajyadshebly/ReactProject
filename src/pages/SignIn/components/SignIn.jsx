import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './SignIn.css'
import axios from 'axios';
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/User';


export default function SignIn() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })

  };
  const validateData = async () => {

    const SigninSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20).required(),
    });
    try {
      await SigninSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
      // console.log(errors);
    }
  };
  const handelForm = async (e) => {
    e.preventDefault();
    if (await validateData()) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, user);
        if (data.message == 'success')
          toast('Your Sign in successfully', {
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
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/');

      } catch (error) {
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
  return (
    <>
      {errors.length > 0 ? errors.map(error =>
        {error}

      ) : ''}
      <div className='text-center'>
      <img src="src\Images\AjyadShop1.svg"  width={70} height={70} className="d-inline-block align-text-top" />
        <form className='form-signin' onSubmit={handelForm}>
          <h1 className="h3 mb-3 fw-normal">Sign In</h1>
          <div className="form-floating">
            <input type="email" name="email" value={user.email} className="form-control" onChange={handelChange} placeholder="name@example.com" required />
            <label>Email address</label>
            <p className="text-danger">{errors}</p>
          </div>
          <div className="form-floating">
            <input type="password" name="password" value={user.password} className="form-control" onChange={handelChange} placeholder="Password" required />
            <label>Password</label>
            <p className="text-danger">{errors}</p>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
        </form>

        <a href='/SendCode'>Forgot your Password?</a>
      </div>

    </>

  )
}
