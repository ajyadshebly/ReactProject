import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function AddReview({ productId }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const token = localStorage.getItem('userToken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`, {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            }, {
                comment,
                rating
            });
            console.log('Review submitted successfully!');
            setComment('');
            setRating(0);
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className='text-center'>
            <h3 className='text-primary'>Add Review</h3>
            <form className='form-signin' onSubmit={handleSubmit}>
                <div className="form-floating">
                    <h4 >Comment:</h4>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
                </div>
                <div className="form-floating">
                    <h4>Rating:</h4>
                    <Rating>
                        <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} min="1" max="5" required />
                    </Rating>
                </div>
                <button className='btn btn-outline-primary my-3' type="submit">Submit Review</button>
            </form>
        </div>
    );
}
