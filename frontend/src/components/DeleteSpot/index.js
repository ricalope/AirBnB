import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneSpot } from '../../store/spots';

function DeleteSpot() {
   const { spotId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const onSubmit = () => {
      dispatch(deleteOneSpot(spotId));
      history.push('/');
   }

   return (
      <div>
         <h2>confirm delete spot?</h2>
         <h5>today was the day<br/>
         that I had to say goodbye<br/>
         I will miss this spot</h5>
         <button onClick={onSubmit}>confirm deletion</button>
      </div>
   );
}

export default DeleteSpot;
