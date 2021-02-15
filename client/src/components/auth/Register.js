import React, { useState, useContext } from "react";
import { AlertContext } from "../../context/alert/AlertState";
import { AuthContext } from "../../context/auth/AuthState";

function Register() {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  const { name, email, password, c_password } = user;

  const changeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (((name === "") | (email === ""), password === "")) {
      setAlert("Please Add all fields", "danger");
    } else {
      register(name, email, password);
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} id='name' onChange={changeInput} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} id='email' onChange={changeInput} />
        </div>
        <div className='form-group'>
          <label htmlFor='pass'>Password</label>
          <input type='password' name='password' value={password} id='pass' onChange={changeInput} />
        </div>
        <div className='form-group'>
          <label htmlFor='c-pass'>Confirm Password</label>
          <input type='password' name='c_password' value={c_password} id='c-pass' onChange={changeInput} />
        </div>
        <div>
          <input type='submit' value='Register' className='btn btn-block btn-primary' />
        </div>
      </form>
    </div>
  );
}

export default Register;
