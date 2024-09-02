"use client"
import Image from 'next/image'
import React, { useState } from 'react'

interface componentProps {
    adImage: string,
    adCopy: string
}

const AdCard: React.FC<componentProps> = ({adImage, adCopy})=>{
    const [isCopied, setIsCopied] = useState<boolean>(false)

    async function copyText(){
        setIsCopied(true)
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1200);
        })
        setIsCopied(false)
    }
    return (
        <div className='size-max flex flex-col items-center justify-between bg-[#f5f5f5] p-2 rounded-md mx-auto'>
            <img 
                src="/8455966320107134295.png"
                alt='Ad image'
                className="object-cover rounded-md w-[20rem] h-auto"
            />
            <div className='w-full h-max p-1 px-2 bg-[#f5f5f5] text-sm truncate rounded-b-md flex items-center justify-between'>
                <div className='w-max'>
                    {adCopy}
                </div>
                {
                    isCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#86efac" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                    ):(
                        <svg onClick={() => copyText()} className={`  p-1 rounded-md cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
                    )
                }
            </div>
        </div>
    )
}

export default AdCard