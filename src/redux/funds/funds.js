const GET_FUNDS = 'GET_FUNDS';
const ADD_FUND = 'ADD_FUND';
const REMOVE_FUND = 'REMOVE_FUND';
const UPDATE_FUND = 'UPDATE_FUND';
const LOADING = 'LOADING';
const GET_FUND = 'GET_FUND';
const GET_FUND_IMG = 'GET_FUND_IMG';

const END_POINT = 'https://personal-budget-plan.herokuapp.com/';
const API_ROUTE = 'api/v1/';

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
    const response = await fetch(`${END_POINT}${API_ROUTE}funds/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const fund = await response.json();
    dispatch(getFund(fund));
  } catch (error) {
    dispatch(getFund(error));
  }
};

// /api/v1/categories/:category_id/funds(.:format)

export const addFundAction = (fund, categoryUrl) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${categoryUrl}/funds`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fund),
    });
    const fundData = await response.json();
    dispatch(addFund(fundData));
  } catch (error) {
    dispatch(addFund(error));
  }
};

export const removeFundFromAllPersons = (categoryId, fundId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${categoryId}/funds/${fundId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    });
    const fund = await response.json();
    dispatch(removeFund(fund));
  } catch (error) {
    dispatch(removeFund(error));
  }
};

export const updateFundFromAllPersons = (fund, categoryId, fundId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}categories/${categoryId}/funds/${fundId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(fund),
    });
    const updatedFund = await response.json();
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
