import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SERVICE_ROLE_KEY } from "$env/static/public"

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
    }
})


// Access auth admin api

const adminSupabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

// Access auth admin api
export const adminAuthClient = adminSupabase.auth.admin
