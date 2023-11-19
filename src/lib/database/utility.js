import { SupabaseClient } from "@supabase/supabase-js";
import { onMount } from "svelte";

import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "$env/static/private"




// Create a single supabase client for interacting with your database
// const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export const getFilesFromBucket = async (folderName) => {
    // console.log(test);
    // supabase.getFilesFromBucket();
    const { data, error } = await supabase
    .storage
    .from('dha')
    .list(folderName, {
        limit: 200,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    });

    if(data){
        let finalBucketFiles = [];
        // console.log('data', data);
        data.forEach(data => {
            let name = data.name.split('.')[0]
            // finalBucketFiles.push({'name': name.trim().replaceAll(' ', '_'), 'fullname': data.name});
            finalBucketFiles.push({'name': name, 'fullname': data.name});

        });

        return finalBucketFiles;
    }
    if(error){
        return error;
        // console.log('error', error);
    }
}


export const getSignedUrl = async (folderName, fullname) => {
    let url = await supabase.storage.from('dha').createSignedUrl(`${folderName}/${fullname}`, 3600);
    return url.data.signedUrl;
}
