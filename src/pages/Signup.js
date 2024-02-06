import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function Signup() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPass: ""
  });

  function sumbitHandler(e) {
    e.preventDefault();

    axios.post("http://localhost:4000/api/v1/signup", loginData).then(() => {
      console.log("Registered");
      navigate("/login");
    }).catch((err) => {
      console.log("Register failed");
      console.log(err);
    })

  }
  function changeHandler(e) {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value
    });
  }
  return (
    <div>
      <form onSubmit={sumbitHandler} className='flex gap-1 flex-col'>
        <input name='name' value={loginData.name} onChange={changeHandler} className=' border-2 py-2 my-5 w-[300px] border-[black] ' placeholder='Name' type='text' />
        <input name='email' value={loginData.email} onChange={changeHandler} className=' border-2 py-2 my-5 w-[300px] border-[black] ' placeholder='Email' type='email' />
        <input name='password' value={loginData.password} onChange={changeHandler} className=' border-2 py-2 mb-5 w-[300px] border-[black] ' placeholder='Password' type='text' />
        <input name='confirmPass' value={loginData.confirmPass} onChange={changeHandler} className=' border-2 py-2 mb-5 w-[300px] border-[black] ' placeholder='confirmPass' type='text' />
        <button className='bg-red-200 py-1'>Sign up</button>
        <div className=' text-center'>OR</div>
        <Link to="/login" className='text-blue-700 text-center'>Login</Link>
      </form>
    </div>
  )
}

export default Signup;