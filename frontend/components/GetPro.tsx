import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const features = [
  "Save Ads for later",
  "Faster lookup speeds",
  "No daily limit",
];
function GetPro() {
  return (
    <Dialog>
      <DialogTrigger className="min-w-max p-2 bg-black text-white rounded-md font-semibold text-center flex items-center justify-center">
        <DialogTitle>Get Pro</DialogTitle>
      </DialogTrigger>
      <DialogContent className="flex w-[80vw] gap-2 flex-col items-center rounded-md">
        <div className="flex items-end">
          <div className="text-5xl font-extrabold tracking-tight ">$9.99</div>
          <div className="text-sm font-light">per/mo</div>
        </div>
        <div className="flex flex-col items-center w-full gap-2 mt-10">
          <input
            className="w-full h-12 p-2 px-[20px] bg-[#F5F5F5] placeholder:text-black/30 rounded-md"
            placeholder="Enter your email"
          />
          <button className="w-full font-bold bg-yellow-400 text-black rounded-md flex items-center justify-center p-2">
            Get on PRO waitlist
          </button>
        </div>
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
