import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { MongoClient } from 'mongodb'

export async function GET() {
    let client
    try {
        try {
            const {isAuthenticated} = getKindeServerSession();
            const isUserAuthenticated = await isAuthenticated();
            console.log('Is auth: ', isUserAuthenticated)
            if(!isUserAuthenticated){
                return new Response('Failed to authenticate', {
                    status: 401
                })
            }
        }catch(error){
            return new Response('Failed to authenticate',{
                status: 500
            })         
        }
        client = new MongoClient(process.env.MONGODB_URI)
        await client.connect();
        const database = client.db('adsInspectDatabase');
        const collection = database.collection('savedAds');
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        console.log(user.email)
        const userSavedAds = await collection.findOne(
            { email: user.email },   
            { projection: { ads: 1, _id: 0 } } 
        )
        console.log('Saved ads: ', userSavedAds)
        if (userSavedAds) {
            return new Response.json({
                ads: userSavedAds.ads
            })
        } else {
            return new Response('User Not Found', {
                status: 404
            })
        }
    } catch (error) {
        console.log('main error: ',error.message)
        return new Response(null, {
            status:500
        })
    } finally {
        await client?.close();
    }
}