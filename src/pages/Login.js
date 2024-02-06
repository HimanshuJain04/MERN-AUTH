import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  function sumbitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:4000/api/v1/login", loginData)
      .then((res) => {
        console.log("Login SuccessFull");
        console.log(res);
        navigate("/home");
      }).catch((err) => {
        console.log("Login Failed");
        console.log(err);
      });
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
        <input name='email' value={loginData.email} onChange={changeHandler} className=' border-2 py-2 my-5 w-[300px] border-[black] ' placeholder='Email' type='email' />
        <input name='password' value={loginData.password} onChange={changeHandler} className=' border-2 py-2 mb-5 w-[300px] border-[black] ' placeholder='Password' type='text' />
        <button className='bg-red-200 py-1'>Login</button>
        <div className=' text-center'>OR</div>
        <div onClick={() => { navigate("/signup") }} className='text-blue-700 text-center'>SignUp</div>
      </form>
    </div>
  )
}

export default Login