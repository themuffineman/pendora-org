import AdCard from '@/components/AdCard'
import React from 'react'

const page = () => {
    return (
        <> 
            <div className='grid grid-cols-3 gap-2 place-items-center  grid-flow-row w-full h-full'>
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>  
                <AdCard adCopy='Hello There' adImage='8455966320107134295.png'/>
            </div>   
        </>
    )
}
export default page