import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient, ServerApiVersion } from 'mongodb'
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req) {
    const body = await req.json()
    const url = body.url
    let client;
    let uploadedResult;
    function generateUniqueId() {
        const randomId = crypto.randomUUID();  
        const timestamp = Date.now();          
        return `${randomId}_${timestamp}`;   
    }
    console.log('Url is: ', url)
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
            return new Response('Failed to authenticate',{
                status: 500
            })         
        }
        try{
            
            const uniqueId = generateUniqueId()
            cloudinary.config({ 
                cloud_name: process.env.CLOUDINARY_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY, 
                api_secret: process.env.CLOUDINARY_API_SECRET
            })
            uploadedResult = await cloudinary.uploader.upload(url, {public_id: uniqueId})
            console.log("Uploaded url: ", uploadedResult.url)
        }catch(error){
            console.log('Error with cloudinary: ', error.message)
            return new Response('Failed to upload image',{
                status: 500
            })
        }

        client = new MongoClient(process.env.MONGODB_URI)
        await client.connect()
        const database = client.db('adsInspectDatabase')
        const collection = database.collection('savedAds')
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        console.log('User email is:', user.email)
        const result = await collection.updateOne(
            { email: user.email },            
            { $push: { ads: uploadedResult.url} },
            { upsert: true } // If no document is found, insert a new one 
        )
        if (result.acknowledged) {
            return new Response('Ad Saved', {
                status: 201
            })
        } else {
            return new Response('User Not Found', {
                status: 404
            })
        }
    }catch(error){
        console.log("error: ", error.message)
        return new Response(null, {
            status:500
        })
    }finally {
        await client?.close()
    }
}