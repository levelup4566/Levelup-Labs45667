import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";

/**
 * Ensures a user profile exists in Supabase for the current Clerk user.
 * Creates a new profile if one does not exist.
 * @param _supabase - a Supabase client instance (unused, for compatibility)
 */
export function useEnsureUserProfile(_supabase: SupabaseClient<Database>) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !user) return;
    const clerkUserId = user.id;

    async function ensureProfile() {
      const token = await getToken({ template: "supabase" });
      const authedSupabase = createClient<Database>(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
          global: {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          },
        }
      );

      console.log("[useEnsureUserProfile] Checking for user profile in DB for clerk_user_id:", clerkUserId);
      // Check if profile exists
      const { data, error } = await authedSupabase
        .from("user_profiles")
        .select("id")
        .eq("clerk_user_id", clerkUserId)
        .maybeSingle();

      if (error) {
        console.error("[useEnsureUserProfile] Error checking user profile:", error);
        return;
      }
      if (data) {
        console.log("[useEnsureUserProfile] User profile already exists in DB for clerk_user_id:", clerkUserId);
      } else {
        console.log("[useEnsureUserProfile] No user profile found, inserting new profile for clerk_user_id:", clerkUserId);
        const { error: insertError } = await authedSupabase
          .from("user_profiles")
          .insert({
            clerk_user_id: clerkUserId,
            // Optionally add more fields here, e.g. name/email if schema is extended
          });
        if (insertError) {
          console.error("[useEnsureUserProfile] Error inserting user profile:", insertError);
        } else {
          console.log("[useEnsureUserProfile] Successfully inserted user profile for clerk_user_id:", clerkUserId);
        }
      }
    }

    ensureProfile();
  }, [user, isLoaded, getToken]);
}