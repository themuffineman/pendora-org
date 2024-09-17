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
    async function fetchData(e: any, url: string, platform: string){
        try {
            e.preventDefault()
            const fetchUrl = platform === 'google' ? 'https://pendora-org.onrender.com/api/get-google-ads' : 'https://pendora-org.onrender.com/api/get-meta-ads'
            const adResponse = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    platform: platform 
                })
            })
            if(!adResponse.ok){
                throw new Error('Failed to fetch')
            }
            const ads = await adResponse.json()
            if(platform === 'google'){
                return [...ads.adImages]
            }else if(platform === 'meta'){
                const initData = []
                initData.push(...ads?.adImages)
                initData.push(...ads?.adVideos)
                return initData
            }
        } catch (error) {
            return []
        }
    }
  return (
    <main className='flex min-h-screen flex-col items-center bg-white'>
        <AppContent user={user?.given_name?.charAt(0)}>
            {children}    
        </AppContent> 
    </main>
)
}

export default layout
