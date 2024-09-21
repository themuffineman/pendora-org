import React from 'react'
import {getKindeServerSession, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import AppContent from '@/components/AppContent';
interface componentProps {
    children: React.ReactNode;
}
const layout: React.FC<componentProps> = async ({ children }) => {
    const {isAuthenticated} = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    
    if(!isUserAuthenticated){
        redirect('/api/auth/login')
    }
  return (
    <main className='flex min-h-screen flex-col w-screen items-center bg-white'>
        <AppContent user={user?.given_name?.charAt(0)}>
            {children}    
        </AppContent> 
    </main>
)
}

export default layout
