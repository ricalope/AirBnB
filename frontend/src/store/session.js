import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = user => ({
   type: SET_USER,
   payload: user
})

const removeUser = () => ({
   type: REMOVE_USER
})

export const login = user => async dispatch => {
   const { credential, password } = user;
   const res = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
         credential,
         password
      })
   });
   const data = await res.json();
   dispatch(setUser(data));
   return res
}

export const restoreUser = () => async dispatch => {
   const res = await csrfFetch('/api/session');
   const data = await res.json();
   dispatch(setUser(data));
   return res
}

export const signup = user => async dispatch => {
   const { username, firstName, lastName, email, password } = user;
   const res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
         username,
         firstName,
         lastName,
         email,
         password
      })
   });
   const data = await res.json();
   dispatch(setUser(data));
   return res;
}

export const logout = () => async dispatch => {
   const res = await csrfFetch('/api/session', {
      method: 'DELETE'
   });
   dispatch(removeUser());
   return res;
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
   let newState;
   switch(action.type) {
      case SET_USER:
         newState = Object.assign({}, state);
         newState.user = action.payload;
         return newState;
      case REMOVE_USER:
         newState = { ...state, user: { ...state.user } }
         newState.user = null;
         return newState;
      default:
         return state;
   }
}

export default sessionReducer
