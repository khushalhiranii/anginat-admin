// reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    successMessage: null,
    showLoading: false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user; // You can adjust this based on your API response
      state.errorMessage = null;
      state.successMessage = 'Login successful!';
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.errorMessage = action.payload.error; // Error from API response
      state.successMessage = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.errorMessage = null;
      state.successMessage = null;
    },
    loadingToggle(state, action) {
      state.showLoading = action.payload;
    },
  },
});

// Export actions
export const {
  loginSuccess,
  loginFailure,
  logout,
  loadingToggle,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
