import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import userReducer from './users/currentUser';
import editUserReducer from './users/editUser';
import peopleReducer from './people/person';
import categoriesReducer from './categories/categories';
import fundsReducer from './funds/funds';

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  editUser: editUserReducer,
  people: peopleReducer,
  categories: categoriesReducer,
  funds: fundsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
