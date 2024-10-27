"use client";
import AdCard from "@/components/AdCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetPro from "@/components/GetPro";
import { useServiceUsage } from "@/hooks/useStorage";
import Toast from "@/components/Toast";
import Search from "@/components/Search";
import { InitSocket } from "@/utils/utils.js";

const page = ({ params }: { params: any }) => {
  interface adTypes {
    url: string;
    type: "image" | "video";
  }
  const [ads, setAds] = useState<any[]>([]);
  const [socketId, setSocketId] = useState<string | null>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [failedToFetch, setFailedToFetch] = useState<boolean>(false);
  const [noAdsFound, setNoAdsFound] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [platform, setPlatform] = useState<string>("google");
  const [isOpen, setIsOpen] = useState(false);
  const [usageCount, incrementUsage] = useServiceUsage();
  const [timeNotifier, setTimeNotifier] = useState<boolean>(false);
  const [statusUpdate, setStatusUpdate] = useState<string>("Connecting...");
  const router = useRouter();
  async function handleMessage(message: any) {
    console.log("received message:", message);
    const messageBody = await message.json();
    if (messageBody.type === "id") {
      setSocketId(messageBody.message);
    } else {
      setAds((prevAds) => {
        prevAds.push(messageBody.message);
        return prevAds;
      });
    }
  }
  async function goToSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search/${platform}/${input}`);
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData(e?: any) {
    e?.preventDefault();
    let loadTime = 0;

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
    if (usageCount > 40) {
      setIsOpen(true);
    } else {
      const socket = new InitSocket({
        url: "wss://pendora-org-production.up.railway.app",
        onMessage: handleMessage,
        onOpen: () => {
          setStatusUpdate("Connection Established");
        },
        onClose: () => {
          setStatusUpdate("Connection Closed");
          console.log("Connection closed");
        },
        onError: () => {
          setStatusUpdate("Error Occured");
        },
      });
      const id = socket.connect();
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
              id: id,
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
        incrementUsage();
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
        <Search
          platform={platform}
          setPlatform={setPlatform}
          input={input}
          setInput={setInput}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          usageCount={usageCount}
          goToSearch={goToSearch}
        />
        <div className="text-black min-w-max rounded-md p-2 bg-[#f5f5f5]">
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
              <div className="flex flex-col gap-2 items-center">
                <div className="size-16 animate-spin rounded-full border-[5px] border-t-white border-[#d8d8d8]" />
                <div className="bg-[#f5f5f5] rounded-md p-2 text-sm">
                  {statusUpdate}
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
          {timeNotifier && (
            <Toast
              error={false}
              message="Access all ad platforms with PRO version"
              pro={true}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default page;
