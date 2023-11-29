import { supabase } from "$lib/supabase.js";
import {userIdStore} from "$lib/stores/global.js"

export const logIn = async (email, password) => {
    console.log('email is', email);
    console.log('password is', password);

    // const test = await supabase.auth.signInWithPassword
    const res = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (res.data) {
        return res.data;
    }
    if(res.error){
        return res.error
    }
}

export const getUserSession = async() => {
    const res = await supabase.auth.getSession();
    // console.log('res is', res);
    let userId = res?.data?.session?.user?.id;
        // $userIdStore = userId;
        // console.log('useridugyuyugu store is',userId)
    
    // console.log('userid store is',$userIdStore)
    // console.log(`useridddddddd is: ${$userIdStore}`)
    // if(res.data){
        return res;
    // }
    // if(res.error){
        // return res;
    // }
}

export const getUser = async () => {
    const user = await getUserSession();

  if(user?.data?.session?.user?.id){
    console.log('user is', user?.data?.session?.user?.id);
    console.log('user 2 is', user.data.session.user.id);
    console.log('user 3 is', user);
    let userId = user?.data?.session?.user?.id;
   
    return userId;
  }
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
