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
         .catch((err) => console.log(err))
   }, [ dispatch, spotId ]);

   const spot = useSelector(state => state.spots.oneSpot);
   const user = useSelector(state => state.session.user);
   const reviewsObj = useSelector(state => state.reviews.spot);

   const reviews = Object.values(reviewsObj);

   if (!user?.id) {
      return isLoaded && (
         <div className="detail-container">
            <div className="detail-top">
               <div className="spot-name">{spot?.name}</div>
               <div className="detail-top-bottom">
                  <div className="spot-rating">
                     <h6>{`★ ${spot?.avgStarRating ? spot?.avgStarRating : ' no reviews for this hub yet.'}`}</h6>
                     <div>{`${reviews.length} reviews`}</div>
                  </div>
                  <div className="spot-location">
                     <h5>{`${spot?.city}, ${spot?.state} ${spot?.country}`}</h5>
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
                  <ul>
                     {reviews.map(review => (
                        <li key={review.id}>
                           <Link to={`/spots/${spot.id}/reviews`}>
                              {review?.review}
                           </Link>
                           <p>{`- ${review?.User.firstName} ${review?.stars} ★`}</p>
                        </li>
                     ))}
                  </ul>
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
                  {`★ ${spot?.avgStarRating ? Number(spot?.avgStarRating).toFixed(1) : ' no reviews for this hub yet.'}`}
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
            {user?.id === spot?.ownerId && (
               <div>
                  <Link to={`/spots/${spot?.id}/edit`}>edit hub</Link>
                  <Link to={`/spots/${spot?.id}/delete`}>delete hub</Link>
               </div>
            )}
            {user?.id !== spot?.ownerId && !existingReview && (
               <div className="add-review">
                  <Link to={`/spots/${spot?.id}/reviews/new`}>leave a review</Link>
               </div>
            )}
            <div className="spot-reviews">
               <ul>
                  {reviews.map(review => (
                     <li key={review.id}>
                        <Link to={`/spots/${spot.id}/reviews`}>
                           {review?.review}
                        </Link>
                        <p>{`- ${review?.User.firstName} ${review?.stars} ★`}</p>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>

   );
}

export default OneSpot;
