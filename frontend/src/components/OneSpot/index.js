import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spots';

function OneSpot() {
   let { spotId } = useParams();
   spotId = parseInt(spotId)
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSpotDetails(spotId))
   }, [dispatch, spotId]);

   const spot = useSelector(state => state.spots.oneSpot);
   console.log(spot.SpotImages[0].url)

   return (
      <div>
         <h2>{spot.name}</h2>
         <h5>{`${spot.city}, ${spot.state} ${spot.country}`}</h5>
         <h6>{`★${spot.avgStarRating}`}</h6>
         <div className="one-image-div">
            <img className="one-image" src={spot.SpotImages[0].url} alt={spot.name} />
         </div>
         <div>
            <p className="spot-description">{spot.description}</p>
         </div>
      </div>
   );
}

export default OneSpot;
