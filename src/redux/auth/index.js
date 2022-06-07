import * as api from '../../api/api';

export const loadCurrentUser = (state) => state.auth.currentUser;

const LOAD_CURRENT_USER = 'auth/current_user';
const RESET = 'auth/reset';

export const setCurrentUser = (payload) => ({
  type: LOAD_CURRENT_USER,
  payload,
});

export const login = (payload) => async (dispatch) => {
  try {
    const response = await api.login(payload);
    dispatch(setCurrentUser(response));
  } catch (error) {
    dispatch(setCurrentUser(error));
  }
};

export const logout = () => async (dispatch) => {
  await api.logout();
  dispatch(setCurrentUser(null));
};

export const signup = (payload) => async (dispatch) => {
  const response = await api.signup(payload);
  dispatch(setCurrentUser(response));
};

const initialState = {
  currentUser: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_USER:
      return action.payload;
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
