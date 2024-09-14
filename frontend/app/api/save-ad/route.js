import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient, ServerApiVersion } from 'mongodb'
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req) {
    const url = req.body
    console.log('Url is: ', url)
    try {
        let uploadedResult;
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
        try{
            cloudinary.config({ 
                cloud_name: process.env.CLOUDINARY_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY, 
                api_secret: CLOUDINARY_AP_SECRET
            })
            uploadedResult = await cloudinary.uploader.upload(url, {public_id: 'adImages',})
            console.log("Uploaded url: ", uploadedResult.url);
        }catch(error){
            return new Response('Failed to upload image',{
                status: 500
            })
        }

        const client = new MongoClient(process.env.MONGODB_URI, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
        });
        await client.connect()
        const database = client.db('adsInspectDatabase')
        const collection = database.collection('savedAds')
        const { getUser } = getKindeServerSession()
        const user = await getUser()
        console.log('User email is:', user.email)
        const result = await collection.updateOne(
            { email: user.email },            
            { $push: { ads: uploadedResult.url } }    
        )
        if (result.matchedCount > 0) {
            console.log('Image Saved')
            return new Response('Ad Saved', {
                status: 201
            })
        } else {
            return new Response('User Not Found', {
                status: 404
            })
        }
    }catch(error){
        return new Response(null, {
            status:500
        })
    } finally {
        await client.close()
    }
}