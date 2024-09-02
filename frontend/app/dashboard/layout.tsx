import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface componentProps {
    children: React.ReactNode;
}

const layout: React.FC<componentProps> = ({ children }) => {
  return (
    <main className='flex min-h-screen flex-col items-center bg-white'>
        <nav className="w-full px-2 bg-white flex items-center justify-end py-2 gap-10 border-b border-[#F5F5F5] shadow-lg">
            <button className='w-max px-4 p-2 rounded-md text-black flex items-center justify-center bg-yellow-200'>Upgrade</button>
            <Popover>
                <PopoverTrigger className='p-2 rounded-md hover:bg-[#F5F5F5] relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path></svg>
                    <div className='size-2 rounded-full bg-yellow-300 animate-pulse absolute top-2 right-3'/>
                </PopoverTrigger>
                <PopoverContent className='bg-[#f9f9f9] grid grid-flow-row grid-cols-1 p-1  w-max'>
                  <p className='p-3 text-black text-sm hover:bg-[#f1f1f1] rounded-md w-full h-max cursor-pointer'>Get 50% off</p>
                  <p className='p-3 text-black text-sm hover:bg-[#f1f1f1] rounded-md w-full h-max cursor-pointer'>Get 50% off</p>
                  <p className='p-3 text-black text-sm hover:bg-[#f1f1f1] rounded-md w-full h-max cursor-pointer'>Get 50% off</p>
                </PopoverContent>
            </Popover>
            <div className='p-2 rounded-md hover:bg-[#F5F5F5] animate-[transform:2px] relative'>
            </div>
            <div className='flex items-center justify-between w-[7rem] p-3 rounded-md bg-[#F5F5F5]'>
                <div className='p-2 font-bold size-8 rounded-full bg-black text-white flex items-center justify-center'>P</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"></path></svg>
            </div>
        </nav>
        <div className='w-full p-20 h-full flex flex-col gap-[2rem] justify-center items-center overflow-auto bg-white'>
            {children}
        </div>
    </main>
  )
}

export default layout
