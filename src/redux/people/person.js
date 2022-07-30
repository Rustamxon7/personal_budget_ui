import axios from 'axios';
import { END_POINT, API_ROUTE } from '../../api/api';

const LOADING = 'LOADING';
const CREATE_PERSON = 'CREATE_PERSON';
const UPDATE_PERSON = 'UPDATE_PERSON';
const DELETE_PERSON = 'DELETE_PERSON';
const FETCH_PERSON = 'FETCH_PERSON';

const initialState = {
  loading: false,
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
    const response = await axios.get(`${END_POINT}${API_ROUTE}people`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const people = await response.data;
    dispatch(getPerson(people));
  } catch (error) {
    dispatch(getPerson(error));
  }
};

export const deletePersonAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${END_POINT}${API_ROUTE}people/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const person = await response.data;
    dispatch(deletePerson(person.id));
  } catch (error) {
    dispatch(error);
  }
};

export const createPersonAction = (person) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${END_POINT}${API_ROUTE}people`, person, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const newPerson = await response.data;
    dispatch(createPerson(newPerson));
  } catch (error) {
    dispatch(error);
  }
};

export const updatePersonAction = (person) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${END_POINT}${API_ROUTE}people/${person.id}`, person, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const updatedPerson = await response.data;
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
        loading: true,
        people: action.payload,
      };
    default:
      return state;
  }
};
