"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Toast from "./Toast";

const MainSearch = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [platform, setPlatform] = useState<string>("google");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  function goToSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search/${platform}/${input}`);
    setIsSearching(true);
  }
  return (
    <>
      <div className="w-full max-w-[700px] flex md:flex-row flex-col gap-2 items-center justify-center justify-self-start">
        <form
          onSubmit={(e) => goToSearch(e)}
          className="relative w-[80%] min-w-[300px] max-w-[30rem] flex justify-center items-center self-center"
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
                : "Enter Facebook username"
            }
            type="search"
          />
          <svg
            className="absolute left-[5px] top-1/2 -translate-y-1/2"
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
            className="w-[5rem] h-[2.3rem] rounded-md bg-yellow-400 text-black absolute top-1/2 -translate-y-1/2 right-[6px]"
          >
            Search
          </button>
        </form>
        <Select value={platform} onValueChange={(value) => setPlatform(value)}>
          <SelectTrigger className=" w-[80%] md:w-max h-12 min-w-[300px] max-w-[30rem]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meta">
              <div className="flex gap-2 items-center justify-between ">
                <img className="size-5" src="/facebook-icon.svg" alt="Facebook logo" />
                <span className="text-base font-medium text-center">
                  Facebook Ads
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
                  Google Ads
                </span>
              </div>
            </SelectItem>
            <SelectItem disabled={true} value="tiktok">
              <div title="Please Upgrade to Pro" className="flex gap-2 items-center justify-between">
                <img
                  className="size-5"
                  src="/tiktok-logo2.svg"
                  alt="TikTok logo"
                />
                <span  className="text-base font-medium text-center">
                  TikTok
                </span>
              </div>
            </SelectItem>
            <SelectItem disabled={true} value="linkedin">
              <div title="Please Upgrade to Pro" className="flex gap-2 items-center justify-between">
                <img
                  className="size-5"
                  src="/linkedin-logo.svg"
                  alt="LinkedIn logo"
                />
                <span className="text-base font-medium text-center">
                  LinkedIn
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isSearching && <Toast message="Searching for ads..." error={false} />}
    </>
  );
};

export default MainSearch;
