import Stripe from "stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Webhook Error", { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId; // Get the user ID you passed during checkout creation

    // Update the user's plan in your database
    // Assume you have a function updateUserSubscriptionPlan to update the user's plan
    await updateUserSubscriptionPlan(userId, session.subscription);

    return new Response("Success", { status: 200 });
  }

  return new Response("Unhandled event", { status: 400 });
}

async function updateUserSubscriptionPlan(userId, subscriptionId) {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const database = client.db("adsInspectDatabase");
    const collection = database.collection("subscriptionDetails");
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (user.id === userId) {
      const subscriptionDetails = await collection.findOne({
        email: user.email,
      });

      if (subscriptionDetails) {
        // Update the subscription status
        await collection.updateOne(
          { email: user.email },
          { $set: { isSubscribed: true, subscriptionId } }
        );
      }
    }
  } catch (error) {
    console.error(error.message);
    return new Error(error.message);
  }finally{
    await client.close()
  }
}
