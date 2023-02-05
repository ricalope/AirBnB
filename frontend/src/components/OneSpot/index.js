import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { loadSpotReviews } from '../../store/reviews';
import DeleteReviewModal from '../DeleteReview/DeleteReviewModal';
import EditSpotModal from '../EditSpot/EditSpotModal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DeleteSpotModal from '../DeleteSpot/DeleteSpotModal';
import AddReviewModal from '../AddReview/AddReviewModal';
import Bookings from '../Bookings';
import logo from '../../assets/android-chrome-512x512.png';
import './OneSpot.css';

function OneSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.oneSpot);
    const user = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.spot);

    const reviews = Object.values(reviewsObj);

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ showDel, setShowDel ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showAdd, setShowAdd ] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(getSpotDetails(spotId))
            await dispatch(loadSpotReviews(spotId))
            setIsLoaded(true)
        })()
    }, [ dispatch, spotId ]);

    const onError = e => {
        e.target.src = logo
    }

    if (!user?.id) {
        return isLoaded && (
            <div className="detail-container">
                <div className="detail-top">
                    <div className="spot-name"><h2>{spot?.name}</h2></div>
                    <div className="detail-top-nouser">
                        <div className="spot-rating">
                            {`★ ${spot?.avgStarRating ? Number(spot?.avgStarRating).toFixed(1) : ' 0'}`}
                        </div>
                        <span>•</span>
                        <div className="spot-rev">{`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`}</div>
                        <span>•</span>
                        <div className="spot-location">
                            {`${spot?.city}, ${spot?.state}, ${spot?.country}`}
                        </div>
                    </div>
                </div>
                <div className="detail-image">
                    <div className="one-image-div">
                        <img onError={onError} loading="lazy" className="one-image" src={spot?.SpotImages[ 0 ]?.url} alt={spot?.name} />
                    </div>
                </div>
                <div className="bottom-container-split">
                    <div className="bottom-container">
                        <div className="spot-owner">Hub hosted by {spot.Owner.firstName}</div>
                        <div className="spot-description">{spot.description}</div>
                        <div className="spot-reviews">
                            <div className="top-ratings">
                                <div className="average-rating">
                                    {spot?.avgStarRating ? `★ ${Number(spot.avgStarRating).toFixed(1)}` : 'no reviews for this hub yet'}
                                </div>
                                <span>•</span>
                                <div className="number-rating">
                                    {`${reviews?.length} ${reviews.length === 1 ? 'review' : 'reviews'}`}
                                </div>
                            </div>
                            <div className="box-reviews">
                                {reviews.map(review => (
                                    <div className="user-reviews" key={review.id}>
                                        <div className="review-top">
                                            <div className="review-icon">
                                                <i className="fa-solid fa-user" />
                                            </div>
                                            <div className="prof-content">
                                                <div className="firstname">{review?.User?.firstName}</div>
                                            </div>
                                        </div>
                                        <div className="link-review"><Link to={`/spots/${spot.id}/reviews`}>
                                            {review?.review}
                                        </Link></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="no-user-booking">
                        <div className="bookings-main-container nu">
                            <h1>Tiny Hub</h1>
                            <p className="u-b-ptag">Please Login in order to book a tiny hub reservation.</p>
                            <div className="u-b-btns">
                                <LoginFormModal />
                            </div>
                            <p className="u-b-ptag">or sign up if you don't have an account.</p>
                            <div className="u-b-btns">
                                <SignupFormModal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const existingReview = reviews.find(review => review.userId === user.id);

    return isLoaded && (
        <div className="detail-container">
            <div className="detail-top">
                <div className="spot-name"><h2>{spot?.name}</h2></div>
                <div className="detail-top-bottom">
                    <div className="detail-wrapper">
                        <div className="spot-rating">
                            {`★ ${spot?.avgStarRating ? Number(spot?.avgStarRating).toFixed(1) : ' 0'}`}
                        </div>
                        <span>•</span>
                        <div className="spot-rev">
                            {`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`}
                        </div>
                        <span>•</span>
                        <div className="spot-location">
                            {`${spot?.city}, ${spot?.state}, ${spot?.country}`}
                        </div>
                    </div>
                    <div className="spot-wrapper">
                        {user?.id === spot?.ownerId && (
                            <div className="edit-delete-links">
                                <button className="edit-spot-btn" onClick={() => setShowEdit(true)}>
                                    <p id="edit">
                                        edit hub
                                    </p>
                                </button>
                                <button className="edit-spot-btn" onClick={() => setShowDelete(true)}>
                                    <p id="del">
                                        delete hub
                                    </p>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {showEdit && (
                    <EditSpotModal
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                    />
                )}
                {showDelete && (
                    <DeleteSpotModal
                        spotId={spot.id}
                        showDelete={showDelete}
                        setShowDelete={setShowDelete}
                    />
                )}
            </div>
            <div className="detail-image">
                <div className="one-image-div">
                    <img onError={onError} loading="lazy" className="one-image" src={spot?.SpotImages[ 0 ]?.url} alt={spot?.name} />
                </div>
            </div>
            <div className="bottom-container-split">
                <div className="bottom-container">
                    <div className="spot-owner">Hub hosted by {spot.Owner.firstName}</div>
                    <div className="spot-description">{spot.description}</div>
                    {user?.id !== spot?.ownerId && !existingReview && (
                        <div className="add-review">
                            <button className="add-rev-btn" onClick={() => setShowAdd(true)}>
                                Leave a review
                            </button>
                        </div>
                    )}
                    <div className="spot-reviews">
                        <div className="top-ratings">
                            <div className="average-rating">
                                {spot?.avgStarRating ? `★ ${Number(spot.avgStarRating).toFixed(1)}` : 'no reviews for this hub yet'}
                            </div>
                            <span>•</span>
                            <div className="number-rating">
                                <Link exact="true" to={`/spots/${spot.id}/reviews`} className="rev-link">
                                    {`${reviews?.length} reviews`}
                                </Link>
                            </div>
                        </div>
                        <div className="box-reviews">
                            {reviews.map(review => (
                                <div className="user-reviews" key={review.id}>
                                    <div className="review-top">
                                        <div className="review-icon">
                                            <i className="fa-solid fa-user" />
                                        </div>
                                        <div className="prof-content">
                                            <div className="firstname">{review?.User?.firstName}</div>
                                            <div className="remove">
                                                {user.id === review.userId && (
                                                    <button className="del-rev-btn" onClick={() => setShowDel(true)}>
                                                        <p>delete review</p>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {showDel && (
                                            <DeleteReviewModal
                                                spotId={spot.id}
                                                reviewId={review.id}
                                                showDel={showDel}
                                                setShowDel={setShowDel}
                                            />
                                        )}
                                    </div>
                                    <div className="link-review">
                                        {review?.review}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                {showAdd && (
                    <AddReviewModal
                        spotId={spot.id}
                        showAdd={showAdd}
                        setShowAdd={setShowAdd}
                    />
                )}
                {user.id !== spot.ownerId && (
                    <div className="bookings-container">
                        <Bookings
                            spot={spot}
                            spotId={spot.id}
                            reviews={reviews}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}

export default OneSpot;
