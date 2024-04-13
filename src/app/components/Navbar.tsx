"use client";
import Link from "next/link";
import React from 'react'
import { NavLink } from 'react-router-dom';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {useSelector} from "react-redux"
import { useState,useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/slice";
import axios from "axios";
import { toast } from "react-hot-toast";
const Navbar = () => {
    function clickHandler(){
        toast.error("Login First");
    }
    const {token} = useSelector((state:any) => state.auth);
    const [token2,setToken2] = useState('');
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            setToken2('');
            // router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setToken(token2));
    },[token2]);
  return (
    <div 
    className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 
      transition-all duration-200`}>
        <div
        className="flex w-11/12 max-w-maxContent items-center justify-between">
            <div>Shopping App</div>

            <ul className='flex gap-7'>
                <Link href='/'>Home</Link>
                <li>About</li>
                <li>
                    {
                     token !== '' &&
                     <Link href={'/profile'}>Profile</Link>
                    }
                </li>  
                <li>
                    {
                     token === '' &&
                     
                     <Link href={'/login'}
                     onClick={clickHandler}>Profile</Link>
                    }
                </li> 
            </ul>

            {
                token === '' &&
                (<ul className='flex gap-7'>
                    <Link href={'/login'}>Login</Link>
                    <Link href={'/signup'}>Signup</Link>
                </ul>)
            }
            {
                token !== '' && 
                (<ul className='flex gap-7'>
                <button onClick={logout}>Logout</button>
            </ul>)

            }
        </div>
    </div>
  )
}

export default Navbar