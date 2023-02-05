import { useDispatch } from 'react-redux';
import { deleteSpotReview, loadSpotReviews } from '../../store/reviews';

function DeleteReview({ setShowDel, reviewId, spotId }) {
    const dispatch = useDispatch();

    const onSubmit = async () => {
        await dispatch(deleteSpotReview(reviewId));
        await dispatch(loadSpotReviews(spotId))
        setShowDel(false)
    }

    const onCancel = () => {
        setShowDel(false)
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
