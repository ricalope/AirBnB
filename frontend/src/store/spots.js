import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';
const ADD_SPOT = 'spots/addSpot';
const ADD_IMAGE = 'spots/addSpotImage';
const GET_ONE_SPOT = 'spot/getOneSpot';
const DELETE_SPOT = 'spot/deleteSpot';

const getSpots = spots => ({
   type: GET_SPOTS,
   spots
})

const addSpot = spot => ({
   type: ADD_SPOT,
   spot
})

const addSpotImage = (spotId, url, preview) => ({
   type: ADD_IMAGE,
   spotId,
   url,
   preview
})

const getOneSpot = spot => ({
   type: GET_ONE_SPOT,
   spot
})

const deleteSpot = spotId => ({
   type: DELETE_SPOT,
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

export const addNewSpotImage = data => async dispatch => {
   const { spotId, url, preview } = data;
   const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spotId, url, preview })
   });
   if (res.ok) {
      const newSpotImage = await res.json();
      dispatch(addSpotImage(spotId, url, preview));
      return newSpotImage;
   }
}

export const getSpotDetails = spotId => async dispatch => {
   const res = await fetch(`/api/spots/${spotId}`);
   if (res.ok) {
      const oneSpot = await res.json();
      dispatch(getOneSpot(oneSpot));
      return oneSpot
   }
}

export const editSpotDetails = (spot, spotId) => async dispatch => {
   const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot)
   });
   if (res.ok) {
      const editedSpot = res.json();
      dispatch(addSpot(editedSpot));
      return editedSpot;
   }
}

export const deleteOneSpot = spotId => async dispatch => {
   const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE"
   });
   if (res.ok) {
      dispatch(deleteSpot(spotId));
   }
}

const initialState = { allSpots: {}, oneSpot: {} };

export default function spotsReducer(state = initialState, action) {
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
      case GET_ONE_SPOT: {
        console.log('action', action)
         const newState = { ...state, allSpots: { ...state.allSpots }, oneSpot: { ...state.oneSpot } }
         newState.oneSpot = action.spot
         return newState;
      }
      case DELETE_SPOT: {
         const newState = { ...state, allSpots: { ...state.allSpots } }
         delete newState.allSpots[action.spotId]
         return newState;
      }
      default:
         return state;
   }
}
