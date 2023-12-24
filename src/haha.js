import { createServerClient } from "@supabase/ssr"
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get: (key) =>{
                    event.cookies.get(key)
                },
                set: (key, value, options) => {
                    event.cookies.set(key, value, options)
                },
                remove: (key, options) => {
                    event.cookies.delete(key, options)
                }
            }
        },
    );

    event.locals.getSession = async () => {
        let {
            data: { session }
        } = await event.locals.supabase.auth.getSession();
        console.log("data from hooks:", session)
        // console.log(session);

        return session;
    }

    const session = await event.locals.getSession();
    console.log('hello session', session);
    console.log("urls pathname:", event.url.pathname)

    if(!session){
        if(!event.url.pathname == '/login'){
            throw redirect(302, '/login')
        }
        
    }
    

    return resolve(event, {
        filterSerializedResponseHeaders(name){
            return name === 'content-ranage'
        }
    })
}