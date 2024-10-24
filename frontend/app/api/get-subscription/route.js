import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { MongoClient } from 'mongodb'

export async function GET(){
    let client
    try {
        try {
            const {isAuthenticated} = getKindeServerSession();
            const isUserAuthenticated = await isAuthenticated();
            console.log('Is auth: ', isUserAuthenticated)
            if(!isUserAuthenticated){
                return Response.json({error: 'Failed to authenticate'}, {
                    status: 401
                })
            }
        }catch(error){
            return Response.json({error:'Failed to authenticate'},{
                status: 500
            })         
        }
        client = new MongoClient(process.env.MONGODB_URI)
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
            return new Response.json({
                isSubscribed: subscriptionDetails.isSubscribed,
            },{status:200})
        } else {
            return new Response.json({
                isSubscribed: false,
            }, {status: 200});
        }
    } catch (error) {
        console.log('main error: ',error.message)
        return Response.json({error: error.message}, {
            status:500
        })
    } finally {
        await client?.close();
    }
}