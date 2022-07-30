import store from '../redux/configureStore';
import { api } from './api';
import logoutActionCreator from '../redux/auth/actionCreator';

const apiInterceptions = () => {
  api.interceptors.request.use((config) => {
    const {
      auth: { token },
    } = store.getState();
    const authConfig = { ...config };
    if (token) {
      authConfig.headers.Authorization = token;
    }
    return authConfig;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        store.dispatch(logoutActionCreator());
      }
      throw error;
    }
  );
};

export default apiInterceptions;
