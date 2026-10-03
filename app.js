const SUPABASE_URL = "https://jprqqylhmwenshynrgtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_QL9UvmHtxzM9fvZAG8TFnw_UvpOEY3i";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("FindWorker connected to Supabase");
