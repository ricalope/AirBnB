import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSpotReview, loadSpotReviews } from '../../store/reviews';
import './AddReview.css';

function AddReview({ spotId, setShowAdd }) {
    const dispatch = useDispatch();

    const [ review, setReview ] = useState("");
    const [ stars, setStars ] = useState("");
    const [ submitted, setSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState([]);

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const errors = [];
        if (!stars.length) errors.push("* Please select a number between 1 and 5");
        if (!review.trim().length) errors.push("* The review field cannot be left empty");
        setErrors(errors)
    }, [ stars, review ])



    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const formValues = {
            userId: user.id,
            spotId,
            review,
            stars
        }
        const newReview = await dispatch(addSpotReview(formValues))
        if (newReview) {
            await dispatch(loadSpotReviews(spotId))
            setReview("");
            setStars("");
            setShowAdd(false)
            return
        }

    }

    const onCancel = () => {
        setShowAdd(false)
    }

    return (
        <div className="review-container">
            <div className="header">
                <h3>Leave a Review</h3>
            </div>
            <div className="form-container">
                <form onSubmit={onSubmit}>
                    {submitted && errors.length > 0 && (
                        <div className="errors">
                            <ul>
                                {errors.map((error, idx) => (
                                    <li key={idx}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="form-stars">
                        <div className="stars-title">
                            <h5>Stars</h5>
                        </div>
                        <div className="star-buttons">
                            <input
                                type="radio"
                                value="1"
                                checked={stars === "1"}
                                onChange={() => setStars("1")}
                            />
                            <label>1</label>
                            <input
                                type="radio"
                                value="2"
                                checked={stars === "2"}
                                onChange={() => setStars("2")}
                            />
                            <label>2</label>
                            <input
                                type="radio"
                                value="3"
                                checked={stars === "3"}
                                onChange={() => setStars("3")}
                            />
                            <label>3</label>
                            <input
                                type="radio"
                                value="4"
                                checked={stars === "4"}
                                onChange={() => setStars("4")}
                            />
                            <label>4</label>
                            <input
                                type="radio"
                                value="5"
                                checked={stars === "5"}
                                onChange={() => setStars("5")}
                            />
                            <label>5</label>
                        </div>
                    </div>
                    <div className="form-review">
                        <div className="review-title"><h5>Review</h5></div>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder=" add a review..."
                        />
                        <div className="review-form-buttons">
                            <button
                                className="cancel-review"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-review"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}


export default AddReview;
