import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Singleton pattern for client-side Supabase client
let supabaseClientInstance: SupabaseClient | null = null;

/**
 * Get or create a singleton Supabase client for browser use
 * This prevents multiple GoTrueClient instances from being created
 */
export function getSupabaseClientBrowser(): SupabaseClient {
  // Return cached client if it exists
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable'
    );
  }

  // Create and cache the client
  supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseClientInstance;
}
