"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';

const Search = () => {
    const pathname = usePathname()
    const [input, setInput] = useState<string>('')
    const [platform, setPlatform] = useState<string>('google')
    const router = useRouter()
    const pathCondition = pathname === '/dashboard/search' || pathname === '/dashboard/saved-ads'
    function goToSearch(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        router.push(`/dashboard/search?url=${input}?platform=${platform}`);
    }
  return (
    pathCondition? (
        <div className='w-max flex gap-2 items-center justify-self-start'>
            <form onSubmit={(e)=> goToSearch(e)} className='relative w-[30rem] flex justify-center items-center self-start'>
                <input onChange={(e)=>{setInput(e.target.value)}} className='w-[30rem] h-12 p-2 px-[40px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md ' placeholder='Enter new website domain e.g. domain.com' type="search" />
                <svg className='absolute left-[5px] top-1/2 -translate-y-1/2' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#d3d3d3" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
            </form>
            <Select value={platform} onValueChange={(value)=>{setPlatform(value)}}>
                <SelectTrigger className="w-max h-12">
                    <SelectValue placeholder="Choose Ad Platform" />
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
    ):(
        null
    )
  )
  
}

export default Search