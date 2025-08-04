import supabase from "../SupabaseSetup";



async function LoginInsert(clerkUserId , emailAddress , fullName , userName){
    const {data , error} = await supabase.from("user_login_credentials").insert([
        {
            clerk_user_id : clerkUserId,
            email_address : emailAddress,
            fullname : fullName,
            username : userName
        }
    ])
    if (error){
        console.error("login credentials insert error" , error)
    }else{
        console.log("Successfull login credentials insert" , data)
    }
}

export default LoginInsert