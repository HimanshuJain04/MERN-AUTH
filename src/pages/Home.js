import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Home() {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    const sendReq = async () => {
        const res = await axios.get("http://localhost:4000/api/v1/home").catch((err) => {
            console.log(err)
        });
        console.log("res: ", res);
        const data = res?.data?.existUser;
        return data;
    }

    useEffect(() => {
        sendReq().then((data) => { setData(data) });
    }, [])

    return (
        <div>
            <div onClick={() => { navigate("/login") }} className='bg-blue-400 text-white font-semibold text-lg cursor-pointer px-5 py-2'>Log-out</div>
            <div className='my-5'>Hello {data?.name}</div>
        </div>
    )
}

export default Home;