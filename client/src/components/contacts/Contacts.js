import React, { useContext } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contacts/contactContext";

function Contacts() {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>No contacts found</h4>;
  }

  return (
    <>
      {filtered !== null
        ? filtered.map(contact => <ContactItem key={contact.id} contact={contact} />)
        : contacts.map(contact => <ContactItem key={contact.id} contact={contact} />)}
    </>
  );
}

export default Contacts;
