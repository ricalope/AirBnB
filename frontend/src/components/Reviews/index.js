import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { loadSpotReviews, deleteSpotReview } from '../../store/reviews';


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

   if (!isLoaded) return null;

   return (
      <div>
         <div>
            <h2>user reviews for this hub</h2>
         </div>
         <div>
            <ul>
               {reviews.map(review => (
                  <div className="review-container" key={review?.id}>
                     {user?.id === review?.userId && (
                        <div>
                           <p>
                              <Link exact to={`/reviews/${review.id}/edit`}>
                                 edit review
                              </Link>
                           </p>
                           <p>
                              <Link exact to={`/reviews/${review.id}/delete`}>
                                 delete review
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
