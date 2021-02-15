import { createContext, useReducer } from "react";
import axios from "axios";
import reducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERROR,
} from "../types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialSate = {
    token: localStorage.getItem("token"),
    isLogged: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialSate);

  // Load User

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/register", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  // Login User

  // Logout

  // Clear Errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isLogged: state.isLogged,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
