import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';
const ADD_SPOT = 'spots/addSpot';
const ADD_IMAGE = 'spots/addSpotImage'

const getSpots = spots => ({
   type: GET_SPOTS,
   spots
})

const addSpot = spot => ({
   type: ADD_SPOT,
   spot
})

const addSpotImage = (url, spotId) => ({
   type: ADD_IMAGE,
   url,
   spotId
})

export const getAllSpots = () => async dispatch => {
   const res = await fetch('/api/spots');
   if (res.ok) {
      const data = await res.json();
      dispatch(getSpots(data))
      return data
   }
}

export const addNewSpot = newSpot => async dispatch => {
   const res = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpot)
   });
   if (res.ok) {
      const newSpotAdd = res.json();
      dispatch(addSpot(newSpotAdd));
      return newSpotAdd
   }
}

export const addNewSpotImage = (url, spotId) => async dispatch => {
   const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(url)
   });
   if (res.ok) {
      const newSpotImage = await res.json();
      dispatch(addSpotImage(url, spotId));
      return newSpotImage;
   }
}

const initialState = { allSpots: {} };

export default function SpotsReducer(state = initialState, action) {
   switch(action.type) {
      case GET_SPOTS: {
         const newState = { ...state }
         newState.allSpots = {}
         action.spots.Spots.forEach(spot => {
            newState.allSpots[spot.id] = spot
         });
         return newState;
      }
      case ADD_SPOT: {
         const newState = { ...state, allSpots: { ...state.allSpots }  }
         newState.allSpots[action.spot.id] = action.spot
         return newState;
      }
      case ADD_IMAGE: {
         const newState = { ...state, allSpots: { ...state.allSpots } }
         newState.allSpots[action.spotId].previewImage = action.url
         return newState;
      }
      default:
         return state;
   }
}
