import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, { email, password, code });
      console.log(data); // Handle success response
      navigate('/SignIn');
    } catch (error) {
      console.log(error);
      // setMessage('An error occurred while resetting your password.');
    }
    setLoading(false);
  };

  return (
    <div className='text-center'>
       <img src="src\Images\AjyadShop1.svg"  width={70} height={70} className="d-inline-block align-text-top" />
      <h2 className="h3 mb-3 fw-normal">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className='form-signin'>
        <div className="form-floating">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
        <label>Email address</label>
        </div>
        <div className="form-floating">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
        <label>New Password</label>
        </div>
      <div className="form-floating">
      <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="form-control"
          required
        />
        <label>Verification Code</label>
      </div>
       
        <button type="submit" disabled={loading} className="w-100 btn btn-lg btn-primary" >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;