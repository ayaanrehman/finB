import { createClient } from '@supabase/supabase-js';
import { lisFolder } from '$lib/stores/global.js';
import { get } from 'svelte/store';


const supabaseUrl = 'https://abdznefkfvnsbiboryxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps';

const supabase = createClient(supabaseUrl, supabaseKey); 


let folderValue;

// Subscribe to the store
lisFolder.subscribe(value => {
  folderValue = value;
});



export const listFolder = async () => {
    const folderValue = get(lisFolder);

    const { data, error } = await supabase
    .storage
    .from('dha')
    .list(`ics-chat/${folderValue}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    })

    if(data){
        let listFolders = [];
        // console.log('data', data);
        data.forEach(data => {
            let name = data.name.split('.')[0]
            // finalBucketFiles.push({'name': name.trim().replaceAll(' ', '_'), 'fullname': data.name});
            listFolders.push({'name': name, 'fullname': data.name});

        });
        // console.log('listFolders', listFolders);
        // console.log("This is the lisFolder variable: ", folderValue);
        // console.log("This is the listFoldersssssss: ", listFolders);
        
        return listFolders;
        
    }
    if(error){
        return error;
        // console.log('error', error);
    }
}
// How to send here lisFolder variable from a svelte page?


