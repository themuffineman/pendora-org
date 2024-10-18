import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from "mongodb";
import "./page.css";
import MainSearch from "@/components/MainSearch";
import GetPro from "@/components/GetPro";

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
    <main className="flex flex-col w-full h-screen justify-center ">
      <nav className=" w-full bg-[#f5f5f5] p-4 py-4 fixed top-0 z-10 flex gap-3 items-center justify-between shadow-sm border">
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
          <GetPro />
        </div>
      </nav>
      <div className="flex flex-col gap-5 items-center w-full ">
        <h1 className=" text-4xl md:text-5xl w-full max-w-[42rem] md:leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          See all the ads a business is running online.
        </h1>
        <h3 className="w-[80%] text-center text-sm md:text-base text-neutral-400">
          Peel back the curtain and see the ad copy and the creatives businesses are using.
        </h3>
        <MainSearch />
      </div>
    </main>
  );
}
