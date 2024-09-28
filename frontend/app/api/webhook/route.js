import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export async function POST(req, res){
    const payload = await req.text()
    const response = JSON.parse(payload)
    const sig = req.header.get('Stripe-Signature')
    const datetime = new Date(response.created * 1000).toLocaleDateString()
    const timestring = new Date(response.created * 1000).toLocaleDateString()

    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        console.log("event type: ", event.type)
        console.log("response is : ", response)
        return new Response.json({event: event.type}, {status: 200})
    } catch (error) {
        return new Response.json({error},{status:500})
    }
}
async function registerPayment(){

}