import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { loadSpotReviews } from '../../store/reviews';
import './Reviews.css'


function Reviews() {
   const [ isLoaded, setIsLoaded ] = useState(false)
   const { spotId } = useParams();
   const dispatch = useDispatch();

   const reviewsObj = useSelector(state => state.reviews.spot);
   const user = useSelector(state => state.session.user);

   const reviews = Object.values(reviewsObj)

   useEffect(() => {
      dispatch(loadSpotReviews(spotId))
         .then(() => setIsLoaded(true))
   }, [ dispatch, spotId ]);

   return isLoaded && (
      <div>
         <div>
            <h2>User reviews for this hub</h2>
         </div>
         <div>
            <ul>
               {reviews.map(review => (
                  <div className="review-container" key={review?.id}>
                     {user?.id === review?.userId && (
                        <div>
                           <p>
                              <Link to={`/reviews/${review.id}/delete`}>
                                 delete
                              </Link>
                           </p>
                        </div>
                     )}
                     <li>{review?.review}</li>
                     <li><p>{`- ${review?.User.firstName} ${review?.stars} ★`}</p></li>
                  </div>
               ))}
            </ul>
         </div>
      </div>
   );
}

export default Reviews;
