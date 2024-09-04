"use client"
import AdCard from '@/components/AdCard'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [ads, setAds] = useState<string[]>([''])
    const [failedToFetch, setFailedToFetch] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const [url, setUrl] = useState<string | null>(null)

    useEffect(() => {
        const paramUrl = searchParams.get('url'); // Get the "url" parameter
        if (paramUrl !== url) {  // Check if it's different from the current state
            setUrl(paramUrl);    // Update the state
        }
    }, [searchParams, url]);

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url]);
    async function fetchData(){
        for(let retries = 0; retries < 4; retries++){
            try {
                setIsFetching(true)
                const adResponse = await fetch('https://pendora-org.onrender.com/api/get-google-ads', {
                    method: 'POST',
                    body: JSON.stringify({
                        url: 'stripe.com'
                    })
                })
                if(!adResponse){
                    continue
                }
                const ads = await adResponse.json()
                setAds(ads.adImages)
                setIsFetching(false)
                
            } catch (error) {
                if(retries === 3 ){
                    setIsFetching(false)
                    setFailedToFetch(true)
                }else{
                    continue
                }
            }
        }
    }
    return (
        <> 
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row w-full h-full'>
                {
                    ads?.length > 0 ? (
                        ads.map((src) => (
                            <AdCard 
                                key={src}
                                adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' 
                                adImage={src} 
                            />  
                        ))
                    ) : failedToFetch ? (
                        <div 
                            onClick={fetchData} 
                            className='w-max p-2 bg-[#f5f5f5] transition flex items-center justify-center rounded-md text-black text-sm hover:bg-[#f0f0f0]'
                        >
                            Failed To Fetch. Try Again
                        </div>
                    ) : isFetching && (
                        <div className='size-20 animate-spin border-2 border-t-0 border-black'/>
                    )
                }
            </div>   
        </>
    )
}
export default page