import { Modal } from '../../context/Modal';
import AddReview from './index';


function AddReviewModal({ spotId, showAdd, setShowAdd }) {

    return (
        <>
            {showAdd && (
                <Modal onClose={() => setShowAdd(false)}>
                    <AddReview setShowAdd={setShowAdd} spotId={spotId} />
                </Modal>
            )}
        </>
    )
}

export default AddReviewModal;
