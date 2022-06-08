/* eslint-disable max-len */
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
const CATEGORY_ADD = 'CATEGORY_ADD';
const CATEGORY_REMOVE = 'CATEGORY_REMOVE';
const CATEGORY_UPDATE = 'CATEGORY_UPDATE';
const CREATE_CATEGORY_ALL_PERSONS = 'CREATE_CATEGORY_ALL_PERSONS';
const LOADING = 'LOADING';

const END_POINT = 'https://personal-budget-plan.herokuapp.com/';
const API_ROUTE = 'api/v1/';

const initialState = {
  loading: true,
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

export const addCategoryFromAllPersons = (category) => ({
  type: CREATE_CATEGORY_ALL_PERSONS,
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
    const response = await fetch(`${END_POINT}${API_ROUTE}categories`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const categories = await response.json();
    dispatch(getCategories(categories));
  } catch (error) {
    dispatch(getCategories(error));
  }
};

export const fetchCategory = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const category = await response.json();
    dispatch(getCategory(category));
  } catch (error) {
    dispatch(getCategory(error));
  }
};

export const addCategoryAction = (category) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const categoryData = await response.json();
    dispatch(addCategory(categoryData));
  } catch (error) {
    dispatch(addCategory(error));
  }
};

export const removeCategoryAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    });
    const category = await response.json();
    dispatch(removeCategory(category.id));
  } catch (error) {
    dispatch(removeCategory(error));
  }
};

export const updateCategoryAction = (category) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${category.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const categoryData = await response.json();
    dispatch(updateCategory(categoryData));
  } catch (error) {
    dispatch(updateCategory(error));
  }
};

export const loadingAction = (loading) => ({
  type: LOADING,
  payload: loading,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case CATEGORY_ADD:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case CATEGORY_REMOVE:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
      };
    case CATEGORY_UPDATE:
      return {
        ...state,
        categories: state.categories.map((category) => (category.id === action.payload.id ? action.payload : category)),
      };
    case CREATE_CATEGORY_ALL_PERSONS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
