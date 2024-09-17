import React, { createContext, useState } from 'react'

interface contextType{ 
    adsData: string[];
    setAdsData: React.Dispatch<React.SetStateAction<string[]>>;
    savedAds: string[];
    setSavedAds: React.Dispatch<React.SetStateAction<string[]>>;
    failedToFetch: boolean;
    setFailedToFetch: React.Dispatch<React.SetStateAction<boolean>>;
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AdDataContext = createContext<contextType | null>(null)

export const AppWrapper = ({children}:{children: React.ReactNode}) => {
    const [adsData, setAdsData] = useState<string[]>([])
    const [savedAds, setSavedAds] = useState<string[]>([])
    const [failedToFetch, setFailedToFetch] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const contextObject = {
        adsData,
        setAdsData,
        savedAds,
        setSavedAds,
        failedToFetch,
        setFailedToFetch,
        isFetching,
        setIsFetching
    }
  return (
    <AdDataContext.Provider value={contextObject}>
        {children}
    </AdDataContext.Provider>
  )
}
