import { Modal } from '../../context/Modal';
import AddSpot from './index';


function AddSpotModal({ showAdd, setShowAdd }) {

    return (
        <>
            {showAdd && (
                <Modal onClose={() => setShowAdd(false)}>
                    <AddSpot setShowAdd={setShowAdd}/>
                </Modal>
            )}
        </>
    )
}

export default AddSpotModal;
