import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview'

const spotReviews = review => ({
   type: LOAD_REVIEWS,
   review
})

const addReview = review => ({
   type: ADD_REVIEW,
   review
})

const deleteReview = reviewId => ({
   type: DELETE_REVIEW,
   reviewId
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

export const deleteSpotReview = reviewId => async dispatch => {
   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE"
   });
   if (res.ok) {
      const deletedReview = await res.json();
      dispatch(deleteReview(reviewId));
      return deletedReview;
   }
}

const initialState = { spot: {} }

export default function reviewsReducer(state = initialState, action) {
   switch(action.type) {
      case LOAD_REVIEWS: {
         const newState = { ...state, spot: {} }
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
      case DELETE_REVIEW: {
         const newState = { ...state, spot: { ...state.spot } }
         delete newState.spot[action.reviewId]
         return newState;
      }
      default:
         return state;
   }
}
