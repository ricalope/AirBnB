import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewSpot, addNewSpotImage } from '../../store/spots';

function AddSpot() {
   const dispatch = useDispatch();
   const history = useHistory();

   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [country, setCountry] = useState("");
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0);
   const [imageUrl, setImageUrl] = useState("");
   const [errors, setErrors] = useState([]);



   useEffect(() => {
      const errors = [];
      if (!address.length) errors.push("Please provide a valid address.");
      if (!city.length) errors.push("Please provide a valid city.");
      if (!state.length) errors.push("Please provide a valid state.");
      if (!country.length) errors.push("Please provide a valid Country.");
      if (!name.length) errors.push("Please provide a valid name for your spot.");
      if (!description.length) errors.push("Please provide a valid description for your spot.");
      if (!price || price <= 0) errors.push("Please provide a valid price per night.");
      if (!imageUrl.length) errors.push("Please provide a valid image url for your spot");
      setErrors(errors)
   }, [address, city, state, country, name, description, price, imageUrl]);

   const onSubmit = async e => {
      e.preventDefault();
      const formValues = {
         address,
         city,
         state,
         country,
         lat: 50,
         lng: 50,
         name,
         description,
         price,
         imageUrl
      }
      const addedSpot = await dispatch(addNewSpot(formValues))
      history.push(`/spots/${addedSpot.id}`);
   }

   return (
      <div>

      </div>
   );
}

export default AddSpot;
