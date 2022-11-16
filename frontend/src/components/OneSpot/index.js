import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';
import { loadSpotReviews } from '../../store/reviews';

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

   return isLoaded && (
      <div>
         <h2>{spot.name}</h2>
         <h5>{`${spot.city}, ${spot.state} ${spot.country}`}</h5>
         <h6>{`★${spot.avgStarRating ? spot.avgStarRating : ' no reviews for this hub yet.'}`}</h6>
         <div className="one-image-div">
            <img className="one-image" src={spot.SpotImages[ 0 ].url} alt={spot.name} />
         </div>
         <div>
            <p className="spot-description">{spot.description}</p>
            {user.id === spot.ownerId && (
               <div>
                  <Link to={`/spots/${spot.id}/edit`}>edit hub</Link>
                  <Link to={`/spots/${spot.id}/delete`}>delete hub</Link>
               </div>
            )}
            <Link to={`/spots/${spot.id}/reviews/new`}>add a review</Link>
         </div>
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
   );
}

export default OneSpot;
