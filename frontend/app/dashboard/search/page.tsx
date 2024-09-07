"use client"
import AdCard from '@/components/AdCard'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const page = () => {
    const [ads, setAds] = useState<string[] | []>([])
    const [failedToFetch, setFailedToFetch] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const url = searchParams.get("url")

    useEffect(() => {
        console.log('running yeah')
        fetchData();
    },[]);
    async function fetchData(){
        setFailedToFetch(false)
        setIsFetching(true)
        for(let retries = 0; retries < 4; retries++){
            try {
                const adResponse = await fetch('https://pendora-org.onrender.com/api/get-google-ads', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: url
                    })
                })
                if(!adResponse.ok){
                    continue
                }
                const ads = await adResponse.json()
                setAds(ads.adImages)
                setIsFetching(false)
                break
            } catch (error) {
                if(retries === 3 ){
                    setIsFetching(false)
                    setFailedToFetch(true)
                }else{
                    console.log('Retrying request')
                    continue
                }
            }
        }
    }
    return (
        <> 
            <div className='flex flex-col w-full h-full items-center justify-start'>
                <div className='w-full px-4 flex items-cetner justify-between'>
                    <div className='text-xl font-semibold text-black tracking-tight'>
                        Results Found: {ads.length}
                    </div>
                    <Select defaultValue='30Days'>
                        <SelectTrigger className="w-max h-12 flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>
                            <SelectValue placeholder="Choose Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30Days">
                                <div className='flex gap-2 items-center justify-between '>
                                    <span className='text-base font-medium text-center'>Past 30 Days</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="60Days">
                                <div className='flex gap-2 items-center justify-between'>
                                    <span className='text-base font-medium text-center'>Past 60 Days</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={` ${failedToFetch || isFetching ? 'flex items-center justify-center': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row'}  w-full h-full`}>
                    <AdCard 
                        adImage={'https://tpc.googlesyndication.com/archive/simgad/4801254084584785439'} 
                    />  
                    {
                        ads?.length > 0 ? (
                            ads.map((src) => (
                                <AdCard 
                                    key={src}
                                    adImage={src} 
                                />  
                            ))
                        ) : failedToFetch ? (
                            <button 
                                onClick={fetchData} 
                                className='w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                            >
                                Failed To Fetch. Try Again
                            </button>
                        ) : isFetching && (
                            <div className='size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]'/>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default page