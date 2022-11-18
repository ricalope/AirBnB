import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllSpots } from '../../store/spots';
import './Spots.css'

function Spots() {
   const dispatch = useDispatch();
   const spotsObj = useSelector(state => state.spots.allSpots);
   const spots = Object.values(spotsObj);

   useEffect(() => {
      dispatch(getAllSpots())
   }, [ dispatch ]);

   return (
      <div className="outer">
         <div className="inner">
            {spots.map(spot => (
               <div key={spot.id} className="spots-card">
                  <nav>
                     <NavLink to={`/spots/${spot?.id}`}>
                        <img src={spot?.previewImage} className="spot-image" alt={spot.name} />
                        <h4>{`${spot?.city}, ${spot?.state}`}</h4>
                        <p>{`$${spot?.price} night`}</p>
                        <p>{`★ ${spot?.avgRating ? Number(spot.avgRating).toFixed(1) : 'no reviews yet'}`}</p>
                     </NavLink>
                  </nav>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Spots;
