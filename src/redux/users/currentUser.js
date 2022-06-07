const GET_CURRENT_USER = 'GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

const END_POINT = 'https://personal-budget-plan.herokuapp.com/';

const initialState = {
  loading: true,
  user: [],
  error: null,
};

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
});

export const getCurrentUserSuccess = (user) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserFailure = (error) => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: error,
});

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}current_user`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const user = await response.json();
    dispatch(getCurrentUserSuccess(user));
  } catch (error) {
    dispatch(getCurrentUserFailure(error));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
