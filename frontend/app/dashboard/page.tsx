"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function goToSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setIsLoading(true)
    router.push(`/dashboard/search?url=${inputValue}`);
  }

  return (
    <>
      <h1 className="text-5xl w-[42rem] leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">Discover the entire digital advertising world of a website</h1>
      <form onSubmit={(e)=> goToSearch(e)} className='relative w-full flex justify-center items-center'>
        <input onChange={(e)=> {setInputValue(e.target.value)}} className='w-[50%] h-14 p-2 px-[35px] bg-[#F5F5F5] placeholder:text-black/30 shadow-2xl shadow-[#f1f1f1] rounded-md ' placeholder='Enter website domain e.g. domain.com' type="search" />
        <svg className='absolute left-[25.5%] top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#d3d3d3" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
      </form>
      <div className={`${isLoading ? 'flex' : 'hidden'} gap-5 items-center rounded-md bg-[#f0f0f0] p-4 fixed bottom-8 right-16 w-max shadow-2xl shadow-[#f2f2f2]`}>
          <div className="size-5 rounded-full border-2 border-black border-t-[#f5f5f5] animate-spin [animation-duration:0.6s]"/>
          <p className="text-black text-sm flex items-center justify-center">
            ...Loading
          </p>
          <button className=" text-sm rounded-md p-3 bg-neutral-950 hover:scale-[1px] transition hover:bg-red-600 text-white ">Cancel</button>
      </div>
    </>
  )
}

export default page