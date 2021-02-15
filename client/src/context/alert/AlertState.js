import { createContext, useReducer } from "react";
import reducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialSate = [];

  const [state, dispatch] = useReducer(reducer, initialSate);

  // Set alert
  const setAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
