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
      <div className="reviews-container">
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
                        {user?.id === review?.userId && (
                           <div className="remove">
                              <p>
                                 <Link to={`/reviews/${review.id}/delete`}>
                                    delete review
                                 </Link>
                              </p>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="review-text">{review?.review}</div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Reviews;
