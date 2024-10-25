import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const features = [
  "TikTok Ads",
  "LinkedIn Ads",
  "Save Ads for later",
  "Faster lookup speeds",
  "No daily limit",
  "Extract all ad history",
];

function GetPro({ children, dailyLimit, isOpen, setIsOpen }: { children?: any, dailyLimit?:boolean, isOpen: any, setIsOpen?:any }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="min-w-max hover:translate-y-[2px] transition p-2 bg-black text-white rounded-md font-semibold text-center flex items-center justify-center">
        <DialogTitle>{children ? children : "Get Pro"}</DialogTitle>
      </DialogTrigger>
      <DialogContent className="flex w-[80vw] gap-2 flex-col items-center rounded-md">
        {dailyLimit && (
          <div className="text-lg font-bold tracking-tight ">
          Max Usage Reached. Resets Tommorrow
        </div>
        )}
        <div className="flex items-end">
          <div className="text-5xl font-extrabold tracking-tight ">$14.99</div>
          <div className="text-sm font-light">per/mo</div>
        </div>
        <form
          action="https://submit-form.com/4mFTvZQSv"
          className="flex flex-col items-center w-full gap-2 mt-10"
        >
          <input
            type="email"
            id="email"
            name="email"
            className="w-full h-12 p-2 px-[20px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="w-full font-bold bg-yellow-400 text-black rounded-md flex items-center justify-center p-2"
          >
            Get on PRO waitlist
          </button>
        </form>
        <div className="w-full flex flex-col items-start gap-4 ">
          <div className="text-base font-medium ">Pro Features:</div>
          <ul className="flex flex-col gap-2 items-start">
            {features.map((string) => (
              <li className="flex gap-2 items-center text-sm font-light ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
                {string}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GetPro;
