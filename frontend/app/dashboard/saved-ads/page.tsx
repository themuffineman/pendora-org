"use client"
import React, { useEffect, useState } from 'react'
import AdCard from '@/components/AdCard'
const page = () => {
    const [ads, setAds] = useState<string[] | []>([])
    const [failedToFetch, setFailedToFetch] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    useEffect(() => {
        fetchData();
    },[])
    async function fetchData(){
        try {
            setFailedToFetch(false)
            setIsFetching(true)
            const adResponse = await fetch('/api/get-ads')
            if(!adResponse.ok){
                throw new Error('Failed to fetch')               
            }
            const {ads} = await adResponse.json()
            console.log('ads: ',ads)
            setAds(ads)
            setFailedToFetch(false)
        } catch (error: any) {
            console.log('Failed to fetch saved ads: ', error.message)
            setFailedToFetch(true)
        }finally{
            setIsFetching(false)
        }
    }
  return (
    <> 
        <div className='flex flex-col w-full h-full items-center justify-start'>
            
            <div className={` ${failedToFetch || isFetching ? 'flex items-center justify-center': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row'}  w-full h-full`}>
                {
                    ads?.length > 0 ? (
                        ads.map((src) => (
                            <AdCard
                                key={src}
                                adImage={src} 
                                type="saved"
                            />  
                        ))
                    ) : ads?.length === 0 ? (
                        <div 
                            className='w-max p-4 bg-[#f5f5f5] cursor-pointer transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                        >
                            No Ads Found
                        </div>
                    ) : failedToFetch ? (
                        <button 
                            onClick={fetchData} 
                            className='w-max p-4 bg-[#f5f5f5] cursor-pointer transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                        >
                            Failed To Fetch. Try Again
                        </button>
                    ) : isFetching ? (
                        <div className='size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]'/>
                    ) : null
                }
            </div>
        </div>
    </>
  )
}

export default page