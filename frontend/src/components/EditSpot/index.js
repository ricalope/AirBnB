import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editSpotDetails, getSpotDetails } from '../../store/spots';
import './EditSpot.css';

function EditSpot({ setShowEdit }) {

    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.oneSpot);

    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ isLoaded, setIsLoaded ] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/spots/${spot.id}`)
            const data = await res.json()
            setAddress(data.address)
            setCity(data.city)
            setState(data.state)
            setCountry(data.country)
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setIsLoaded(true)
        })()
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoaded(true);

        const updatedData = {
            address,
            city,
            state,
            country,
            lat: 50,
            lng: 50,
            name,
            description,
            price
        }
        const editedSpot = await dispatch(editSpotDetails(updatedData, spot.id))
        if (editedSpot) {
            await dispatch(getSpotDetails(spot.id))
            setShowEdit(false)
        }
    }

    const onCancel = () => {
        setShowEdit(false)
    }

    return isLoaded && (
        <div className="edit-container">
            <div className="edit-header">
                <h2>Edit Your Current Hub</h2>
            </div>
            <div className="edit-form">
                <form onSubmit={onSubmit}>
                    <label>
                        Address
                        <input
                            type="text"
                            className="inputs"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label>
                        City
                        <input
                            type="text"
                            className="inputs"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        State
                        <input
                            type="text"
                            className="inputs"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    <label>
                        Country
                        <input
                            type="text"
                            className="inputs"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            className="inputs"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            className="inputs"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Price
                        <input
                            type="number"
                            className="inputs"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    <div className="edit-form-buttons">
                        <button
                            className="cancel-edit"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="edit-button"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSpot;
