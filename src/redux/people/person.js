import { END_POINT, API_ROUTE } from '../../api/api';

const LOADING = 'LOADING';
const CREATE_PERSON = 'CREATE_PERSON';
const UPDATE_PERSON = 'UPDATE_PERSON';
const DELETE_PERSON = 'DELETE_PERSON';
const FETCH_PERSON = 'FETCH_PERSON';

const initialState = {
  loading: true,
  people: [],
  error: null,
};

export const createPerson = (person) => ({
  type: CREATE_PERSON,
  payload: person,
});

export const getPerson = (person) => ({
  type: FETCH_PERSON,
  payload: person,
});

export const updatePerson = (person) => ({
  type: UPDATE_PERSON,
  payload: person,
});

export const deletePerson = (id) => ({
  type: DELETE_PERSON,
  payload: id,
});

export const fetchPersons = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}people`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const people = await response.json();
    dispatch(getPerson(people));
  } catch (error) {
    dispatch(getPerson(error));
  }
};

export const deletePersonAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}people/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    });
    const person = await response.json();
    dispatch(deletePerson(person.id));
  } catch (error) {
    dispatch(error);
  }
};

export const createPersonAction = (person) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}people`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    const newPerson = await response.json();
    dispatch(createPerson(newPerson));
  } catch (error) {
    dispatch(error);
  }
};

export const updatePersonAction = (person) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}people/${person.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });
    const updatedPerson = await response.json();
    dispatch(updatePerson(updatedPerson));
  } catch (error) {
    dispatch(error);
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PERSON:
      return {
        ...state,
        loading: false,
        people: [...state.people, action.payload],
      };
    case UPDATE_PERSON:
      return {
        ...state,
        loading: false,
        people: action.payload,
      };
    case DELETE_PERSON:
      return {
        ...state,
        loading: false,
        people: action.payload,
      };
    case FETCH_PERSON:
      return {
        ...state,
        loading: false,
        people: action.payload,
      };
    default:
      return state;
  }
};
