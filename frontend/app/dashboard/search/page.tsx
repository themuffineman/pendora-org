"use client"
import AdCard from '@/components/AdCard'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const page = () => {
    const [ads, setAds] = useState<string[] | []>([])
    const [failedToFetch, setFailedToFetch] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const url = searchParams.get("url")
    const platform = searchParams.get("platform")

    useEffect(() => {
        console.log('running yeah')
        fetchData();
    },[url, platform]);
    async function fetchData(){
        setIsFetching(true)
        setFailedToFetch(false)
        console.log('Platform is: ', platform)
        try {
            
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
                setAds(ads.adImages)
            }else if(platform === 'meta'){
                const initData = []
                initData.push(...ads?.adImages)
                initData.push(...ads?.adVideos)
                setAds(initData)
            }
        } catch (error) {
            setFailedToFetch(true)
        }finally{
            setIsFetching(false)
        }
    }
    return (
        <> 
            <div className='flex flex-col w-full h-full items-center justify-start'>
                <div className='w-full px-4 flex items-center justify-start'>
                    <div className='text-xl font-semibold text-black tracking-tight'>  
                        Results Found: {ads.length}
                    </div>
                </div>
                <div className={` ${ads?.length === 0 || failedToFetch || isFetching ? 'flex items-center justify-center': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row'}  w-full h-full`}>
                    {
                        ads.length > 0 ? (
                            ads.map((src) => (
                              <AdCard 
                                key={src}
                                adImage={src} 
                                type="search"
                              />  
                            ))
                        ) : failedToFetch ? (
                            <button 
                              onClick={fetchData} 
                              className='w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                            >
                              Failed To Fetch. Try Again
                            </button>
                        ) : isFetching ? (
                            <div className='size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]'/>
                        ) : ads.length === 0 ? (
                            <button 
                              onClick={fetchData} 
                              className='w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                            >
                              No Ads Found. Try Again
                            </button>
                        ) : null
                          
                          
                    }
                </div>
            </div>
        </>
    )
}
export default page