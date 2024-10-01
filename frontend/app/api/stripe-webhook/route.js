import Stripe from "stripe";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  let event;
  //verify is signature is legit
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new Response("Webhook Error", { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items']
      }
    )
    const customerId = session?.id
    const customer = await stripe.customers.retrieve(customerId)
    console.log("Stripe Session captured");
    await updateUserSubscriptionPlan(customer.email, customerId, event.type );
    return new Response("Success", { status: 200 });
  }
  return new Response("Unhandled event", { status: 400 });
}

async function updateUserSubscriptionPlan(userEmail, customerId, eventType) {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const database = client.db("adsInspectDatabase");
    const collection = database.collection("subscriptionDetails");
    const user = await collection.findOne({ email: userEmail });
    if (user) {
      const subscriptionDetails = await collection.findOne({
        email: user.email,
      });

      if (subscriptionDetails && eventType === 'checkout.session.completed') {
        // Update the subscription status
        await collection.updateOne(
          { email: user.email },
          { $set: { 
            isSubscribed: true, 
            customerId,
            planName: "Starter Plan"
          } }
        );
      }
      if(subscriptionDetails && eventType === 'customer.subscription.deleted'){
        // Update the subscription status
        await collection.updateOne(
          { email: user.email },
          { $set: { 
            isSubscribed: false, 
            customerId: null,
            planName: null
          } }
        );
      }
    } else {
      // No user found, create a new one
      await collection.insertOne({
        email: userEmail,
        isSubscribed: true,
        customerId: customerId,
        planName: "Starter Plan"
      });
    }
    await client.close();
  } catch (error) {
    console.error(error.message);
    await client.close();
    return new Error(error.message);
  }
}
