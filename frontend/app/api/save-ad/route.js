import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(url) {
    const supaBaseUrl = process.env.SUPABASE_URL
    const supaBaseAnon = process.env.SUPABASE_ANON
    const {getUser} = getKindeServerSession();
    const user = await getUser()
    const { error } = await supabase.from('user-data').insert({ id: user.email , ad: url})
    if(error){
        return Response.error()
    }
    return Response.json({ error })
}