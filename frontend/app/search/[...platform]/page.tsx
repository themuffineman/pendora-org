"use client"
import AdCard from "@/components/AdCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetPro from "@/components/GetPro";
import { useServiceUsage } from "@/hooks/useStorage";
import Search from "@/components/Search";
import AuthLinks from "@/components/AuthLinks";

const page = ({ params }: { params: any }) => {
  interface adTypes {
    url: string;
    type: "image" | "video";
  }
  const [ads, setAds] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [failedToFetch, setFailedToFetch] = useState<boolean>(false);
  const [noAdsFound, setNoAdsFound] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [platform, setPlatform] = useState<string>("google");
  const [isOpen, setIsOpen] = useState(false);
  const [usageCount, incrementUsage] = useServiceUsage();
  const [isAuth, setIsAuth]  = useState<any>()
  const router = useRouter();
  
  async function verifyAuth(){
    const isAuthResponse = await fetch("/api/is-auth");
    const isAuth = await isAuthResponse.json();
    setIsAuth(isAuth)
  }
  useEffect(()=>{
    verifyAuth()
  },[])


  async function goToSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search/${platform}/${input}`);
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData(e?: any) {
    e?.preventDefault();
    if (usageCount > 4) {
      setIsOpen(true);
    }else {
      setAds([]);
      setIsFetching(true);
      setFailedToFetch(false);
      try {
        const adResponse = await fetch(
          `https://pendora-org-production.up.railway.app/api/get-${params.platform[0]}-ads`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: params.platform[1],
              platform: params.platform[0],
            }),
          }
        );
        if (adResponse.status === 404) {
          setNoAdsFound(true);
          throw new Error("No Ads Found");
        }
        if (!adResponse.ok) {
          throw new Error("Failed to fetch");
        }
        const ads: { adImages: string[]; adVideos?: string[] } =
          await adResponse.json();
        if (params.platform[0] === "google") {
          const initData: adTypes[] = [];
          ads?.adImages.forEach((string) => {
            initData.push({
              url: string,
              type: "image",
            });
          });
          setAds(initData);
          incrementUsage();
        }
        if (params.platform[0] === "meta") {
          const initData: adTypes[] = [];
          ads?.adImages.forEach((string) => {
            initData.push({
              url: string,
              type: "image",
            });
          });
          ads.adVideos &&
            ads?.adVideos.forEach((string) => {
              initData.push({
                url: string,
                type: "video",
              });
            });
          setAds(initData);
          incrementUsage();
        }
      } catch (error: any) {
        setFailedToFetch(true);
        console.error(error.message);
      } finally {
        setIsFetching(false);
      }
    }
  }
  return (
    <>
      <nav className="w-full px-5 gap-4 bg-white flex items-center justify-between py-2 border-b border-[#F5F5F5] shadow-lg fixed top-0 right-0 z-50 overflow-x-auto">
        <Search
          platform={platform}
          setPlatform={setPlatform}
          setInput={setInput}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          usageCount={usageCount}
          goToSearch={goToSearch}
        />
        <div className="text-black text-sm min-w-max rounded-md p-2 bg-[#f5f5f5]">
          Trials Left: {4 - usageCount}
        </div>
        <div className="flex gap-2 items-center">
          <GetPro />
          <AuthLinks type={isAuth?.isAuth ? 'logout': 'login'}/>
        </div>
      </nav>
      <div className="w-full mt-16 h-full flex flex-col p-10 gap-[2rem] justify-start items-center overflow-auto bg-white">
        <div className="flex flex-col w-full h-full items-center justify-start gap-10">
          <div className="w-full px-1 flex items-center justify-start">
            <div className="text-xl font-semibold text-black tracking-tight flex items-center justify-between">
              <span>Results Found: {ads.length}</span>
            </div>
          </div>
          <div
            className={` ${
              ads?.length === 0 || failedToFetch || isFetching
                ? "flex items-center justify-center"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center items grid-flow-row"
            }  w-full h-full`}
          >
            {ads && ads.length > 0 ? (
              ads.map((data) => (
                <AdCard
                  key={data.url}
                  adImage={data.url}
                  type="search"
                  format={data.type}
                />
              ))
            ) : failedToFetch ? (
              <button
                onClick={fetchData}
                className="w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]"
              >
                Failed To Fetch. Try Again.
              </button>
            ) : isFetching ? (
              <div className="flex flex-col gap-2 items-center">
                <div className="size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]" />
                <div className="bg-[#f5f5f5] rounded-md p-2 text-sm">
                  Searching...
                </div>
              </div>
            ) : noAdsFound ? (
              <button
                onClick={fetchData}
                className="w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]"
              >
                No Ads Found. Try Again Later.
              </button>
            ) : null}
          </div>

          {ads && ads.length > 0 && <GetPro>Load More</GetPro>}
        </div>
      </div>
    </>
  );
};
export default page;
