import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';

const spotReviews = review => ({
   type: LOAD_REVIEWS,
   review
})

const addReview = review => ({
   type: ADD_REVIEW,
   review
})

export const loadSpotReviews = spotId => async dispatch => {
   const res = await fetch(`/api/spots/${spotId}/reviews`);
   if (res.ok) {
      const review = await res.json();
      dispatch(spotReviews(review));
      return review;
   }
}

export const addSpotReview = review => async dispatch => {
   const res = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
   });
   if (res.ok) {
      const newReview = await res.json();
      dispatch(addReview(newReview));
      return newReview;
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
      case ADD_REVIEW: {
         const newState = { ...state, spot: { ...state.spot } }
         newState.spot[action.review.id] = action.review
         return newState;
      }
      default:
         return state;
   }
}
