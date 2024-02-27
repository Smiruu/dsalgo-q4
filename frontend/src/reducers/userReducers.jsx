import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    SEND_RESET_PASSWORD_EMAIL_REQUEST,
    SEND_RESET_PASSWORD_EMAIL_SUCCESS,
    SEND_RESET_PASSWORD_EMAIL_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    
  } from "../constants/userConstants";
  
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };

  export const verifyOTPReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
      case VERIFY_OTP_REQUEST:
        return { loading: true, error: null };
      case VERIFY_OTP_SUCCESS:
        return { loading: false, error: null, success: true };
      case VERIFY_OTP_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };
  
  export const sendResetPasswordEmailReducer = (state = {}, action) => {
    switch (action.type) {
      case SEND_RESET_PASSWORD_EMAIL_REQUEST:
        return { loading: true };
      case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
        return { loading: false, success: true };
      case SEND_RESET_PASSWORD_EMAIL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case RESET_PASSWORD_REQUEST:
        return { loading: true };
      case RESET_PASSWORD_SUCCESS:
        return { loading: false, success: true, message: action.payload.message };
      case RESET_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };