import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from "mongodb";
import "./page.css";
import MainSearch from "@/components/MainSearch";

export default async function Home() {
  async function isSubscribed() {
    let client;
    try {
      client = new MongoClient(process.env.MONGODB_URI!);
      await client.connect();
      const database = client.db("adsInspectDatabase");
      const collection = database.collection("subscriptionDetails");
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      console.log(user.email);
      const subscriptionDetails = await collection.findOne({
        email: user.email,
      });
      console.log("Details: ", subscriptionDetails);
      if (subscriptionDetails) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.log("main error: ", error.message);
      return null;
    } finally {
      await client?.close();
    }
  }
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isUserSubscribed = await isSubscribed();

  return (
    <main className="flex flex-col justify-between pt-10">
      <nav className="hidden w-full bg-[#f5f5f5] p-4 py-4 fixed top-0 z-10 md:flex gap-3 items-center justify-between shadow-sm border">
        <Link href={"/"}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8.5" cy="8.5" r="8.5" fill="black" />
            <circle cx="8.5" cy="8.5" r="3.5" fill="#FFFF00" />
          </svg>
        </Link>
        <div className="flex gap-2 ">
          {isUserAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <div className="p-2 font-bold size-8 rounded-full bg-black text-white flex items-center justify-center uppercase">
                  {user.email?.charAt(0)}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-max h-max flex flex-col gap-2 rounded-md bg-[#f5f5f5]">
                {isUserSubscribed ? (
                  <a
                    className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-black text-white flex items-center justify-center"
                    href={process.env.BILLING_PORTAL_URL}
                  >
                    Manage Billing
                  </a>
                ) : (
                  <div>Try Pro</div>
                )}
                <LogoutLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
                  Sign Out
                </LogoutLink>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <LoginLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
                Login
              </LoginLink>
              <RegisterLink className="p-2 font-bold px-4 rounded-md bg-black text-white flex items-center justify-center">
                Try Pro
              </RegisterLink>
            </>
          )}
        </div>
      </nav>
      {/* <nav className="flex w-full bg-[#f5f5f5] p-4 py-2 md:hidden gap-3 items-center justify-between shadow-sm border z-10">
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
          {isUserAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <div className="p-2 font-bold size-8 rounded-full bg-black text-white flex items-center justify-center uppercase">
                  {user.email?.charAt(0)}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-max h-max flex flex-col gap-2 rounded-md bg-[#f5f5f5]">
                {isUserSubscribed ? (
                  <a
                    className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-black text-white flex items-center justify-center"
                    href={process.env.BILLING_PORTAL_URL}
                  >
                    Manage Billing
                  </a>
                ) : (
                  <div>Try Pro</div>
                )}
                <LogoutLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
                  Sign Out
                </LogoutLink>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <LoginLink className="border p-1 px-3 hover:bg-[#f0f0f0] rounded-md bg-white flex items-center justify-center">
                Login
              </LoginLink>
              <RegisterLink className="border p-1 px-3 hover:bg-neutral-700 rounded-md bg-yellow-300 text-black flex items-center justify-center">
                Try Pro
              </RegisterLink>
            </>
          )}
          </PopoverContent>
        </Popover>
      </nav> */}
      <div className="flex flex-col gap-5 items-center w-full mt-12 ">
        <h1 className=" text-4xl md:text-5xl w-full max-w-[42rem] md:leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          See how your competitors are marketing online
        </h1>
        <h3 className="w-[80%] text-center text-sm md:text-base text-neutral-400">
          Peel back the curtain and see the ad copy and the creatives your
          competitors are using to market their brands online.
        </h3>
        <MainSearch />
        {/* <div className="flex flex-col gap-5 ">
          <div className="flex items-center justify-center">
            <h2 className=" text-4xl md:text-5xl w-max h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
              Live Ads
            </h2>
            <div className="size-3 rounded-full bg-red-400 animate-pulse" />
          </div>
          <div className="flex gap-10 items-center">
            <div className="relative w-[15rem] rounded-md -rotate-[10deg] ring-2 ring-yellow-400 hover:scale-[1.02] transition">
              <img
                className="object-cover w-full aspect-auto rounded-md"
                src="hero-img-1.jpg"
              />
              <div className="absolute bg-[#f5f5f5] p-2 flex items-center justify-center ring-2 ring-white bottom-4 left-[42%] -translate-x-1/2 rounded-full size-10">
                <svg
                  className="w-full aspect-auto"
                  // width="2192"
                  // height="2500"
                  viewBox="0 0 256 292"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z"
                    fill="#95BF46"
                  />
                  <path
                    d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
                    fill="#5E8E3E"
                  />
                  <path
                    d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338"
                    fill="#FFF"
                  />
                </svg>
              </div>
              <div className="absolute bg-[#f5f5f5] p-2 flex items-center justify-center ring-2 ring-white bottom-4 left-[57%] -translate-x-1/2 rounded-full size-10">
                <img
                  src="meta-icon.png"
                  alt="Meta Logo"
                  className="w-full aspect-auto"
                />
              </div>
            </div>
            <div className="w-[15rem] relative rounded-md ring-2 ring-yellow-400 hover:scale-[1.02] transition">
              <img
                className="object-cover w-full aspect-auto rounded-md"
                src="hero-img-1.jpg"
              />
              <div className="absolute bg-[#f5f5f5] p-2 flex items-center justify-center ring-2 ring-white bottom-4 left-[42%] -translate-x-1/2 rounded-full size-10">
                <svg
                  className="w-full aspect-auto"
                  // width="2192"
                  // height="2500"
                  viewBox="0 0 256 292"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z"
                    fill="#95BF46"
                  />
                  <path
                    d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
                    fill="#5E8E3E"
                  />
                  <path
                    d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338"
                    fill="#FFF"
                  />
                </svg>
              </div>
              <div className="absolute bg-[#f5f5f5] p-2 flex items-center justify-center ring-2 ring-white bottom-4 left-[57%] -translate-x-1/2 rounded-full size-10">
                <img
                  src="meta-icon.png"
                  alt="Meta Logo"
                  className="w-full aspect-auto"
                />
              </div>
            </div>
            <div className="w-[15rem] relative rounded-md rotate-[10deg] ring-2 ring-yellow-400 hover:scale-[1.02] transition">
              <img
                className="object-cover w-full aspect-auto rounded-md"
                src="hero-img-1.jpg"
              />
              <div className="absolute bg-[#f5f5f5] p-2 flex items-center justify-center ring-2 ring-white bottom-4 left-[42%] -translate-x-1/2 rounded-full size-10">
                <svg
                  className="w-full aspect-auto"
                  // width="2192"
                  // height="2500"
                  viewBox="0 0 256 292"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z"
                    fill="#95BF46"
                  />
                  <path
                    d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
                    fill="#5E8E3E"
                  />
                  <path
                    d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338"
                    fill="#FFF"
                  />
                </svg>
              </div>
              <div className="absolute bg-[#f5f5f5] p-2 flex items-center justify-center ring-2 ring-white bottom-4 left-[57%] -translate-x-1/2 rounded-full size-10">
                <img
                  src="meta-icon.png"
                  alt="Meta Logo"
                  className="w-full aspect-auto"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div id="features" className="flex flex-col items-center mt-20 gap-20">
        <h2 className=" text-4xl md:text-5xl w-full max-w-[42rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
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
        <h2 className="text-4xl md:text-5xl w-full max-w-[42rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          Pricing
        </h2>
        <div className="grid grid-cols-1 items-center  grid-flow-row">
          <PricingCard
            planName="Starter Plan"
            price="38"
            features={[
              "Unlimited Searches",
              "Google and Meta Ads",
              "Download Ad Creatives",
              "Extract Ad Copy and Video Ad Script (coming soon)",
            ]}
          />
        </div>
      </div> */}
      {/* <div className=" self-center mt-20 w-[80%] min-w-[340px] h-[10rem] rounded-lg p-2 sm:p-10 bg-gradient-to-r from-orange-400 to-blue-600 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
        <p className="sm:text-4xl text-2xl text-center font-extrabold tracking-tight text-white ">
          Try It For Free Today
        </p>
        <RegisterLink className="bg-white text-black rounded-md p-4 text-lg font-bold border tracking-tighter ">
          Get Started
        </RegisterLink>
      </div> */}
    </main>
  );
}
