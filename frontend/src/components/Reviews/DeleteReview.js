import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotReview } from '../../store/reviews';

function DeleteReview() {
   const { reviewId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const spot = useSelector(state => state.reviews.spot)
   const spotId = Object.values(spot)[ 0 ].spotId;

   const onSubmit = () => {
      dispatch(deleteSpotReview(reviewId));
      history.push(`/spots/${spotId}/reviews`);
   }

   const onCancel = () => {
      history.push(`/spots/${spotId}/reviews`)
   }

   return (
      <div className="delete-container">
         <div className="delete-content">
            <h2>Confirm delete review</h2>
            <h5 className="haiku">
               Please confirm if you would like to delete this review
            </h5>
            <div className="delete-buttons">
            <button
               className="cancel-delete"
               onClick={onCancel}
            >
               Cancel
            </button>
            <button
               className="confirm-delete"
               onClick={onSubmit}
            >
               Confirm Deletion
            </button>
            </div>
         </div>
      </div>
   );
}

export default DeleteReview;
