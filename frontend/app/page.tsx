import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="fixed w-[30%] top-8 bg-[#f5f5f5] rounded-2xl p-4 py-2 left-1/2 -translate-x-1/2 flex gap-3 items-center justify-between shadow-sm border z-50">
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
      <div className="flex flex-col gap-5 items-center mt-12 ">
        <h1 className=" text-5xl w-[42rem] leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          Discover the entire digital advertising world of a website.
        </h1>
        <h3 className="w-[42rem] text-center ">
          Peel back the curtain and see the ad copy and the creatives your
          competitors are using to market their brands online.
        </h3>
        <div className="flex gap-4">
          <RegisterLink className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-black text-white flex items-center justify-center gap-2">
            Get Started
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
          <button className="bg-[#f5f5f5] rounded-md px-3 p-1 border">
            Features
          </button>
        </div>
        <img
          src="/hero-image-adsinspect.jpeg"
          className="border shadow-2xl mt-10 rounded-lg"
        />
      </div>
      <div id="features" className="flex flex-col items-center mt-20 gap-20">
        <h2 className=" text-5xl w-[42rem] leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-start  grid-flow-row">
          <FeatureCard
            src="/0K2B5RegrHS6bVAFjYpN98vmfvI.webp"
            title="Google and Meta Ads"
            description="Extract all google, facebook, instagram ads a business is running."
          />
          <FeatureCard
            src="/0K2B5RegrHS6bVAFjYpN98vmfvI.webp"
            title="Save and Download For Later"
            description="Save or download the ad creatives."
          />
          <FeatureCard
            src="/0K2B5RegrHS6bVAFjYpN98vmfvI.webp"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 place-items-start  grid-flow-row">
          <PricingCard
            planName="Starter Plan"
            price="20"
            features={[
              "20 Searches Per Day",
              "1 Month Ad History",
              "Google and Meta Ads",
              "Chat and Email Support",
            ]}
          />
          <PricingCard
            planName="Advanced Plan"
            price="50"
            features={[
              "Unlimited Searches",
              "1 Year Ad History",
              "Google and Meta Ads",
              "Download Ad Creatives",
              "Chat and Email Support",
              "Extract Ad Copy and Video Ad Script (coming soon)",
            ]}
          />
        </div>
      </div>
      <div className="mt-20 w-[50rem] h-[10rem] rounded-lg p-10 bg-gradient-to-r from-orange-400 to-blue-600 flex items-center justify-between gap-2">
        <p className="text-4xl font-extrabold tracking-tight text-white ">
          Try It For Free Today
        </p>
        <RegisterLink className="bg-white text-black rounded-md p-4 text-lg font-bold border tracking-tighter ">
          Get Started
        </RegisterLink>
      </div>
    </main>
  );
}
