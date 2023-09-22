import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import isLoginAction from '../../Redux/Action/Action';
export default function PrivateRoute({ children }) {
    let dispatch=useDispatch();
    let podIsLogin=useSelector((storeData)=>storeData.podIsLogin);
    const [data,setData]=useState({email:''});
    const loginFunc=()=>{
        fetch(`http://localhost:4000/register/`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then((res)=>{
            if(res.token){
                // console.log(res)
                localStorage.setItem("podIsLogin",true);
                localStorage.setItem("token",res.token);
                localStorage.setItem("userData",JSON.stringify(res.userData))
                alert("Login Successful")
                isLoginAction(true,dispatch)
            }else{
                alert("Something went wrong")
            }
        }).catch((err)=>{console.log(err)})
    }
    return (
        <div>
            {
                podIsLogin ?  children  :
                    <>
                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <div className='h-13 min-w-fit text-4xl font-extrabold break-words flex items-center' style={{color:"#7E22CE",fontFamily:"Plus Jakarta Sans"}}>
                                <img
                                    className="mx-auto h-10 w-auto"
                                    src={logo}
                                    alt="Your Company"
                                /> 
                                </div>
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                onChange={
                                                    (e)=>{
                                                    setData({...data,email:e.target.value})
                                                }}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <button
                                            onClick={loginFunc}
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
                                        >
                                            Sign in Or Register
                                        </button>
                                    </div>
                                
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
