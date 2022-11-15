import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneSpot } from '../../store/spots';

function DeleteSpot() {
   const { spotId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const onSubmit = (e) => {
      dispatch(deleteOneSpot(spotId));
      history.push('/');
   }

   return (
      <div>
         <h2>confirm delete spot?</h2>
         <h5>confirm you would like to delete your hub, <br>
         </br>you can always make another <br>
         </br>but this one will be lost to the sands of time</h5>
         <button onClick={onSubmit}>confirm deletion</button>
      </div>
   );
}

export default DeleteSpot;
