import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addSpotReview } from '../../store/reviews';
import './AddReview.css';

function AddReview() {
   const dispatch = useDispatch();
   const history = useHistory();
   const { spotId } = useParams();

   const [ review, setReview ] = useState("");
   const [ stars, setStars ] = useState("");

   const user = useSelector(state => state.session.user);
   const owner = useSelector(state => state.spots.oneSpot.ownerId);

   const onSubmit = async (e) => {
      e.preventDefault();
      const formValues = {
         userId: user.id,
         spotId,
         review,
         stars
      }
      const newReview = await dispatch(addSpotReview(formValues))
      if (newReview) {
         history.push(`/spots/${spotId}`);
      }
      setReview("");
      setStars("");
   }

   const onCancel = () => {
      history.push(`/spots/${spotId}`);
   }

   return (
      <div>
         {user?.id === owner ? (
            <h3>apologies but you cannot post a review for your own hub.</h3>
         ) : (
            <div className="review-container">
               <div className="header">
                  <h3>Leave a Review</h3>
               </div>
               <div className="form-container">
                  <form onSubmit={onSubmit}>
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
      </div >
   );
}

export default AddReview;
