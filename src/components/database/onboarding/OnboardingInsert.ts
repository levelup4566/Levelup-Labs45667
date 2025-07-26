import supabase from "../SupabaseSetup";


async function OnboardingInsert(clerkUserId , learningGoal , timeCommitment , experienceLevel){
    const {data , error} = await supabase.from("onboarding_data").insert([
        {
            clerk_user_id :  clerkUserId,
            learning_goal : learningGoal,
            time_commitment : timeCommitment,
            experience_level : experienceLevel

        }
    ])
    if (error){
        console.error("Onboarding data insert error" , error)
    }else{
        console.log("successfull onboarding data insert" , data)
    }
}

export default OnboardingInsert