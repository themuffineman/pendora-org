"use client";
import AdCard from "@/components/AdCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetPro from "@/components/GetPro";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const page = ({ params }: { params: any }) => {
  interface adTypes {
    url: string;
    type: "image" | "video";
  }
  console.log("URL backend is: ", process.env.BACKEND_URL);
  const [ads, setAds] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [failedToFetch, setFailedToFetch] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [platform, setPlatform] = useState<string>("google");

  const router = useRouter();
  async function goToSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search/${platform}/${input}`);
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData(e?: any) {
    e?.preventDefault();
    setAds([]);
    setIsFetching(true);
    setFailedToFetch(false);
    console.log(
      "Platform is: ",
      params.platform[0],
      " and url is: ",
      params.platform[1]
    );
    try {
      const adResponse = await fetch(
        `${process.env.BACKEND_URL}/api/get-${params.platform[0]}-ads`,
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
      }
      if (params.platform[0] === "meta") {
        const initData: adTypes[] = [];
        console.log("meta Ads: ", ads);
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
        console.log("Init Data:", initData);
        setAds(initData);
      }
    } catch (error) {
      setFailedToFetch(true);
    } finally {
      setIsFetching(false);
    }
  }
  return (
    <>
      <nav className="w-full px-5 gap-2 bg-white flex items-center justify-between py-2 border-b border-[#F5F5F5] shadow-lg fixed top-0 right-0 z-50 overflow-x-auto">
        <div className="w-max flex items-center justify-start gap-3 max-w-[700px] ">
          <form
            onSubmit={(e) => goToSearch(e)}
            className="relative w-[70%] min-w-[500px]  max-w-[600px] flex justify-center items-center self-start"
          >
            <input
              required={true}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="w-[100%] h-12 p-2 px-[40px] pr-[100px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md "
              placeholder={
                platform === "google"
                  ? "Enter domain e.g. domain.com"
                  : "Enter Username"
              }
              type="search"
            />
            <svg
              className="absolute left-[1%] max-left top-1/2 -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#d3d3d3"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
            <button
              type="submit"
              className="w-[5rem] h-[2.3rem] rounded-md bg-yellow-400 text-black absolute top-1/2 -translate-y-1/2 right-[1%]"
            >
              Search
            </button>
          </form>
          <Select
            value={platform}
            onValueChange={(value) => {
              setPlatform(value);
            }}
          >
            <SelectTrigger className="min-w-max h-12">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meta">
                <div className="flex gap-2 items-center justify-between ">
                  <img
                    className="size-5"
                    src="/metaverse.svg"
                    alt="Meta logo"
                  />
                  <span className="text-base font-medium text-center">
                    Meta
                  </span>
                </div>
              </SelectItem>
              <SelectItem value="google">
                <div className="flex gap-2 items-center justify-between">
                  <img
                    className="size-5"
                    src="/google-logo.svg"
                    alt="Google logo"
                  />
                  <span className="text-base font-medium text-center">
                    Google
                  </span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <GetPro />
      </nav>
      <div className="w-full mt-16 h-full flex flex-col p-10 gap-[2rem] justify-start items-center overflow-auto bg-white">
        <div className="flex flex-col w-full h-full items-center justify-start gap-10">
          <div className="w-full px-1 flex items-center justify-start">
            <div className="text-xl font-semibold text-black tracking-tight flex items-center justify-between">
              <span>Results Found: {ads.length}</span>
              {/* <Select
                value={timeframe}
                onValueChange={(value: string) => {
                  setTimeframe(value);
                }}
              >
                <SelectTrigger className="min-w-max h-12">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">
                    <div className="flex gap-2 items-center justify-between ">
                      <span className="text-base font-medium text-center">
                        Past 7 Days
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="30">
                    <div className="flex gap-2 items-center justify-between">
                      <span className="text-base font-medium text-center">
                        Past 30 Days
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select> */}
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
            ) : ads.length === 0 ? (
              <button
                onClick={fetchData}
                className="w-max p-4 bg-[#f5f5f5] transition flex items-center place-self-center justify-center rounded-md text-black text-base hover:bg-[#f0f0f0] shadow-2xl shadow-[#f2f2f2]"
              >
                No Ads Found. Try Again Later.
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default page;