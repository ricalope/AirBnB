import { csrfFetch } from './csrf';


const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const ADD_BOOKING = 'bookings/ADD_BOOKING';
const GET_CURRENT = 'bookings/GET_CURRENT';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const getBookings = bookings => ({
    type: GET_BOOKINGS,
    bookings
})


const addBooking = booking => ({
    type: ADD_BOOKING,
    booking
})


const getCurrent = bookings => ({
    type: GET_CURRENT,
    bookings
})


const updateBooking = booking => ({
    type: UPDATE_BOOKING,
    booking
})


const deleteBooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
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


export const getCurrentBookingsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current')
    if (res.ok) {
        const data = await res.json()
        dispatch(getCurrent(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.message) {
            return data
        }
    }
}


export const updateBookingThunk = booking => async dispatch => {
    const { bookingId, startDate, endDate } = booking;
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateBooking(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.message) {
            return data
        }
    }
}


export const deleteBookingThunk = bookingId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteBooking(bookingId))
    }
}


const initialState = { allBooks: {}, oneBook: {} }


const bookingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_BOOKINGS: {
            const newState = { ...state, allBooks: {}, oneBook: { ...state.oneBook } }
            action.bookings.Bookings.forEach((b,id) => newState.allBooks[id] = b)
            return newState
        }
        case ADD_BOOKING: {
            const newState = { ...state, allBooks: { ...state.allBooks }, oneBook: {} }
            newState.allBooks[action.booking.spotId] = action.booking
            return newState
        }
        case GET_CURRENT: {
            const newState = { ...state, allBooks: { ...state.allBooks }, oneBook: {} }
            action.bookings.Bookings.forEach(book => newState.oneBook[book.id] = book)
            return newState
        }
        case UPDATE_BOOKING: {
            const newState = { ...state, allBooks: { ...state.allBooks }, oneBook: {} }
            newState.allBooks[action.booking.id] = action.booking
            return newState
        }
        case DELETE_BOOKING: {
            const newState = { ...state, allBooks: { ...state.allBooks }, oneBook: { ...state.oneBook } }
            delete newState.allBooks[action.bookingId]
            return newState
        }
        default:
            return state;
    }
}

export default bookingsReducer;
