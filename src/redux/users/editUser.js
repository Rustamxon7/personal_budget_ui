import { END_POINT } from '../../api/api';

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

const initialState = {
  loading: true,
  user: [],
  error: null,
};

export const updateUser = () => ({
  type: UPDATE_USER,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const fetchUpdateUser = (user) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const updatedUser = await response.json();
    dispatch(updateUserSuccess(updatedUser));
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
