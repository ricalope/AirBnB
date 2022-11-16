import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteSpotReview } from '../../store/reviews';

function DeleteReview() {
   const { reviewId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const onSubmit = () => {
      dispatch(deleteSpotReview(reviewId));
      history.push("/");
   }

   return (
      <div>
         <h2>confirm delete review</h2>
         <h5>yesterday's reviews<br/>
         we have memories of them<br/>
         but we do not dwell
         </h5>
         <button onClick={onSubmit}>confirm deletion</button>
      </div>
   );
}

export default DeleteReview;
