import { supabase } from "$lib/supabase.js";

export const logIn = async (email, password) => {
    console.log('email is', email);
    console.log('password is', password);
    const res = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (res.data) {
        console.log(res.data)
        return res.data;
        
    }
    if (res.error) {
        console.log(res.error)
        return res.error
    }
}

export const getUserSession = async () => {
    const res = await supabase.auth.getSession();
    return res;
}

export const getUser = async () => {
    const user = await getUserSession();

    if (user?.data?.session?.user?.id) {
        let userId = user?.data?.session?.user?.id;
        return userId;
    }
}


export const getFilesFromBucket = async (folderName, bucketName) => {
    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list(folderName, {
            limit: 200,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        });

    if (data) {
        let finalBucketFiles = [];
        data.forEach(data => {
            let name = data.name.split('.')[0]
            finalBucketFiles.push({ 'name': name, 'fullname': data.name });

        });

        return finalBucketFiles;
    }
    if (error) {
        return error;

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
    // console.log("signout")
}
