import { csrfFetch } from './csrf';

const GET_BOOKINGS = 'bookings/GET_BOOKINGS';


const getBookings = bookings => ({
    type: GET_BOOKINGS,
    bookings
})


export const getBookingsThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getBookings(data))
        return data
    }
}


const initialState = { allBooks: {}, oneBook: {} }


const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_BOOKINGS: {
            const newState = { ...state, allBooks: {}, oneBook: {} }
            action.bookings.Bookings.forEach(b => newState.allBooks[b.spotId] = b)
            return newState
        }
        default:
            return state;
    }
}

export default bookingsReducer;
