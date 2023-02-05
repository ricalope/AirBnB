import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteOneSpot } from '../../store/spots';
import './DeleteSpot.css'

function DeleteSpot({ setShowDelete, spotId }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async () => {
        await dispatch(deleteOneSpot(spotId));
        history.push('/spots')
        setShowDelete(false)
    }

    const onCancel = () => {
        setShowDelete(false)
    }

    return (
        <div className="delete-container">
            <div className="delete-content">
                <h2>Confirm delete hub</h2>
                <h5 className="haiku">
                    Please confirm if you would like to delete this hub
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
