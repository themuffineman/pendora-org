import React, { createContext, useState } from "react";

interface contextType {
    adsData: adTypes[];
    setAdsData: React.Dispatch<React.SetStateAction<adTypes[]>>;
    savedAds: string[];
    setSavedAds: React.Dispatch<React.SetStateAction<string[]>>;
    failedToFetch: boolean;
    setFailedToFetch: React.Dispatch<React.SetStateAction<boolean>>;
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
    user: string;
    backendUrl: string;
}

type adTypes = {
    url: string;
    type: "image" | "video";
};
export const AdDataContext = createContext<contextType | null>(null);

export const AppWrapper = ({
    children,
    user,
    backendUrl,
}: {
    children: React.ReactNode;
    user: string;
    backendUrl: string;
}) => {
    const [adsData, setAdsData] = useState<adTypes[]>([]);
    const [savedAds, setSavedAds] = useState<string[]>([]);
    const [failedToFetch, setFailedToFetch] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const contextObject = {
        adsData,
        setAdsData,
        savedAds,
        setSavedAds,
        failedToFetch,
        setFailedToFetch,
        isFetching,
        setIsFetching,
        user,
        backendUrl,
    };
    return (
        <AdDataContext.Provider value={contextObject}>
            {children}
        </AdDataContext.Provider>
    );
};
