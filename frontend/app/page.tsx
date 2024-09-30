import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <main className="flex flex-col justify-between pt-20 lg:p-24">
      <nav className="fixed hidden w-max top-8 bg-[#f5f5f5] rounded-2xl p-4 py-2 left-1/2 -translate-x-1/2 md:flex gap-3 items-center justify-between shadow-sm border z-50">
        <Link href={"/"}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.5" cy="8.5" r="8.5" fill="black" />
            <circle cx="8.5" cy="8.5" r="3.5" fill="#FFFF00" />
          </svg>
        </Link>

        <ul className="flex gap-4 items-center">
          <Link
            href={"#features"}
            className="cursor-pointer tracking-tight text-base p-1 px-2 rounded-md hover:bg-white transition text-black "
          >
            Features
          </Link>
          <Link
            href={"#pricing"}
            className="cursor-pointer tracking-tight text-base p-1 px-2 rounded-md hover:bg-white transition text-black "
          >
            Pricing
          </Link>
        </ul>
        <div className="flex gap-2 ">
          <LoginLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
            Login
          </LoginLink>
          <RegisterLink className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-black text-white flex items-center justify-center">
            Get Started
          </RegisterLink>
        </div>
      </nav>
      <nav className="fixed flex w-[300px] top-8 bg-[#f5f5f5] rounded-2xl p-4 py-2 left-1/2 -translate-x-1/2 md:hidden gap-3 items-center justify-between shadow-sm border z-50">
        <Link href={"/"}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.5" cy="8.5" r="8.5" fill="black" />
            <circle cx="8.5" cy="8.5" r="3.5" fill="#FFFF00" />
          </svg>
        </Link>
        <Popover>
          <PopoverTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            </svg>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 w-max px-2">
            <LoginLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
              Login
            </LoginLink>
            <Link
              href={"#pricing"}
              className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-black text-white flex items-center justify-center"
            >
              Get Started
            </Link>
          </PopoverContent>
        </Popover>
      </nav>
      <div className="flex flex-col gap-5 items-center w-full mt-12 ">
        <h1 className=" text-4xl md:text-5xl w-full max-w-[42rem] md:leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          See how your competitors are marketing online
        </h1>
        <h3 className="w-[80%] text-center text-sm md:text-base text-neutral-400">
          Peel back the curtain and see the ad copy and the creatives your
          competitors are using to market their brands online.
        </h3>
        <div className="flex flex-col md:flex-row gap-4 w-full items-center md:justify-center ">
          <RegisterLink className=" shadow-md font-medium w-[60%] md:w-[15rem] min-w-max p-4 px-3 hover:bg-neutral-700 rounded-md text-sm bg-black text-white flex items-center justify-center gap-2">
            Try it out for 30 days
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#ffffff"
              className="-rotate-90"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </RegisterLink>
          <button className="bg-white shadow-md font-medium md:w-[15rem]  w-[60%] min-w-max rounded-md px-3 p-4 text-sm p-1 border">
            Features
          </button>
        </div>
        <img
          src="/hero-image-adsinspect.jpeg"
          className="border aspect-auto w-[90vw] min-w-[300px] shadow-2xl mt-10 rounded-lg"
        />
      </div>
      <div id="features" className="flex flex-col items-center mt-20 gap-20">
        <h2 className=" text-5xl w-[42rem] leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-start  grid-flow-row">
          <FeatureCard
            src="/1.png"
            title="Google and Meta Ads"
            description="Extract all google, facebook, instagram ads a business is running."
          />
          <FeatureCard
            src="/2.png"
            title="Save and Download For Later"
            description="Save or download the ad creatives."
          />
          <FeatureCard
            src="/3.png"
            title="Extract the ad copy"
            description="Extract the ad copy and video ad script used in an ad."
            comingSoon={true}
          />
        </div>
      </div>
      <div id="pricing" className="flex flex-col items-center mt-20 gap-20">
        <h2 className=" text-5xl w-[42rem] leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          Pricing
        </h2>
        <div className="grid grid-cols-1 items-center  grid-flow-row">
          <PricingCard
            planName="Starter Plan"
            price="35"
            features={[
              "Unlimited Searches",
              "1 Year Ad History",
              "Google and Meta Ads",
              "Download Ad Creatives",
              "Chat and Email Support",
              "Extract Ad Copy and Video Ad Script (coming soon)",
            ]}
            priceId={process.env.ADVANCED_PRICE!}
            landing={true}
          />
        </div>
      </div>
      <div className=" mx-auto mt-20 w-[80%] min-w-[340px] h-[10rem] rounded-lg p-2 sm:p-10 bg-gradient-to-r from-orange-400 to-blue-600 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
        <p className="sm:text-4xl text-2xl text-center font-extrabold tracking-tight text-white ">
          Try It For Free Today
        </p>
        <RegisterLink className="bg-white text-black rounded-md p-4 text-lg font-bold border tracking-tighter ">
          Get Started
        </RegisterLink>
      </div>
    </main>
  );
}
