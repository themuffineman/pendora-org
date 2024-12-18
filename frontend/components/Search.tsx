"use client";
import GetPro from "@/components/GetPro";
import React, {useState} from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface props {
  platform: string;
  setPlatform: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  usageCount: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goToSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Search = ({
  platform,
  setPlatform,
  setInput,
  usageCount,
  isOpen,
  setIsOpen,
  goToSearch,
}: props) => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  // const isUserSubscribed = false; //await isSubscribed();
  function openTooltip(){
    setTooltipOpen(true);
    setTimeout(()=>{
      setTooltipOpen(false);
    }, 3000)
  }
  return (
    <div className="w-max flex items-center justify-start gap-3 max-w-[700px] ">
      <TooltipProvider >
        <Tooltip open={tooltipOpen}  >
          <TooltipTrigger className="w-[80%] flex md:flex-row flex-col gap-2 items-center justify-center">
            <form
              onSubmit={(e) => goToSearch(e)}
              className="relative w-[70%] min-w-[500px]  max-w-[600px] flex justify-center items-center self-start"
            >
              <input
                required={true}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="w-[100%] outline-neutral-300 h-12 p-2 px-[40px] pr-[100px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md "
                placeholder={
                  platform === "google"
                    ? "Enter domain e.g. domain.com"
                    : "Enter Facebook username"
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
              {usageCount < 4 ? (
                <button
                  type="submit"
                  className="w-[5rem] h-[2.3rem] rounded-md bg-yellow-400 text-black absolute top-1/2 -translate-y-1/2 right-[1%]"
                >
                  Search
                </button>
              ) : (
                <GetPro dailyLimit={true} isOpen={isOpen} setIsOpen={setIsOpen}>
                  Search
                </GetPro>
              )}
            </form>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {platform === "google"
                ? "Enter domain e.g. domain.com"
                : "Enter Facebook username"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Select
        value={platform}
        onValueChange={(value) => {
          setPlatform(value);
          openTooltip();
        }}
      >
        <SelectTrigger className="min-w-max h-12 focus:outline-[#f5f5f5] focus:ring-[#f5f5f5]">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="meta">
            <div className="flex gap-2 items-center justify-between ">
              <img
                className="size-5"
                src="/facebook-icon.svg"
                alt="Facebook logo"
              />
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
            <div
              title="Please Upgrade to Pro"
              className="flex gap-2 items-center justify-between"
            >
              <img
                className="size-5"
                src="/tiktok-logo2.svg"
                alt="TikTok logo"
              />
              <span className="text-base font-medium gap-5 text-center flex items-center justify-between">
                TikTok
                <span className="text-xs text-black bg-yellow-400 rounded-md p-[1px]">
                    Coming Soon
                  </span>
              </span>
            </div>
          </SelectItem>
          <SelectItem disabled={true} value="linkedin">
            <div
              title="Please Upgrade to Pro"
              className="flex gap-2 items-center justify-between"
            >
              <img
                className="size-5"
                src="/linkedin-logo.svg"
                alt="LinkedIn logo"
              />
              <span className="text-base gap-5 font-medium text-center flex items-center justify-between">
                LinkedIn
                <span className="text-xs text-black bg-yellow-400 rounded-md p-[1px]">
                    Coming Soon
                  </span>
              </span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Search;
