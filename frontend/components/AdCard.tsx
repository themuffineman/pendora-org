"use client"
import React, { useState } from 'react'
import Toast from './Toast'
interface componentProps {
    adImage: string,
}
interface messageProps {
    message: string,
    error: boolean
}
const AdCard: React.FC<componentProps> = ({adImage})=>{
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [saveMessage, setSaveMessage] = useState<messageProps>({message: '', error: false})
    async function saveAd(){
        try {
            setConfirmation(true)
            const res = await fetch('/api/save-ad',{
                method: "POST",
                body: JSON.stringify({
                    url: adImage
                })
            })
            if(!res.ok){
                throw new Error(await res.text())
            }
            setSaveMessage({
                message: await res.text(),
                error: false
            })
        } catch (error: any) {
            setConfirmation(true)
            setSaveMessage({
                message: error.message,
                error: true
            })
        }
    }
    return (
        <div className='size-max flex flex-col items-center justify-between bg-[#f5f5f5] p-2 rounded-md mx-auto'>
            <img 
                src={adImage}
                alt='Ad image'
                className="object-cover rounded-md w-[20rem] h-auto"
            />
            <div className='w-full h-max p-1 px-1 bg-[#f5f5f5] text-sm truncate rounded-b-md flex items-center justify-between'>
                <button onClick={()=> {saveAd()}} className="p-2 rounded-md hover:bg-[#ffff] text-black">
                    Save to list
                </button>
                <a href={adImage} download={`Ad Image by adsInspect`} className='w-max p-1 rounded-md hover:bg-[#ffff]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
            </div>
            {
                confirmation && (
                    <Toast message={saveMessage.message} error={saveMessage.error}/>
                )
            }
        </div>
    )
}

export default AdCard