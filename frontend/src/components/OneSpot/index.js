import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { loadSpotReviews } from '../../store/reviews';
import './OneSpot.css';

function OneSpot() {
   const [ isLoaded, setIsLoaded ] = useState(false)
   const { spotId } = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSpotDetails(spotId))
      dispatch(loadSpotReviews(spotId))
         .then(() => setIsLoaded(true))
   }, [ dispatch, spotId ]);

   const spot = useSelector(state => state.spots.oneSpot);
   const user = useSelector(state => state.session.user);
   const reviewsObj = useSelector(state => state.reviews.spot);

   const reviews = Object.values(reviewsObj);

   if (!user?.id) {
      return isLoaded && (
         <div className="detail-container">
            <div className="detail-top">
               <div className="spot-name"><h2>{spot?.name}</h2></div>
               <div className="detail-top-bottom">
                  <div className="spot-rating">
                     {`★ ${spot?.avgStarRating ? Number(spot?.avgStarRating).toFixed(1) : ' 0'}`}
                  </div>
                  <span>•</span>
                  <div>{`${reviews.length} reviews`}</div>
                  <span>•</span>
                  <div className="spot-location">
                     {`${spot?.city}, ${spot?.state} ${spot?.country}`}
                  </div>
               </div>
            </div>
            <div className="detail-image">
               <div className="one-image-div">
                  <img className="one-image" src={spot?.SpotImages[ 0 ]?.url} alt={spot?.name} />
               </div>
            </div>
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
                     {`${reviews?.length} reviews`}
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
         </div>
      );
   }

   const existingReview = reviews.find(review => review.userId === user.id);

   return isLoaded && (
      <div className="detail-container">
         <div className="detail-top">
            <div className="spot-name"><h2>{spot?.name}</h2></div>
            <div className="detail-top-bottom">
               <div className="spot-rating">
                  {`★ ${spot?.avgStarRating ? Number(spot?.avgStarRating).toFixed(1) : ' 0'}`}
               </div>
               <span>•</span>
               <div>{`${reviews.length} reviews`}</div>
               <span>•</span>
               <div className="spot-location">
                  {`${spot?.city}, ${spot?.state} ${spot?.country}`}
               </div>
               {user?.id === spot?.ownerId && (
                  <div className="edit-delete-links">
                     <p id="edit"><Link to={`/spots/${spot?.id}/edit`}>edit hub</Link></p>
                     <p id="del"><Link to={`/spots/${spot?.id}/delete`}>delete hub</Link></p>
                  </div>
               )}
            </div>
         </div>
         <div className="detail-image">
            <div className="one-image-div">
               <img className="one-image" src={spot?.SpotImages[ 0 ]?.url} alt={spot?.name} />
            </div>
         </div>
         <div className="bottom-container">
            <div className="spot-owner">Hub hosted by {spot.Owner.firstName}</div>
            <div className="spot-description">{spot.description}</div>
            {user?.id !== spot?.ownerId && !existingReview && (
               <div className="add-review">
                  <Link to={`/spots/${spot?.id}/reviews/new`}>Leave a review</Link>
               </div>
            )}
            <div className="spot-reviews">
               <div className="top-ratings">
                  <div className="average-rating">
                     {spot?.avgStarRating ? `★ ${Number(spot.avgStarRating).toFixed(1)}` : 'no reviews for this hub yet'}
                  </div>
                  <span>•</span>
                  <div className="number-rating">
                     {`${reviews?.length} reviews`}
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
                              <div className="remove"><p>{user.id === review.userId && (
                                 <Link to={`/reviews/${review.id}/delete`}>delete review</Link>
                              )}</p></div>
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
      </div>
   );
}

export default OneSpot;
