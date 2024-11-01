"use client";
import React, { useEffect, useState } from "react";
import AdCard from "@/components/AdCard";
import { useRouter } from "next/navigation";
import MainSearch from "@/components/MainSearch";
import GetPro from "@/components/GetPro";
import { useServiceUsage } from "@/hooks/useStorage";
import AuthLinks from "@/components/AuthLinks";

const page = () => {
  const [ads, setAds] = useState<string[] | []>([]);
  const [failedToFetch, setFailedToFetch] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [adsFound, setAdsFound] = useState<boolean>(true);
  const [usageCount, incrementUsage] = useServiceUsage();
  const [isAuth, setIsAuth]  = useState<any>()
  const router = useRouter();

  async function verifyAuth(){
    const isAuthResponse = await fetch("/api/is-auth");
    const isAuth = await isAuthResponse.json();
    setIsAuth(isAuth)
  }
  useEffect(()=>{
  },[])
  async function fetchData() {
    try {
      setFailedToFetch(false);
      setIsFetching(true);
      const adResponse = await fetch("/api/get-ads");
      if (!adResponse.ok) {
        throw new Error("Failed to fetch");
      }
      const { ads } = await adResponse.json();
      setAds(ads);
      setFailedToFetch(false);
    } catch (error: any) {
      console.log("Failed to fetch saved ads: ", error.message);
      setFailedToFetch(true);
    } finally {
      setIsFetching(false);
      if (ads.length === 0) {
        setAdsFound(false);
      } else {
        setAdsFound(true);
      }
    }
  }
  useEffect(() => {
    
    if(!isAuth?.isAuth){
      router.push("/api/auth/login")
    }else{
      fetchData();
    }
  }, []);

  return (
    <>
      <nav className="w-full px-5 gap-4 bg-white flex items-center justify-between py-2 border-b border-[#F5F5F5] shadow-lg fixed top-0 right-0 z-50 overflow-x-auto">
        <MainSearch />
        <div className="text-black text-sm min-w-max rounded-md p-2 bg-[#f5f5f5]">
          Trials Left: {4 - usageCount}
        </div>
        <div className="flex gap-2 items-center">
          <GetPro />
          <AuthLinks type={isAuth?.isAuth ? "logout" : "login"} />
        </div>
      </nav>
      <div className=" mt-16 p-10  flex flex-col w-full h-full items-center justify-center">
        <div
          className={` ${
            failedToFetch || isFetching || ads?.length === 0
              ? "flex items-center justify-center mt-20"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row"
          }  w-full h-full`}
        >
          {ads?.length > 0 ? (
            ads.map((src) => (
              <AdCard
                key={src}
                adImage={src}
                type="saved"
                format={
                  src.endsWith("png") ||
                  src.endsWith("jpeg") ||
                  src.endsWith("jpg") ||
                  src.endsWith("gif")
                    ? "image"
                    : "video"
                }
              />
            ))
          ) : !adsFound ? (
            <div className="w-max p-4 bg-[#f5f5f5] cursor-pointer transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]">
              No Ads Found
            </div>
          ) : failedToFetch ? (
            <button
              onClick={fetchData}
              className="w-max mt-20 p-4 bg-[#f5f5f5] cursor-pointer transition flex items-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]"
            >
              Failed To Fetch. Try Again
            </button>
          ) : isFetching ? (
            <div className="size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]" />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default page;
