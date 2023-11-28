import { SupabaseClient } from "@supabase/supabase-js";
import { onMount } from "svelte";

import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public"




// Create a single supabase client for interacting with your database
// const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);


export const logIn = async (email, password) => {
    console.log('email is', email);
    console.log('password is', password);

    // const test = await supabase.auth.signInWithPassword
    const res = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    // res = await res.JSON();/

    // console.log(res);
// 
    if (res.data) {
        return res.data;
    }
    if(res.error){
        return res.error
    }

    // return data.error
    // if(error){
    //     return error;
    // }
    // if(user){
    //     console.log('user is ', user);
    //     return user;
    // }
}

export const getUserSession = async() => {
    const res = await supabase.auth.getSession();

    // if(res.data){
        return res;
    // }
    // if(res.error){
        // return res;
    // }
}

export const getFilesFromBucket = async (folderName, bucketName) => {
    // console.log(test);
    // supabase.getFilesFromBucket();
    const { data, error } = await supabase
    .storage
    .from(bucketName)
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


export const getSignedUrl = async (folderName, fullname, bucketName) => {
    console.log('calling');
    let url = await supabase.storage.from(bucketName).createSignedUrl(`${folderName}/${fullname}`, 3600);
    console.log('url', url);
    return url.data.signedUrl;
}

export const getUser = async () => {
    const user = await getUserSession();

  if(user?.data?.session?.user?.id){
    return user.data.session.user.id
  }
}

export const signOut = async () => {
    const data = await supabase.auth.signOut();
return data;
}



// export  const uploadFile = async (selectedFile, folderType) => {
//     if (!selectedFile) {
//       console.error('No file selected.');
//       messageElement.textContent = `No file selected.`;
//       return;
//     }

//     const { data, error } = await supabase.storage
//       .from('dha')
//       .upload(`ics-chat/${folderType}/${selectedFile.name}`, selectedFile);

//     // const messageElement = document.getElementById('message');

//     if (error) {
//         return error;
//       messageElement.textContent = `Error uploading file: ${error.message}`;
//       console.error('Error uploading file:', error.message);
//     } else {
//         return JSON.stringify(data);
//       messageElement.textContent = 'File uploaded successfully: ' + JSON.stringify(data);
//       console.log('File uploaded successfully:', data);
//     }
//   };
