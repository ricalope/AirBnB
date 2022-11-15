import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails, editSpotDetails } from '../../store/spots';

function EditSpot() {
   const { spotId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const spot = useSelector(state => state.spots.oneSpot);

   const [address, setAddress] = useState(spot.address || 'loading...');
   const [city, setCity] = useState(spot.city || 'loading...');
   const [state, setState] = useState(spot.state || 'loading...');
   const [country, setCountry] = useState(spot.country || 'loading...');
   const [name, setName] = useState(spot.name || 'loading...');
   const [description, setDescription] = useState(spot.description || 'loading...');
   const [price, setPrice] = useState(spot.price || 'loading...');
   const [isLoaded, setIsLoaded] = useState(false)

   useEffect(() => {
      dispatch(getSpotDetails(spotId))
         .then(() => setIsLoaded(true))
   }, [dispatch, isLoaded, spotId]);

   if (!isLoaded) return null;

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

   return (
      <div>
         <h2>Edit Your Current Hub</h2>
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
            <button
               type="submit">
                  Submit
               </button>
         </form>
      </div>
   );
}

export default EditSpot;
