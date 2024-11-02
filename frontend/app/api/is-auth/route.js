import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { MongoClient } from "mongodb";

export async function GET(){
  let client;
  let isAuth=false;
  let isSubscribed=false;
   try {
     const { isAuthenticated } = getKindeServerSession();
     const isUserAuthenticated = await isAuthenticated();
     client = new MongoClient(process.env.MONGODB_URI);
     await client.connect();
     const database = client.db("adsInspectDatabase");
     const collection = database.collection("subscriptionDetails");
     const { getUser } = getKindeServerSession();
     const user = await getUser();
     if(user){
       isAuth = true
       const subscriptionDetails = await collection.findOne({
         email: user.email,
       });
       if(subscriptionDetails){
         isSubscribed = true
       }
       console.log("Details: ", subscriptionDetails);
       return Response.json({
         isAuth,
         isSubscribed,
         email: user.email,
       })
     }else{
       throw new Error('User Undefined')
     }
   } catch (error) {
     console.log("Auth Error: ", error.message);
       return Response.json({
        isAuth,
        isSubscribed
      })
   } finally {
     await client?.close();
   }
}