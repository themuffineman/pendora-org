import Stripe from 'stripe'
import { MongoClient } from 'mongodb'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


const stripe = new Stripe(process.env.STRIPE_SECRET)

export async function POST(req, res){
    const payload = await req.text()
    const sig = req.headers['stripe-signature']
    let client
    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        client = new MongoClient(process.env.MONGODB_URI)
        await client.connect();
        const database = client.db('adsInspectDatabase');
        const collection = database.collection('subscriptionDetails');
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        if(event.type === "charge.succeeded"){
            const charge = event.data.object; // This is the charge object
            const invoiceId = charge.invoice;

            // If the charge is related to an invoice, fetch the invoice details
            const invoice = await stripe.invoices.retrieve(invoiceId);
            const subscriptionId = invoice.subscription;
            // Fetch the subscription to get the plan/product details
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const productName = subscription.items.data[0].plan.nickname; // Plan's nickname or product name
            await collection.updateOne(
                { email: user.email }, 
                {
                    $set: {
                      isSubscribed: true, // Update the subscription status
                      planName: productName           // Update the plan name
                    }
                },
                { upsert: true } // If the document does not exist, insert a new one
            )
            console.log("Charge success for:", user.email);
        }if (event.type === 'customer.subscription.deleted') {
            await collection.updateOne(
              { email: user.email },
              {
                $set: {
                  isSubscribed: false, // Mark the user as unsubscribed
                  planName: null       // Remove the plan name (set to null)
                }
              }
            );
            console.log("Subscription deleted for:", user.email)
        }if (event.type === 'charge.refunded') {
            const charge = event.data.object;
            const invoiceId = charge.invoice;
      
            // Update subscription details in your database
            await collection.updateOne(
              { email: user.email },
              {
                $set: {
                  isSubscribed: false, // Mark as unsubscribed or refunded
                  planName: null       // Remove the plan name
                }
              }
            );
            console.log("Charge refunded for:", user.email);
        }
       
        return new Response.json({event: event.type}, {status: 200})
    } catch (error) {
        return new Response.json({error: error.message},{status:500})
    }finally{
        client?.close()
    }
}