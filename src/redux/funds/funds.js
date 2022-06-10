import axios from 'axios';
import { END_POINT, API_ROUTE } from '../../api/api';

const GET_FUNDS = 'GET_FUNDS';
const ADD_FUND = 'ADD_FUND';
const REMOVE_FUND = 'REMOVE_FUND';
const UPDATE_FUND = 'UPDATE_FUND';
const LOADING = 'LOADING';
const GET_FUND = 'GET_FUND';
const GET_FUND_IMG = 'GET_FUND_IMG';

const initialState = {
  loading: false,
  funds: [],
  fund: [],
  error: null,
};

export const getFunds = (funds) => ({
  type: GET_FUNDS,
  payload: funds,
});

export const getFund = (fund) => ({
  type: GET_FUND,
  payload: fund,
});

export const getFundImg = (img) => ({
  type: GET_FUND_IMG,
  payload: img,
});

export const addFund = (fund) => ({
  type: ADD_FUND,
  payload: fund,
});

export const removeFund = (id) => ({
  type: REMOVE_FUND,
  payload: id,
});

export const updateFund = (fund) => ({
  type: UPDATE_FUND,
  payload: fund,
});

export const loading = (loading) => ({
  type: LOADING,
  payload: loading,
});

export const fetchFunds = (categoryId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${categoryId}/funds`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const funds = await response.json();
    dispatch(getFunds(funds));
  } catch (error) {
    dispatch(getFunds(error));
  }
};

export const fetchFund = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${END_POINT}${API_ROUTE}funds/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const fund = await response.data;
    dispatch(getFund(fund));
  } catch (error) {
    dispatch(getFund(error));
  }
};

export const addFundAction = (fund, categoryUrl) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${END_POINT}${API_ROUTE}categories/${categoryUrl}/funds`, fund, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const fundData = await response.data;
    dispatch(addFund(fundData));
  } catch (error) {
    dispatch(addFund(error));
  }
};

export const removeFundFromAllPersons = (categoryId, fundId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${END_POINT}${API_ROUTE}categories/${categoryId}/funds/${fundId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const fund = await response.data;
    dispatch(removeFund(fund));
  } catch (error) {
    dispatch(removeFund(error));
  }
};

export const updateFundFromAllPersons = (fund, categoryId, fundId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${END_POINT}${API_ROUTE}categories/${categoryId}/funds/${fundId}`, fund, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });
    const updatedFund = await response.data;
    dispatch(updateFund(updatedFund));
  } catch (error) {
    dispatch(updateFund(error));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FUNDS:
      return {
        ...state,
        funds: action.payload,
        loading: true,
      };
    case GET_FUND:
      return {
        ...state,
        fund: action.payload,
        loading: false,
      };
    case ADD_FUND:
      return {
        ...state,
        funds: [...state.funds, action.payload],
        loading: false,
      };
    case REMOVE_FUND:
      return {
        ...state,
        funds: state.funds.filter((fund) => fund.id !== action.payload),
        loading: false,
      };
    case UPDATE_FUND:
      return {
        ...state,
        funds: state.funds.map((fund) => (fund.id === action.payload.id ? action.payload : fund)),
        loading: false,
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
