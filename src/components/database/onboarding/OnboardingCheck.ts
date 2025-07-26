import supabase from "../SupabaseSetup";

async function OnboardingCheck(
  clerkUserId: string,
  learningGoal: string,
  timeCommitment: string,
  experienceLevel: string
): Promise<boolean> {
  console.log("Checking clerkUserId in onboarding_data:", clerkUserId);

  const { data, error } = await supabase
    .from("onboarding_data")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle(); // ← FIXED

  if (error) {
    console.error("Unexpected error while fetching onboarding data:", error);
    return false;
  }

  if (!data) {
    console.log("User not found in onboarding_data, needs insert.");
    return false; // allow insert to run
  }

  console.log("Existing onboarding data:", data);

  const shouldUpdate =
    data.learning_goal !== null && data.learning_goal !== learningGoal ||
    data.time_commitment !== null && data.time_commitment !== timeCommitment ||
    data.experience_level !== null && data.experience_level !== experienceLevel;

  if (shouldUpdate) {
    const { error: updateError } = await supabase
      .from("onboarding_data")
      .update({
        learning_goal: learningGoal,
        time_commitment: timeCommitment,
        experience_level: experienceLevel,
      })
      .eq("clerk_user_id", clerkUserId);

    if (updateError) {
      console.error("Error updating onboarding data:", updateError);
      return false;
    } else {
      console.log("Successfully updated onboarding data.");
      return true;
    }
  } else {
    console.log("No update needed — data already matches or fields are null.");
    return true;
  }
}

export default OnboardingCheck;
