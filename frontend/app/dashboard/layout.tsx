import React from 'react'
import {getKindeServerSession, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import AppContent from '@/components/AppContent';
import StripePricingTable from '@/components/StripePricingTable';
interface componentProps {
    children: React.ReactNode;
}
const layout: React.FC<componentProps> = async ({ children }) => {
    async function isSubscribed(){
        const isSubscribedRes = await fetch('/api/get-susbscription')
        const {isSubscribed} = await isSubscribedRes.json()
        return isSubscribed
    }
    const {isAuthenticated} = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const isUserSubscribed = await isSubscribed()
    
    if(!isUserAuthenticated){
        redirect('/api/auth/login')
    }
    
    
  return (
    <main className='flex min-h-screen flex-col w-screen items-center bg-white'>
        {!isUserSubscribed? (
            <StripePricingTable/>
        ):(
            <AppContent user={user?.given_name?.charAt(0)}>
                {children}    
            </AppContent> 
        )}
    </main>
)
}

export default layout
