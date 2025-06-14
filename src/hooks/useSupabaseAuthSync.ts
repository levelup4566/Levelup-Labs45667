import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Syncs Clerk session token to Supabase client for authenticated requests.
 * Call this hook at the root of your app.
 */
export function useSupabaseAuthSync() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const syncSession = async () => {
      if (isSignedIn) {
        // Use the JWT template name you configured in Clerk for Supabase
        const token = await getToken({ template: "supabase" });
        if (token) {
          console.log("[useSupabaseAuthSync] Clerk JWT for Supabase:", token);
          await supabase.auth.setSession({ access_token: token, refresh_token: "" });
          console.log("[useSupabaseAuthSync] Set Supabase session from Clerk session token.");
        } else {
          await supabase.auth.signOut();
          console.warn("[useSupabaseAuthSync] Clerk token not found, Supabase session signed out.");
        }
      } else {
        await supabase.auth.signOut();
        console.log("[useSupabaseAuthSync] User not signed in, Supabase session signed out.");
      }
    };
    syncSession();
  }, [isSignedIn, getToken]);
}