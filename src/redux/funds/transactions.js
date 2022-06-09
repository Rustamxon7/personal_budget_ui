import { END_POINT, API_ROUTE } from '../../api/api';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const GET_TRANSACTIONS_SUCESS = 'GET_TRANSACTIONS_SUCESS';
const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';

const initialState = {
  loading: false,
  transactions: [],
  error: null,
};

export const getTransactions = (transactions) => ({
  type: GET_TRANSACTIONS,
  payload: transactions,
});

export const getTransactionsSucess = (transactions) => ({
  type: GET_TRANSACTIONS_SUCESS,
  payload: transactions,
});

export const getTransactionsError = (error) => ({
  type: GET_TRANSACTIONS_ERROR,
  payload: error,
});

export const fetchTransactions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${END_POINT}${API_ROUTE}transactions`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const transactionsList = await response.json();
    const transactions = transactionsList;
    dispatch(getTransactions(transactions));
  } catch (error) {
    dispatch(getTransactionsError(error));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: true,
      };
    case GET_TRANSACTIONS_SUCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case GET_TRANSACTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
