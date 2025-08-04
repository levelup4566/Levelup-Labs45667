import supabase from "../SupabaseSetup"
 
async function LoginCheck(clerkUserId:string){
    console.log("the clerk user id that will check in the db is ",clerkUserId)
    const {data , error} = await supabase.from("user_login_credentials").select("*").eq("clerk_user_id" , clerkUserId)
    if (error){
        console.error("error checking user")
        return false
    }
    console.log("data that is checked" , data)
    return data.length>0

}

export default LoginCheck