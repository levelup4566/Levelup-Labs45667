import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const SUPABASE_URL = "https://paarduehupvrshjnpyhg.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhYXJkdWVodXB2cnNoam5weWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NjU5MTcsImV4cCI6MjA2NTE0MTkxN30.g7PhctaBXVBLKxRmhB8ab51RU_PBec5fmFEKPzXPTK0";

/**
 * Returns a Supabase client instance that uses the current Clerk session token for authenticated requests.
 * Use this hook in your components to always get a client with the latest token.
 */
export function useSupabaseClient(): SupabaseClient<Database> {
  const { getToken } = useAuth();
  const [client, setClient] = useState(() =>
    createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  );

  useEffect(() => {
    let isMounted = true;
    const updateClient = async () => {
      const token = await getToken({ template: "supabase" });
      if (isMounted) {
        setClient(
          createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
            global: {
              headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            },
          })
        );
      }
    };
    updateClient();
    return () => {
      isMounted = false;
    };
  }, [getToken]);

  return client;
}

// For legacy/unauthenticated usage
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);