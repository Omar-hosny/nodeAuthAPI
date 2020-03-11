import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth/user");
      dispatch({
        type: "LOADED_USER",
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: "LOADED_USER_FAILED"
      });
    }
  };

  // Register user

  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth/register", formData, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: "REGISTER_FAILED",
        payload: err.response.data
      });
    }
  };

  // Login User

  const loginUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth/login", formData, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILED",
        payload: err.response.data.data
      });
    }
  };

  // Log user out
  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loginUser,
        loadUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
