import { Modal } from '../../context/Modal';
import DeleteReview from './index';


function DeleteReviewModal({ spotId, reviewId, showDel, setShowDel }) {

    return (
        <>
            {showDel && (
                <Modal onClose={() => setShowDel(false)}>
                    <DeleteReview setShowDel={setShowDel} reviewId={reviewId} spotId={spotId} />
                </Modal>
            )}
        </>
    )
}

export default DeleteReviewModal;
