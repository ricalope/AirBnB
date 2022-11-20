import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteOneSpot } from '../../store/spots';
import './DeleteSpot.css'

function DeleteSpot() {
   const { spotId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const onSubmit = () => {
      dispatch(deleteOneSpot(spotId));
      history.push('/');
   }

   const onCancel = () => {
      history.push(`/spots/${spotId}`);
   }

   return (
      <div className="delete-container">
         <div className="delete-content">
            <h2>Confirm delete hub?</h2>
            <h5 id="haiku">today was the day<br />
               that I had to say goodbye<br />
               I will miss this hub
            </h5>
            <div className="delete-buttons">
               <button className="confirm-delete" onClick={onCancel}>Cancel</button>
               <button className="cancel-delete" onClick={onSubmit}>Confirm Deletion</button>
            </div>
         </div>
      </div>
   );
}

export default DeleteSpot;
