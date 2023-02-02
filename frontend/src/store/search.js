const SEARCH_SPOTS = 'search/SEARCH_SPOTS';


const searchSpots = spots => ({
    type: SEARCH_SPOTS,
    spots
})


export const searchSpotsThunk = spots => async dispatch => {
    const { search, filter } = spots;
    const res = await fetch(`/api/search?spots=${search}&filter=${filter}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(searchSpots(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.message) {
            return data
        }
    }
}


const initialState = { searchResults: {} }


const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_SPOTS: {
            const newState = { ...state, searchResults: {} }
            action.spots.Spots.forEach(spot => newState.searchResults[spot.id] = spot);
            return newState;
        }
        default:
            return state;
    }
}


export default searchReducer;
