import AdCard from '@/components/AdCard'

import React from 'react'

const page = () => {
    return (
        <> 
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row w-full h-full'>
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>  
                <AdCard adCopy='lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum' adImage='/8455966320107134295.png'/>
            </div>   
        </>
    )
}
export default page