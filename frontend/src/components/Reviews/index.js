import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DeleteReviewModal from '../DeleteReview/DeleteReviewModal';
import { loadSpotReviews } from '../../store/reviews';
import './Reviews.css'


function Reviews() {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const reviewsObj = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user);

    const reviews = Object.values(reviewsObj)

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ showDel, setShowDel ] = useState(false);

    useEffect(() => {
        dispatch(loadSpotReviews(spotId))
            .then(() => setIsLoaded(true))
    }, [ dispatch, spotId ]);

    const backButton = () => {
        history.push(`/spots/${spotId}`)
    }

    return isLoaded && (
        <div className="reviews-container">
            <div className="reviews-back">
                <button className="back-btn" onClick={backButton}>
                    <i className="fa-solid fa-arrow-left-long" />
                    <p>back to hub</p>
                </button>
            </div>
            <div className="reviews-header">
                <h2>User reviews for this hub</h2>
            </div>
            <div className="reviews-content">
                {reviews.map(review => (
                    <div className="review-links" key={review?.id}>
                        <div className="review-top">
                            <div className="review-icon">
                                <i className="fa-solid fa-user" />
                            </div>
                            <div className="review-middle">
                                <div className="review-author">
                                    {review?.User?.firstName}
                                </div>
                                <div className="remove">
                                    {user.id === review.userId && (
                                        <button className="del-rev-btn" onClick={() => setShowDel(true)}>
                                            <p>delete review</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="review-text">{review?.review}</div>
                    </div>
                ))}
            </div>
            {showDel && (
                <DeleteReviewModal
                    showDel={showDel}
                    setShowDel={setShowDel}
                />
            )}
        </div>
    );
}

export default Reviews;
