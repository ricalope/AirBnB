import { csrfFetch } from './csrf';


const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const ADD_BOOKING = 'bookings/ADD_BOOKING';


const getBookings = bookings => ({
    type: GET_BOOKINGS,
    bookings
})


const addBooking = booking => ({
    type: ADD_BOOKING,
    booking
})


export const getBookingsThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getBookings(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.message) {
            return data;
        }
    }
}


export const addBookingThunk = booking => async dispatch => {
    const { spotId, startDate, endDate } = booking;
    console.log(booking)
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addBooking(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.message) {
            return data
        }
    }
}


const initialState = { allBooks: {}, oneBook: {} }


const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_BOOKINGS: {
            const newState = { ...state, allBooks: {}, oneBook: {} }
            action.bookings.Bookings.forEach((b,id) => newState.allBooks[id] = b)
            return newState
        }
        case ADD_BOOKING: {
            const newState = { ...state, allBooks: { ...state.allBooks }, oneBook: {} }
            newState.allBooks[action.booking.spotId] = action.booking
            return newState
        }
        default:
            return state;
    }
}

export default bookingsReducer;
