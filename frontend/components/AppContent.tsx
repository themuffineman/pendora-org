"use client"
import React, { useContext } from 'react'
import Search from './Search'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { usePathname } from 'next/navigation'
import { AdDataContext, AppWrapper } from './AppWrapper'

const AppContent = ({user, children}:{user?: string, children:any})=>{
    
    const context = useContext(AdDataContext)
    const pathname = usePathname()
    const pathCondition = pathname === '/dashboard/search' || pathname === '/dashboard/saved-ads' || pathname === 'dashboard'

    return (
        <>
            {pathCondition? (
                <nav className="w-full px-5 bg-white flex items-center justify-end py-2 gap-10 border-b border-[#F5F5F5] shadow-lg">
                    <Search context={context}/>
                    <Link href={'/dashboard/saved-ads'} className='flex gap-2 p-2 rounded-md bg-[#f5f5f5] items-center justify-center cursor-pointer hover:bg-[#f0f0f0]'>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#c0c0c0" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
                        <span className='text-base font-medium text-center'>
                            Saved Ads
                        </span>
                    </Link>
                    <button className='w-max px-4 p-2 rounded-md text-black flex items-center justify-center bg-yellow-200'>Upgrade</button>
                    <Popover>
                        <PopoverTrigger>
                            <div className='p-2 font-bold size-8 rounded-full bg-black text-white flex items-center justify-center uppercase'>
                                {user && user}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-max h-max rounded-md bg-[#f5f5f5]">
                            <LogoutLink className='hover:bg-[#ffffff] rounded-md text-black text-base font-medium'>
                                Sign Out
                            </LogoutLink>
                        </PopoverContent>
                    </Popover>
                </nav>
            ): null}
            <div className='w-full h-full flex flex-col p-10 gap-[2rem] justify-start items-center overflow-auto bg-white'>
                <AppWrapper>
                    {children}
                </AppWrapper>
            </div>
        </>
    )
}

export default AppContent