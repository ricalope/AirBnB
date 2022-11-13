import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots';

const getSpots = (spots) => ({
   type: GET_SPOTS,
   spots
})

export const getAllSpots = () => async dispatch => {
   const res = await fetch('/api/spots');
   if (res.ok) {
      const data = await res.json();
      dispatch(getSpots(data))
      return data
   }
}

const initialState = { allSpots: {}, oneSpot: {} };

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
      default:
         return state;
   }
}
