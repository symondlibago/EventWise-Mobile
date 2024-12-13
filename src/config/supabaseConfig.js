import { EXPO_SUPABASE_URL, EXPO_SUPABASE_KEY } from "react-native-dotenv";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(EXPO_SUPABASE_URL, EXPO_SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
// clear no more evn
