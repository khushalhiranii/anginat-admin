import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'; // replace with the path to your auth reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
