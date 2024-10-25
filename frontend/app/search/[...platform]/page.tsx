"use client";
import AdCard from "@/components/AdCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetPro from "@/components/GetPro";
import { useServiceUsage } from "@/hooks/useStorage";
import Toast from "@/components/Toast";
import Search from "@/components/Search";
import {InitSocket} from "@/utils/utils.js"

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
  const [timeNotifier, setTimeNotifier] = useState<boolean>(false);
  const router = useRouter();
  async function goToSearch(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      router.push(`/search/${platform}/${input}`);
  }

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData(e?: any) {
    e?.preventDefault();
    let loadTime = 0;
    const socket = new InitSocket({
      url: 'wss://pendora-org-production.up.railway.app',

    })
    await socket.connect()
    const intervalId = setInterval(() => {
      loadTime += 1;
      if (loadTime === 15) {
        setTimeNotifier(true);
        setTimeout(() => {
          setTimeNotifier(false);
          clearInterval(intervalId);
        }, 10000);
      }
    }, 1000);
    if (usageCount > 4) {
      setIsOpen(true);
    } else {
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
      <nav className="w-full px-5 gap-2 bg-white flex items-center justify-between py-2 border-b border-[#F5F5F5] shadow-lg fixed top-0 right-0 z-50 overflow-x-auto">
        <Search platform={platform} setPlatform={setPlatform} input={input} setInput={setInput} isOpen={isOpen} setIsOpen={setIsOpen} usageCount={usageCount} />
        <div className="text-black rounded-md p-2 bg-[#f5f5f5]">
          Trials Left: {4 - usageCount}
        </div>
        <GetPro />
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
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center  grid-flow-row"
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
              <div className="size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]" />
            ) : noAdsFound ? (
              <button
                onClick={fetchData}
                className="w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]"
              >
                No Ads Found. Try Again Later.
              </button>
            ) : null}
          </div>

          {ads && ads.length > 0 && (
            <Dialog>
              <DialogTrigger className="w-max p-3 rounded-md bg-black text-white font-medium">
                <DialogTitle className="font-medium">Load More</DialogTitle>
              </DialogTrigger>
              <DialogContent className="flex w-[80vw] gap-2 flex-col items-center rounded-md">
                <div className="flex items-end">
                  <div className="text-5xl font-extrabold tracking-tight ">
                    $14.99
                  </div>
                  <div className="text-sm font-light">per/mo</div>
                </div>
                <form
                  action="https://submit-form.com/4mFTvZQSv"
                  className="flex flex-col items-center w-full gap-2 mt-10"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-12 p-2 px-[20px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="w-full font-bold bg-yellow-400 text-black rounded-md flex items-center justify-center p-2"
                  >
                    Get on PRO waitlist
                  </button>
                </form>
                <div className="w-full flex flex-col items-start gap-4 ">
                  <div className="text-base font-medium ">Pro Features:</div>
                  <ul className="flex flex-col gap-2 items-start">
                    {features.map((string) => (
                      <li className="flex gap-2 items-center text-sm font-light ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                        {string}
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {timeNotifier && (
            <Toast error={false} message="Too Slow ? " pro={true} />
          )}
        </div>
      </div>
    </>
  );
};
export default page;
