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
            setIsFetching(true)
            const adResponse = await fetch('/api/get-ads')
            if(!adResponse.ok){
                throw new Error('Failed to fetch')               
            }
            const ads = await adResponse.json()
            setAds(ads.adImages)
            setIsFetching(false)
            setFailedToFetch(false)
        } catch (error) {
            setFailedToFetch(true)
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
                    ) : ads.length === 0 ? (
                        <div className='bg-[#f5f5f5] p-4 rounded-md text-black text-lg flex items-center justify-center'>
                            No Saved Ads Found
                        </div>
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