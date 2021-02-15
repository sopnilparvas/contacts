import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const changeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = e => {
    console.log("Submitted");
    e.preventDefault();
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} id='name' onChange={changeInput} />
        </div>
        <div className='form-group'>
          <label htmlFor='pass'>Password</label>
          <input type='password' name='password' value={password} id='pass' onChange={changeInput} />
        </div>
        <div>
          <input type='submit' value='Login' className='btn btn-block btn-primary' />
        </div>
      </form>
    </div>
  );
}

export default Login;
