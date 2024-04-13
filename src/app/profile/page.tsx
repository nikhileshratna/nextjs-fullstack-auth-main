"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState,useEffect} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/slice";
import Navbar from "../components/Navbar";

interface UserData {
    name: string;
    username: string;
    email: string;
  }
export default function ProfilePage() {
    const [token2,setToken2] = useState('1');
    const router = useRouter()
    const [data, setData] = useState<UserData | null>(null);
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            setToken2('');
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data);

    }
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setToken(token2));
    },[token2]);

    useEffect(()=>{
        getUserDetails();
    },[]);
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Profile</h1>
                <hr />
                <p>Profile page</p>
                {
                    
                    <div className="p-1 rounded bg-green-500">
                    {
                        data === null ? ("Nothing") : (
                            <div>
                                <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${data.name}` }alt="avtar" />
                                <p>Name : {data.name}</p>
                                <p>Username : {data.username}</p>
                                <p>Email : {data.email}</p>
                            </div>
                            
                            

                        )
                    }
                </div>
                }
            <hr />
            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
{/* 
            <button
            onClick={getUserDetails}
            className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button> */}


            </div>
        </div>
    )
}