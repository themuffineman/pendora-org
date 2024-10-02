import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from 'mongodb'
import { redirect } from "next/navigation";
import AppContent from "@/components/AppContent";
import PricingCard from "@/components/PricingCard";
interface componentProps {
    children: React.ReactNode;
}
const layout: React.FC<componentProps> = async ({ children }) => {
    async function isSubscribed(){
        let client
        try {
            try {
                const {isAuthenticated} = getKindeServerSession();
                const isUserAuthenticated = await isAuthenticated();
                console.log('Is auth: ', isUserAuthenticated)
                if(!isUserAuthenticated){
                    return null
                }
            }catch(error){
                return null   
            }
            client = new MongoClient(process.env.MONGODB_URI!)
            await client.connect();
            const database = client.db('adsInspectDatabase');
            const collection = database.collection('subscriptionDetails');
            const { getUser } = getKindeServerSession();
            const user = await getUser();
            console.log(user.email)
            const subscriptionDetails = await collection.findOne(
                { email: user.email },   
            )
            console.log('Details: ', subscriptionDetails)
            if (subscriptionDetails) {
                return true
            } else {
                return false
            }
        } catch (error: any) {
            console.log('main error: ',error.message)
            return null
        } finally {
            await client?.close();
        }
    }
    const { isAuthenticated } = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const isUserSubscribed = await isSubscribed()

    if (!isUserAuthenticated) {
        redirect("/api/auth/login");
    }
    

    return (
        <main className="flex min-h-screen flex-col w-full items-center bg-white">
            {isUserSubscribed === false ? (
                <div
                    id="pricing"
                    className="flex flex-col items-center w-full mt-10 gap-10 p-10"
                >
                    <h2 className=" text-5xl w-full leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
                        Time to pick a plan
                    </h2>
                    <div className="grid grid-cols-1 gap-5 place-items-center w-full  grid-flow-row">
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
                </div>
            ) : isSubscribed === null ? (
                <div className=" p-4 bg-[#f5f5f5] text-black rounded-md font-bold w-max ">Sorry unable to verify subscription details</div>
            ) : (
                <AppContent user={user?.given_name?.charAt(0)}>
                    {children}
                </AppContent>
            )}
        </main>
    );
};

export default layout;
