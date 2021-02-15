import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";

function ContactForm() {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContactData(current);
    } else {
      setContactData({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current]);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contactData;

  const inputChange = e => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const submitHandler = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contactData);
    } else {
      updateContact(contactData);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className='text-primary'>{current ? "Edit Contact" : "Add Contact"}</h2>
      <input type='text' placeholder='Full Name' name='name' value={name} onChange={inputChange} />
      <input type='email' placeholder='Email Address' name='email' value={email} onChange={inputChange} />
      <input type='text' placeholder='Phone' name='phone' value={phone} onChange={inputChange} />
      <h5>Contact type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={inputChange}
      /> Personal{" "}
      <input type='radio' name='type' value='professional' checked={type === "professional"} onChange={inputChange} />{" "}
      Professional
      <div>
        <input type='submit' value={current ? "Update Contact" : "Add Contact"} className='btn btn-primary btn-block' />

        {current && (
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
