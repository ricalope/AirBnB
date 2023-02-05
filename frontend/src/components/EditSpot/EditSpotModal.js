import { Modal } from '../../context/Modal';
import EditSpot from './index';


function EditSpotModal({ spotId, showEdit, setShowEdit }) {

    console.log(spotId)

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
