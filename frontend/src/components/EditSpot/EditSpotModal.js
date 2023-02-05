import { Modal } from '../../context/Modal';
import EditSpot from './index';


function EditSpotModal({ showEdit, setShowEdit }) {

    return (
        <>
            {showEdit && (
                <Modal onClose={() => setShowEdit(false)}>
                    <EditSpot setShowEdit={setShowEdit} />
                </Modal>
            )}
        </>
    )
}

export default EditSpotModal;
