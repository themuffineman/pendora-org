"use client"
import AdCard from '@/components/AdCard'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { AdDataContext } from '@/components/AppWrapper'
import Search from '@/components/Search'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { usePathname } from 'next/navigation'
const page = ({params}:{params: any}) => {
    interface adTypes{
        url: string;
        type: "image" | "video";
    }
    const context = useContext(AdDataContext)
    useEffect(() => {
        fetchData();
    },[])


    async function fetchData(){
        context?.setAdsData([])
        context?.setIsFetching(true)
        context?.setFailedToFetch(false)
        console.log('Platform is: ', params.platform[0], ' and url is: ', params.platform[1])
        try{
            const adResponse = await fetch(`${context?.backendUrl}/api/get-${params.platform[0]}-ads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: params.platform[1],
                    platform: params.platform[0] 
                })
            })
            if(!adResponse.ok){
                throw new Error('Failed to fetch')
            }
            const ads: {adImages: string[], adVideos?: string[]}  = await adResponse.json()
            if(params.platform[0] === 'google'){
                const initData:adTypes[] = []
                ads?.adImages.forEach((string)=>{
                    initData.push({
                        url: string,
                        type: 'image'
                    })
                })
                context?.setAdsData(initData)
            }
            if(params.platform[0] === 'meta'){
                const initData:adTypes[] = []
                console.log("meta Ads: ", ads)
                ads?.adImages.forEach((string)=>{
                    initData.push({
                        url: string,
                        type: 'image'
                    })
                })
                ads.adVideos && ads?.adVideos.forEach((string)=>{
                    initData.push({
                        url: string,
                        type: 'video'
                    })
                })
                console.log("Init Data:", initData)
                context?.setAdsData(initData)
            }
        } catch (error) {
            context?.setFailedToFetch(true)
        }finally{
            context?.setIsFetching(false)
        }
    }

    return (
        <> 
            <nav className="w-full px-5 gap-2 bg-white flex items-center justify-between py-2 border-b border-[#F5F5F5] shadow-lg fixed top-0 right-0 z-50 overflow-x-auto">
                    <Search context={context}/>
                    <div className="flex items-center gap-2 w-max">
                        <Link href={'/dashboard/saved-ads'} className='flex w-max gap-2 p-2 rounded-md bg-[#f5f5f5] items-center justify-center cursor-pointer hover:bg-[#f0f0f0]'>
                            {/* <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#c0c0c0" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg> */}
                            <span className='text-base font-medium text-center'>
                                Saved Ads
                            </span>
                        </Link>
                        <div className="flex items-center justify-end p-5">
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
                    </div>
                    
                </nav>
            <div className='w-full mt-16 h-full flex flex-col p-10 gap-[2rem] justify-start items-center overflow-auto bg-white'>
                <div className='flex flex-col w-full h-full items-center justify-start gap-10'>
                    <div className='w-full px-4 flex items-center justify-start'>
                        <div className='text-xl font-semibold text-black tracking-tight'>  
                            Results Found: {context?.adsData.length}
                        </div>
                    </div>
                    <div className={` ${context?.adsData?.length === 0 || context?.failedToFetch || context?.isFetching ? 'flex items-center justify-center': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row'}  w-full h-full`}>
                        {
                            context?.adsData && context.adsData.length > 0? (
                                context?.adsData.map((data) => (
                                    <AdCard 
                                        key={data.url}
                                        adImage={data.url} 
                                        type="search"
                                        format={data.type}
                                    />  
                                ))
                            ) : context?.failedToFetch ? (
                                <button 
                                onClick={fetchData} 
                                className='w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                                >
                                Failed To Fetch. Try Again.
                                </button>
                            ) : context?.isFetching ? (
                                <div className='size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]'/>
                            ) : context?.adsData.length === 0 ? (
                                <button 
                                onClick={fetchData} 
                                className='w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]'
                                >
                                No Ads Found. Try Again Later.
                                </button>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default page