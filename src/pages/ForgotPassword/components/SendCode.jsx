import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

function SendCode() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, { email });
            //   console.log(data); 
            if (data.message == 'success')
                toast('Check your email please', {
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
                navigate('/ForgotPassword');
        } catch (error) {
            console.log(error);
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
        setLoading(false);
    };

    return (
        <div className='text-center'>
            <img src={'/images/AjyadShop1.svg'} width={70} height={70} className="d-inline-block align-text-top" />
            <h2 className="h3 mb-3 fw-normal">Enter your email to Send Code</h2>
            <form className='form-signin' onSubmit={handleSubmit}>
                <div className="form-floating">
                    <input type="email" placeholder="Enter your email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Email address</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Code'}
                </button>
            </form>
        </div>
    );
}

export default SendCode;