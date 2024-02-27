import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer, verifyOTPReducer, sendResetPasswordEmailReducer, resetPasswordReducer } from './reducers/userReducers';

const reducer = combineReducers({
    // Add your reducers here
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    verifyOTP: verifyOTPReducer, // Include the new reducer here
    sendResetPasswordEmail: sendResetPasswordEmailReducer,
    resetPassword: resetPasswordReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    // Add your initial states here
    userLogin: { userInfo: userInfoFromStorage },
    verifyOTP: {}, // Include initial state for verifyOTPReducer
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
