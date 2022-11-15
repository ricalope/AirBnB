import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';

const spotReviews = review => ({
   type: LOAD_REVIEWS,
   review
})

export const loadSpotReviews = spotId => async dispatch => {
   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
   if (res.ok) {
      const review = await res.json();
      dispatch(spotReviews(review));
      return review;
   }
}

const initialState = { spot: {} }

export default function reviewsReducer(state = initialState, action) {
   switch(action.type) {
      case LOAD_REVIEWS: {
         const newState = { ...state, spot: { ...state.spot } }
         action.review.Reviews.forEach(review => {
            newState.spot[review.id] = review
         });
         return newState;
      }
      default:
         return state;
   }
}
