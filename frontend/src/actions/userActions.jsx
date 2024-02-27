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
  import axios from "axios";


  
  
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/login/",
        { username: email, password: password },
        config
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };
  
  export const register = (username, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/register/",
        { username: username, email: email, password: password },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const verifyOTP = (otp) => async (dispatch) => {
    try {
      dispatch({
        type: VERIFY_OTP_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      console.log("Sending OTP verification request:", otp); // Debug statement
  
      const response = await axios.post("/api/verify-otp/", otp, config); // Corrected line
  
      console.log("Response from server:", response.data); // Debug statement
  
      dispatch({
        type: VERIFY_OTP_SUCCESS,
      });
  
      // You can dispatch additional actions or perform other operations here upon successful verification
    } catch (error) {
      console.error("Error verifying OTP:", error); // Debug statement
  
      dispatch({
        type: VERIFY_OTP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const sendResetPasswordEmail = (email) => async (dispatch) => {
    try {
      dispatch({
        type: SEND_RESET_PASSWORD_EMAIL_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/send-reset-password-email/",
        { email },
        config
      );
  
      dispatch({
        type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEND_RESET_PASSWORD_EMAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const resetPassword = (uidb64, token, password1, password2) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const body = { password1, password2 };
  
      const { data } = await axios.post(`/api/reset-password/${uidb64}/${token}/`, body, config);
  
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : 'Something went wrong with resetting the password.',
      });
    }
  };