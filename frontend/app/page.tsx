import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="fixed w-[30%] top-8 bg-[#f5f5f5] rounded-2xl p-4 py-2 left-1/2 -translate-x-1/2 flex gap-3 items-center justify-between shadow-sm border">
        <ul className="flex gap-4 items-center">
          <li className="cursor-pointer tracking-tight text-base p-1 px-2 rounded-md hover:bg-white transition text-black ">
            Features
          </li>
          <li className="cursor-pointer tracking-tight text-base p-1 px-2 rounded-md hover:bg-white transition text-black ">
            Pricing
          </li>
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
        <h2 className="w-[42rem] text-center ">
          Introduce a modern abstraction to any Kubernetes cluster, enabling
          engineers to efficiently manage microservices with advanced tooling.
        </h2>
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
      </div>
    </main>
  );
}
