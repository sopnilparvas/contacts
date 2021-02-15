import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILER_CONTACTS,
  FILER_CLEAR,
} from "../types";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Salman Rahman",
        email: "auvi@salmanauvi.com",
        phone: "111-121-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Moshiur Rahman",
        email: "sajeeb@moshiur.com",
        phone: "111-121-1111",
        type: "personal",
      },
      {
        id: 3,
        name: "Akib Rahman",
        email: "eham@nations.com",
        phone: "111-121-1111",
        type: "professional",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Remove contact
  const deleteContact = id => {
    dispatch({ type: REMOVE_CONTACT, payload: id });
  };

  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter contacts
  const filterContacts = text => {
    dispatch({ type: FILER_CONTACTS, payload: text });
  };

  // Filter clear
  const clearFilter = () => {
    dispatch({ type: FILER_CLEAR });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
