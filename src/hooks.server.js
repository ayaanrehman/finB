// import { createServerClient } from "@supabase/ssr"
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"
// import { redirect } from "@sveltejs/kit";
// import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";

// export const handle = async ({ event, resolve }) => {
//     event.locals.supabase = createSupabaseServerClient({supabaseUrl: PUBLIC_SUPABASE_URL, supabaseKey: PUBLIC_SUPABASE_ANON_KEY, event: event})

//     event.locals.getSession = async () => {
//         const {
//             data: { session }
//         } = await event.locals.supabase.auth.getSession();
//         console.log("data from hooks:", session)
//         // console.log(session);

//         return session;
//     }

//     const session = await event.locals.getSession();
//     console.log('hello session', session);
//     console.log("urls pathname:", event.url.pathname)

//     if(!session){
//         if(!event.url.pathname == '/login'){
//             throw redirect(302, '/login')
//         }
        
//     }
    

//     return resolve(event, {
//         filterSerializedResponseHeaders(name){
//             return name === 'content-ranage'
//         }
//     })
// }