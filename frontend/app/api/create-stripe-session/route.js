import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Stripe from 'stripe';

export async function POST(req) {
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    try{
        try {
            const {isAuthenticated} = getKindeServerSession();
            const isUserAuthenticated = await isAuthenticated();
            console.log('Is auth: ', isUserAuthenticated)
            if(!isUserAuthenticated){
                return new Response('Failed to authenticate', {
                    status: 401
                })
            }
            const { getUser } = getKindeServerSession();
            const user = await getUser();
        }catch(error){
            return new Response('Failed to authenticate',{
                status: 500
            })         
        }
        const { priceId } = await req.json();
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
              {
                price: priceId, // Use the retrieved price ID
                quantity: 1,
              },
            ],
            metadata: {
              userId,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });
        return new Response.json({ sessionId: checkoutSession.id }, { status: 200 })
    }catch(err){
        console.error(err)
        return new Response.json({ error: 'Unable to create checkout session' }, { status: 500 });
    }
}