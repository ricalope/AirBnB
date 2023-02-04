import { Modal } from '../../context/Modal';
import DeleteSpot from './index';


function DeleteSpotModal({ showDelete, setShowDelete }) {

    return (
        <>
            {showDelete && (
                <Modal onClose={() => setShowDelete(false)}>
                    <DeleteSpot setShowDelete={setShowDelete} />
                </Modal>
            )}
        </>
    )
}

export default DeleteSpotModal;
