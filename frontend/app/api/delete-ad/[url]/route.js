import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from 'mongodb'

export async function POST(_, { params }){
    const url = params.url
    console.log('Url is: ', url)
    let client;
    try {
        try {
            const {isAuthenticated} = getKindeServerSession();
            const isUserAuthenticated = await isAuthenticated();
            if(!isUserAuthenticated){
                return new Response('Failed to authenticate', {
                    status: 401
                })
            }
            console.log('Is auth is: ', isUserAuthenticated)
        }catch(error){
            console.log('failed to auth')
            return new Response('Failed to authenticate', {
                status: 500
            })         
        }

        client = new MongoClient(process.env.MONGODB_URI)
        await client.connect()
        const database = client.db('adsInspectDatabase')
        const collection = database.collection('savedAds')
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        console.log('User email is: ', user.email)
        const result = await collection.updateOne(
            { email: email.email },         
            { $pull: { ads: url } }
        );
        if(result.modifiedCount === 1) {
            return new Response('Ad Deleted', {
                status: 201
            })
        } else {
            return new Response('User Not Found', {
                status: 404
            })
        }
    }catch (error) {
        console.log("main error: ", error.message)
        return new Response(null, {
            status: 500
        })
    }finally {
        await client?.close()
    }
}