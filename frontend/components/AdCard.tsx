"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

interface componentProps {
    adImage: string,
    adCopy: string
}

const AdCard: React.FC<componentProps> = ({adImage, adCopy})=>{
    const [isCopied, setIsCopied] = useState<boolean>(false)

    async function copyText(){
        setIsCopied(true)
        navigator.clipboard.writeText(adCopy)
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
                src={adImage}
                alt='Ad image'
                className="object-cover rounded-md w-[20rem] h-auto"
            />
            <div className='w-full h-max p-1 px-1 bg-[#f5f5f5] text-sm truncate rounded-b-md flex items-center justify-between'>
                <div className='p-2 w-40 truncate bg-white rounded-md flex items-center justify-between gap-2'>
                    {adCopy}
                </div>
                <div className='w-max flex items-center justify-between gap-2'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                            <DialogTitle>Ad Content</DialogTitle>
                            <DialogDescription>
                                <textarea className='bg-[#F5F5F5]  shadow-2xl shadow-[#f1f1f1] rounded-md  p-2 w-full' rows={7}/>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    {
                        isCopied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#86efac" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                        ):(
                            <svg onClick={() => copyText()} className={`  p-1 rounded-md cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AdCard