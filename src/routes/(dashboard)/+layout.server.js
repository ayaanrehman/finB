/** @type {import('./$types').LayoutLoad} */
import {get} from "svelte/store"


import { getFilesFromBucket } from "$lib/database/utility";
import { getUserSession } from "$lib/database/utility.js";
import { goto } from "$app/navigation";
import {redirect} from "@sveltejs/kit";
import { navigate } from "svelte-routing";
// import{env} from "$env/static/public"

// Create a single supabase client for interacting with your database
export const load = async ({ url: { pathname }, locals }) => {

    // console.log(event);

    // let session = await locals.getSession();

    // console.log('session is', session);

	let user = await getUserSession();


	console.log('user is', user);
	// console.log('user is', user.data.session.user.id);
	let userId = user?.data?.session?.user?.id;
	let userDetails = user?.data?.session?.user;
	
	if(user?.data?.session?.access_token){
		let bucketFiles = await getFilesFromBucket('structured', userId);
		let bucketFilesUnStructured = await getFilesFromBucket('unstructured', userId);
		return { pathname, bucketFiles, bucketFilesUnStructured, userId, userDetails};
	}else{
		// navigate('/login');
		throw redirect(302, '/login')
		// console.log{"no session"}
	}

	// const supabase = createClient('https://abdznefkfvnsbiboryxt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps');
	
	
};
// export const prerender = true;
export const trailingSlash = 'always'; 

// export const ssr = false;

// export let isFirstLoad = false;