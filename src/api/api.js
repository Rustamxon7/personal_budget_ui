import axios from 'axios';

const END_POINT = 'https://personal-budget-plan.herokuapp.com/';
const API_ROUTE = '/api/v1/';

// create an endoint for the api using the url and fetching the data
export const api = axios.create({
  baseURL: `${END_POINT}${API_ROUTE}`,
  // add the authorization header to the request
  headers: {
    Authorization: `${localStorage.getItem('token')}`,
  },
});

export const baseApi = axios.create({
  baseURL: `${END_POINT}`,
});

export const signup = async (user) => {
  try {
    const response = await baseApi.post('/signup', { user });
    const authToken = response.headers.authorization;
    const currentUser = response.data;
    localStorage.setItem('token', authToken);
    return { authToken, currentUser };
  } catch (error) {
    // if error message is 422 then return the error message user already exists
    if (error.response.status === 422) {
      return { error: error.response.data.status.message };
    }
    return { error: 'Something went wrong' };
  }
};

// if user not signup show error message
export const login = async (user) => {
  try {
    const response = await baseApi.post('/login', { user });
    const authToken = response.headers.authorization;
    const currentUser = response.data;
    localStorage.setItem('token', authToken);
    return { authToken, currentUser };
  } catch (error) {
    return { error: 'Something went wrong...' };
  }
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  await baseApi.delete('/logout', {
    headers: {
      Authorization: `${token}`,
    },
  });
};
