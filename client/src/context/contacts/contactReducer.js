import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILER_CONTACTS,
  FILER_CLEAR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => (contact.id === action.payload.id ? action.payload : contact)),
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regEx = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regEx) || contact.email.match(regEx);
        }),
      };
    case FILER_CLEAR:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};
