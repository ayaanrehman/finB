/** @type {import('./$types').LayoutLoad} */

import { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from '@supabase/supabase-js';

import { getFilesFromBucket } from "$lib/database/utility";
// import{env} from "$env/static/public"

// Create a single supabase client for interacting with your database
export const load = async ({ url: { pathname } }) => {

	// const supabase = createClient('https://abdznefkfvnsbiboryxt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps');
	
	let bucketFiles = await getFilesFromBucket('structured');
	let bucketFilesUnStructured = await getFilesFromBucket('unstructured');
	// console.log(bucketFilesUnStructured);
	return { pathname, bucketFiles, bucketFilesUnStructured };
};
// export const prerender = true;
export const trailingSlash = 'always'; 

// export const ssr = false;

// export let isFirstLoad = false;