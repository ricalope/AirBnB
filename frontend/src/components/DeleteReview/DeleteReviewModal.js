import { Modal } from '../../context/Modal';
import DeleteReview from './index';


function DeleteReviewModal({ showDel, setShowDel }) {

    return (
        <>
            {showDel && (
                <Modal onClose={() => setShowDel(false)}>
                    <DeleteReview setShowDel={setShowDel} />
                </Modal>
            )}
        </>
    )
}

export default DeleteReviewModal;
