import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient, ServerApiVersion } from 'mongodb'

export async function GET(url) {
    
    try {
        const {isAuthenticated} = getKindeServerSession();
        const isUserAuthenticated = await isAuthenticated();
        if(!isUserAuthenticated){
            return new Response(null, {
                status: 401
            })
        }
        const client = new MongoClient(process.env.MONGODB_URI, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
        });
        await client.connect();
        const database = client.db('myDatabase');  
        const collection = database.collection('userData');  
        const {getUser} = getKindeServerSession();
        const user = await getUser();
        const result = await collection.updateOne(
            { email: user.email },            
            { $push: { ads: url } }    
        )
        if (result.matchedCount > 0) {
            return new Response(null, {
                status: 201
            })
        } else {
            return new Response(null, {
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