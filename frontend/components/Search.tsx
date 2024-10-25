import GetPro from "@/components/GetPro"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from "mongodb";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
interface props{
    platform: any;
    setPlatform: any;
    setInput:any;
    input:any;
    usageCount: number;
    IsOpen: any;
    setIsOpen: any;
    gotToSearch:any;
}
const Search:props = async ({platform, setPlatform, input,setInput, usageCount, IsOpen, setIsOpen, goToSearch}) => {
    async function isSubscribed() {
        const { isAuthenticated } = getKindeServerSession();
        const isUserAuthenticated = await isAuthenticated();
        if(!isUserAuthenticated){
          return
        }
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


      const isUserSubscribed = await isSubscribed();
  return (
    <div className="w-max flex items-center justify-start gap-3 max-w-[700px] ">
    <form
      onSubmit={(e) => goToSearch(e)}
      className="relative w-[70%] min-w-[500px]  max-w-[600px] flex justify-center items-center self-start"
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
       <GetPro dailyLimit={true} isOpen={isOpen} setIsOpen={setIsOpen}>Search</GetPro>
      )}
    </form>
    <Select
      value={platform}
      onValueChange={(value) => {
        setPlatform(value);
      }}
    >
      <SelectTrigger className="min-w-max h-12">
        <SelectValue placeholder="Platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="meta">
          <div className="flex gap-2 items-center justify-between ">
            <img
              className="size-5"
              src="/metaverse.svg"
              alt="Meta logo"
            />
            <span className="text-base font-medium text-center">
              Meta
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
              Google
            </span>
          </div>
        </SelectItem>
        <SelectItem disabled={isSubscribed} value="tiktok">
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
            <SelectItem disabled={isSubscribed} value="linkedin">
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
  )
  
}

export default Search