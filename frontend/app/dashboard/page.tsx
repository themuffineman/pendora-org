"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react'
import { AdDataContext } from '@/components/AppWrapper'
import { Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';

const Page = () => {
  const router = useRouter()
  const context = useContext(AdDataContext)
  const [inputValue, setInputValue] = useState<string | null>()
  const [platform, setPlatform] = useState<string>('google')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function goToSearch(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setIsLoading(true)
    router.push(`/dashboard/search?url=${inputValue}&platform=${platform}`);
  }

  return (
    <>
      <div className="flex items-center justify-end p-5 fixed top-0 w-full">
        <Popover>
            <PopoverTrigger >
                <div className='p-2 font-bold size-8 rounded-full bg-black text-white flex items-center justify-center uppercase'>
                    {context?.user}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-max h-max flex flex-col gap-2 rounded-md bg-[#f5f5f5]">
                <a className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-black text-white flex items-center justify-center" href={process.env.BILLING_PORTAL_URL}>Manage Billing</a>
                  <LogoutLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
                    Sign Out
                </LogoutLink>
            </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-10 items-center w-full h-full my-auto">
        <h1 className=" text-4xl md:text-5xl w-full max-w-[42rem] md:leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          Discover the entire digital advertising world of a website
        </h1>
        <div className='w-full max-w-[700px] flex md:flex-row flex-col gap-2 items-center justify-center justify-self-start'>
          <form onSubmit={(e)=> goToSearch(e)} className='relative w-[80%] min-w-[300px] max-w-[30rem] flex justify-center items-center self-center'>
            <input required={true} onChange={(e)=> {setInputValue(e.target.value)}} className='w-[100%] h-12 p-2 px-[40px] pr-[100px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md ' placeholder={platform === 'google' ? 'Enter new website domain e.g. domain.com' : 'Enter Facebook or Instagram username' } type="search" />
            <svg className='absolute left-[5px] top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#d3d3d3" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
            <button type='submit' className="w-[5rem] h-[2.3rem] rounded-md bg-yellow-400 text-black absolute top-1/2 -translate-y-1/2 right-[6px]">Submit</button>
          </form>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className=" w-[80%] md:w-max h-12 min-w-[300px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="meta">
                  <div className='flex gap-2 items-center justify-between '>
                      <img className='size-5' src="/metaverse.svg" alt="Meta logo" />
                      <span className='text-base font-medium text-center'>Meta Ads</span>
                  </div>
                </SelectItem>
                <SelectItem value="google">
                    <div className='flex gap-2 items-center justify-between'>
                        <img className='size-5' src="/google-logo.svg" alt="Google logo" />
                        <span className='text-base font-medium text-center'>Google Ads</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
      </div>
        <div className={`${isLoading ? 'flex' : 'hidden'} gap-5 items-center rounded-md bg-[#f0f0f0] p-4 fixed bottom-8 right-16 w-max shadow-2xl shadow-[#f2f2f2]`}>
            <div className="size-5 rounded-full border-2 border-black border-t-[#f5f5f5] animate-spin [animation-duration:0.6s]"/>
            <p className="text-black text-sm flex items-center justify-center">
              ...Loading
            </p>
            <button className=" text-sm rounded-md p-3 bg-neutral-950 hover:scale-[1px] transition hover:bg-red-600 text-white ">Cancel</button>
        </div>
      </div>
    </>
  )
}

export default Page