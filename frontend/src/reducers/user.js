import { COIN_TOSS, LOGIN, LOGOUT, SET_USER } from '../constants/actionTypes';
import { jwtDecode } from "jwt-decode";


const initialState = {
  token: null,
  user: null,
  results: [],
  resultNumber: 0,
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const user = jwtDecode(action?.data.token);
      localStorage.setItem('token', action?.data.token);
      return { ...state, token: action?.data.token, user, };

    case LOGOUT:
      localStorage.clear();
      return { ...state, token: null, user: null };


    case SET_USER:
      localStorage.setItem('token', action?.data.token);
      return { ...state, token: action.data.token, user: action.data.user };


    case COIN_TOSS:
      state.resultNumber += 1;
      action.data.number = state.resultNumber;
      state.results.push(action.data);
      return { ...state, user: action.data.user };

    default:
      return state;
  }
}
export default loginReducer;