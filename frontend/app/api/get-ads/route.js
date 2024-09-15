import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { MongoClient } from 'mongodb'

export async function GET() {
    try {
        try {
            const {isAuthenticated} = getKindeServerSession();
            const isUserAuthenticated = await isAuthenticated();
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
        const client = new MongoClient(process.env.MONGODB_URI)
        try {
            await client.connect();
            const database = client.db('adsInspectDatabase');
            const collection = database.collection('savedAds');
            const { getUser } = getKindeServerSession();
            const user = await getUser();
            const userSavedAds = await collection.findOne(
                { email: user.email },   
                { projection: { savedAds: 1, _id: 0 } } 
            )
            console.log(userSavedAds)
        }catch(error){
            return new Response(error.message, {
                status: 500
            })  
        }
        if (result.matchedCount > 0) {
            return new Response('Ads Retrieved', {
                status: 201
            })
        } else {
            return new Response('User Not Found', {
                status: 404
            })
        }
    } catch (error) {
        return new Response(null, {
            status:500
        })
    } finally {
        await client.close();
    }
}