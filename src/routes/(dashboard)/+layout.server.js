/** @type {import('./$types').LayoutLoad} */
import {get} from "svelte/store"


import { getFilesFromBucket } from "$lib/database/utility";
import { getUserSession } from "$lib/database/utility.js";
import {userIdStore} from "$lib/stores/global.js";
import { goto } from "$app/navigation";
import {redirect} from "@sveltejs/kit";
import { navigate } from "svelte-routing";
// import{env} from "$env/static/public"

// Create a single supabase client for interacting with your database
export const load = async ({ url: { pathname } }) => {

	let user = await getUserSession();

	


	// console.log('user is', user.data.session.user.id);
	let userId = user?.data?.session?.user?.id
	userIdStore.set(userId);

	console.log('get user id', get(userIdStore));

	// let userID = get(userIdStore);
	// console.log('user id store is', userID);

	// userIdStore = userId;

	if(user?.data?.session?.access_token){
		let bucketFiles = await getFilesFromBucket('structured', userId);
		let bucketFilesUnStructured = await getFilesFromBucket('unstructured', userId);
		// console.log(bucketFilesUnStructured);
		return { pathname, bucketFiles, bucketFilesUnStructured, userId };
	}else{
		// navigate('/login');
		throw redirect(302, '/login')
	}

	// const supabase = createClient('https://abdznefkfvnsbiboryxt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps');
	
	
};
// export const prerender = true;
export const trailingSlash = 'always'; 

// export const ssr = false;

// export let isFirstLoad = false;