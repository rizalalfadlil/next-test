"use client";
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const navigateTo = (url: string) => {
    window.location.href = url;
  };

interface UserInterface {
    id: string;
    username: string;
    name: string;
    type: string;
  }
export default function CheckAccess(type: string | string[], page: React.ReactNode) {
  const [userData, setUserData] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const user: string = localStorage.getItem("user") || "";
    setUserData(user);
    setIsClient(true);
  }, []);

  const parsedUser: UserInterface = JSON.parse(userData || "{}");

  const hasAccess = () => {
    if (Array.isArray(type)) {
      return type.includes(parsedUser.type);
    } else {
      return parsedUser.type === type;
    }
  };

  return isClient && (
    hasAccess() ? page : (<div className='w-full h-full grid gap-2 place-content-center text-center text-red-700'>
        <div><p className='text-5xl'>403</p><p>unauthorized</p></div>
        <div className='text-black text-lg py-8'><p>anda tidak memiliki akses ke halaman ini</p></div>
        <div className='grid md:grid-cols-2 gap-2'><Button onClick={()=>navigateTo('/login')}>Login</Button><Button onClick={()=>navigateTo('/')} variant="secondary">Halaman Utama</Button></div>
    </div>)
  );
}
