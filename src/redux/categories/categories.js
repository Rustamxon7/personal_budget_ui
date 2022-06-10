import axios from 'axios';
import { END_POINT, API_ROUTE } from '../../api/api';

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';

const CATEGORY_ADD = 'CATEGORY_ADD';
const CATEGORY_REMOVE = 'CATEGORY_REMOVE';
const CATEGORY_UPDATE = 'CATEGORY_UPDATE';
const LOADING = 'LOADING';

const initialState = {
  loading: false,
  categories: [],
  category: [],
  error: null,
};

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

export const getCategory = (category) => ({
  type: GET_CATEGORY,
  payload: category,
});

export const addCategory = (category) => ({
  type: CATEGORY_ADD,
  payload: category,
});

export const removeCategory = (id) => ({
  type: CATEGORY_REMOVE,
  payload: id,
});

export const updateCategory = (category) => ({
  type: CATEGORY_UPDATE,
  payload: category,
});

export const loading = (loading) => ({
  type: LOADING,
  payload: loading,
});

export const fetchCategories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${END_POINT}${API_ROUTE}categories`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const categoriesList = await response.data;
    const categories = categoriesList;
    dispatch(getCategories(categories));
  } catch (error) {
    dispatch(getCategories(error));
  }
};

export const fetchCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${END_POINT}${API_ROUTE}categories/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const category = await response.data;
    dispatch(getCategory(category));
  } catch (error) {
    dispatch(getCategory(error));
  }
};

export const addCategoryAction = (category) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${END_POINT}${API_ROUTE}categories`, category, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const categoryData = await response.data;
    dispatch(addCategory(categoryData));
  } catch (error) {
    dispatch(addCategory(error));
  }
};

export const removeCategoryAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${END_POINT}${API_ROUTE}categories/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const category = await response.data;
    dispatch(removeCategory(category.id));
  } catch (error) {
    dispatch(removeCategory(error));
  }
};

export const updateCategoryAction = (category) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${END_POINT}${API_ROUTE}categories/${category.id}`, category, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const categoryData = await response.data;
    dispatch(updateCategory(categoryData));
  } catch (error) {
    dispatch(updateCategory(error));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        loading: true,
        categories: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case CATEGORY_ADD:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case CATEGORY_REMOVE:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };
    case CATEGORY_UPDATE:
      return {
        ...state,
        loading: false,
        categories: state.categories.map((category) => (category.id === action.payload.id ? action.payload : category)),
      };
    default:
      return state;
  }
};
