// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
// import { combineChunks, createBrowserClient, isBrowser, parse } from '@supabase/ssr'

// export const load = async ({ fetch, data, depends }) => {
//   depends('supabase:auth')

//   console.log("data from layout.js", data);

//   const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
//     global: {
//       fetch,
//     },
//     cookies: {
//       get(key) {
//         if (!isBrowser()) {

//           return JSON.stringify(data?.session)
//         }
//         else {
            
//         }

//         const cookie = combineChunks(key, (name) => {
//           const cookies = parse(document.cookie)
//           return cookies[name]
//         })
//         return cookie
//       },
//     },
//   })

//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   return { supabase, session }
// }
