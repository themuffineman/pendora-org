import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Stripe from "stripe";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  let user;
  try {
    try {
      const { isAuthenticated } = getKindeServerSession();
      const isUserAuthenticated = await isAuthenticated();
      console.log("Is auth: ", isUserAuthenticated);
      if (!isUserAuthenticated) {
        return new Response("Failed to authenticate", {
          status: 401,
        });
      }
      const { getUser } = getKindeServerSession();
      user = await getUser();
    } catch (error) {
      return new Response("Failed to authenticate", {
        status: 500,
      });
    }
    const { priceId } = await req.json();
    console.log(priceId, ": priceId")
    const subscription = await stripe.subscriptions.create({
      customer: customerId, // The Stripe customer ID of the user
      items: [{ price: priceId }], // The price ID for the subscription product
      trial_period_days: 30, // Set the 30-day trial
      metadata: {
        userId: user.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?subscription_id={SUBSCRIPTION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return Response.json(
      { sessionId: subscription.id },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
