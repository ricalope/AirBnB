import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editSpotDetails } from '../../store/spots';
import './EditSpot.css';

function EditSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spots.oneSpot);

    const [ address, setAddress ] = useState(spot.address);
    const [ city, setCity ] = useState(spot.city);
    const [ state, setState ] = useState(spot.state);
    const [ country, setCountry ] = useState(spot.country);
    const [ name, setName ] = useState(spot.name);
    const [ description, setDescription ] = useState(spot.description);
    const [ price, setPrice ] = useState(spot.price);
    const [ isLoaded, setIsLoaded ] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/spots/${spotId}`)
            const data = await res.json()
            setAddress(data.address)
            setCity(data.city)
            setState(data.state)
            setCountry(data.country)
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
        })()
    }, [ dispatch, isLoaded ]);

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
        const editedSpot = await dispatch(editSpotDetails(updatedData, spotId))
        if (editedSpot) {
            history.push(`/spots/${spotId}`);
        }
    }

    const onCancel = () => {
        history.push(`/spots/${spotId}`)
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    <label>
                        Country
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Price
                        <input
                            type="number"
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
