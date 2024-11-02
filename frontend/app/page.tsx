"use client"
import Link from "next/link";
import {useEffect, useState} from 'react'
import MainSearch from "@/components/MainSearch";
import GetPro from "@/components/GetPro";
import AuthLinks from "@/components/AuthLinks";

export default function Home() {
  const [isAuth, setIsAuth]  = useState<any>()
  async function verifyAuth(){
    const isAuthResponse = await fetch("/api/is-auth");
    const isAuth = await isAuthResponse.json();
    setIsAuth(isAuth)
  }
  useEffect(()=>{
    verifyAuth()
  },[])

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
        <div className="flex gap-5 ">
          {isAuth?.isAuth ? (
            <>
              <div className="rounded-md w-max bg-white max-w-[100px] p-2 px-4 border truncate">
                <span className="font-bold">{isAuth?.email}</span>
              </div>
              <AuthLinks type="logout" />
            </>
          ) : (
            <>
              <AuthLinks type="login" />
              <GetPro />
            </>
          )}
        </div>
      </nav>
      <div className="flex flex-col gap-5 items-center w-full ">
        <h1 className=" text-4xl md:text-5xl w-full max-w-[42rem] md:leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
          See all the ads a business is running online.
        </h1>
        <h3 className="w-[80%] text-center text-sm md:text-base text-neutral-400">
          Peel back the curtain and see the ad copy and the creatives businesses
          are using.
        </h3>
        <MainSearch />
      </div>
    </main>
  );
}
