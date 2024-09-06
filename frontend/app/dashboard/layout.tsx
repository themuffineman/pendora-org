import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import Search from '@/components/Search';
interface componentProps {
    children: React.ReactNode;
}

const layout: React.FC<componentProps> = async ({ children }) => {

    const {isAuthenticated} = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!isUserAuthenticated){
        redirect('/api/auth/login')
    }
  return (
    <main className='flex min-h-screen flex-col items-center bg-white'>
        
        <nav className="w-full px-2 bg-white flex items-center justify-end py-2 gap-10 border-b border-[#F5F5F5] shadow-lg">
           <Search/>
            <button className='w-max px-4 p-2 rounded-md text-black flex items-center justify-center bg-yellow-200'>Upgrade</button>
            <div className='flex items-center justify-between w-[7rem] p-3 rounded-md bg-[#F5F5F5]'>
                <div className='p-2 font-bold size-8 rounded-full bg-black text-white flex items-center justify-center'>
                    {user?.picture? (
                        <img src={user.picture} className='w-full h-full object-cover rounded-full'/>
                    ):(
                        user?.given_name
                    )}
                </div>
            </div>
        </nav>
        <div className='w-full h-full flex flex-col p-10 gap-[2rem] justify-start items-center overflow-auto bg-white'>
            {children}
        </div>
    </main>
  )
}

export default layout
