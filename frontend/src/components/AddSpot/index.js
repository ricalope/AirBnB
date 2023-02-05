import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewSpot, addNewSpotImage } from '../../store/spots';
import './AddSpot.css';

function AddSpot({ setShowAdd }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ imageUrl, setImageUrl ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false);

    useEffect(() => {
        const errors = [];
        if (!address.trim().length) errors.push("* Please provide a valid address.");
        if (!city.trim().length) errors.push("* Please provide a valid city.");
        if (!state.trim().length) errors.push("* Please provide a valid state.");
        if (!country.trim().length) errors.push("* Please provide a valid Country.");
        if (!name.trim().length) errors.push("* Please provide a valid name for your spot.");
        if (!description.trim().length) errors.push("* Please provide a valid description for your spot.");
        if (!price || price <= 0) errors.push("* Please provide a valid price per night.");
        setErrors(errors);
    }, [ address, city, state, country, name, description, price, imageUrl ]);

    const onSubmit = async e => {
        e.preventDefault();

        setSubmitted(true);

        const formValues = {
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
        const addedSpot = await dispatch(addNewSpot(formValues))
        if (addedSpot) {
            dispatch(addNewSpotImage({ spotId: addedSpot.id, url: imageUrl, preview: true }))
            history.push(`/spots/${addedSpot.id}`);
            setAddress("");
            setCity("");
            setState("");
            setCountry("");
            setName("");
            setDescription("");
            setPrice(0);
            setImageUrl("");
            setShowAdd(false)
            return
        }

    }

    const onCancel = () => {
        setShowAdd(false);
    }

    return (
        <div className="create-container">
            <div className="create-header">
                <h2>Create a New Tiny Hub</h2>
            </div>
            <div className="create-form">
                <form onSubmit={onSubmit}>
                    {submitted && errors.length > 0 && (
                        <div className="errors">
                            <ul>
                                {errors.map((error, idx) => (
                                    <li key={idx}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                    <label>
                        Image
                        <input
                            type="url"
                            className="inputs"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </label>
                    <div className="button-container">
                        <button
                            type="button"
                            className="cancel-create"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-create"
                            onSubmit={onSubmit}
                        >
                            Submit Hub
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSpot;
