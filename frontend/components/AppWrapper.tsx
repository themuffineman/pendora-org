import React, { createContext, useState } from 'react'

interface contextType{ 
    adsData: string[];
    setAdsData: React.Dispatch<React.SetStateAction<string[]>>;
    savedAds: string[];
    setSavedAds: React.Dispatch<React.SetStateAction<string[]>>;
}
export const AdDataContext = createContext<contextType | null>(null)

export const AppWrapper = ({children}:{children: React.ReactNode}) => {
    const [adsData, setAdsData] = useState<string[]>([])
    const [savedAds, setSavedAds] = useState<string[]>([])
    const contextObject = {
        adsData,
        setAdsData,
        savedAds,
        setSavedAds
    }
  return (
    <AdDataContext.Provider value={contextObject}>
        {children}
    </AdDataContext.Provider>
  )
}
