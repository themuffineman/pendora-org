import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import AppContent from "@/components/AppContent";
import PricingCard from "@/components/PricingCard";
interface componentProps {
    children: React.ReactNode;
}
const layout: React.FC<componentProps> = async ({ children }) => {
    async function isSubscribed() {
        try {
            const isSubscribedRes = await fetch("/api/get-subscription");
            if(!isSubscribedRes.ok){
                throw new Error('Failed to fetch subscrption details')
            }
            const { isSubscribed } = await isSubscribedRes.json();
            return isSubscribed;
        } catch (error: any) {
            console.log(error.message);
            alert(error.message)
            return null;
        }
    }
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isUserSubscribed = await isSubscribed();

    if (!isUserAuthenticated) {
        redirect("/api/auth/login");
    }

    return (
        <main className="flex min-h-screen flex-col w-full items-center bg-white">
            {!isUserSubscribed ? (
                <div
                    id="pricing"
                    className="flex flex-col items-center w-full mt-10 gap-10 p-10"
                >
                    <h2 className=" text-5xl w-full leading-[3rem] h-max p-2 text-center tracking-tight font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-900">
                        Time to pick a plan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 place-items-start  grid-flow-row">
                        <PricingCard
                            planName="Starter Plan"
                            price="38"
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
            ) : (
                <AppContent user={user?.given_name?.charAt(0)}>
                    {children}
                </AppContent>
            )}
        </main>
    );
};

export default layout;
