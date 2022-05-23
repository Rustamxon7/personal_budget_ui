const LOADING_PERSON = 'LOADING_PERSON';
const LOADING_PERSON_SUCCESS = 'LOADING_PERSON_SUCCESS';
const LOADING_PERSON_FAILURE = 'LOADING_PERSON_FAILURE';

const END_POINT = 'https://personal-budget-plan.herokuapp.com/';
const API_ROUTE = '/api/v1/';

const initialState = {
  loading: true,
  people: [],
  error: null,
};

export const loadingPerson = () => ({
  type: LOADING_PERSON,
});

export const loadingPersonSuccess = (people) => ({
  type: LOADING_PERSON_SUCCESS,
  payload: people,
});

export const loadingPersonFailure = (error) => ({
  type: LOADING_PERSON_FAILURE,
  payload: error,
});

export const fetchPeople = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}people`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const people = await response.json();
    console.log(people);
    dispatch(loadingPersonSuccess(people));
  } catch (error) {
    dispatch(loadingPersonFailure(error));
  }
};

export const fetchPerson = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}people/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const person = await response.json();
    dispatch(loadingPersonSuccess(person));
  } catch (error) {
    dispatch(loadingPersonFailure(error));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PERSON:
      return {
        ...state,
        loading: true,
      };
    case LOADING_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        people: action.payload,
      };
    case LOADING_PERSON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
