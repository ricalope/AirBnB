import { Modal } from '../../context/Modal';
import DeleteSpot from './index';


function DeleteSpotModal({ spotId, showDelete, setShowDelete }) {

    return (
        <>
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <DeleteSpot setShowDelete={setShowDelete} spotId={spotId} />
                </Modal>
            )}
        </>
    )
}

export default DeleteSpotModal;
