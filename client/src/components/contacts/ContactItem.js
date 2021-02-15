import React, { useContext } from "react";
import ContactContext from "../../context/contacts/contactContext";

function ContactItem({ contact }) {
  const contactContext = useContext(ContactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={"badge " + (type === "personal" ? "badge-primary" : "badge-success")}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}

        {phone && (
          <li>
            <i className='fas fa-phone-square-alt'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
}

export default ContactItem;
