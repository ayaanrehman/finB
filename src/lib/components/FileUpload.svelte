<script>
	// import { onMount } from "svelte";

    import { createClient } from '@supabase/supabase-js';
    import {getUser} from '$lib/database/utility.js';

    export let folderType;
    let selectedFile;
    
  
    const supabaseUrl = 'https://abdznefkfvnsbiboryxt.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps';


    const supabase = createClient(supabaseUrl, supabaseKey); 
    // const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
    const handleFileChange = (event) => {
      selectedFile = event.target.files[0];
      // console.log(selectedFile);
    };


   

      const uploadFile = async () => {
      let userId = await getUser();

      console.log('user id is', userId);

      if(userId){
        // let res = await supabase.from('dha')
       
          const {data, error} = await supabase
          .storage
          .createBucket(userId, {
            public: true,
            // allowedMimeTypes: ['image/png'],
            // fileSizeLimit: 1024
          });

          // console.log(res);
        // return;
      }

      // return;
      if (!selectedFile) {
        console.error('No file selected.');
        messageElement.textContent = `No file selected.`;
        return;
      }
      console.log(selectedFile);
      // return;

    const { data, error } = await supabase.storage
      .from(userId)
      .upload(`${folderType}/${selectedFile.name}`, selectedFile);

    const messageElement = document.getElementById('message');

    if (error) {
       
      messageElement.textContent = `Error uploading file: ${error.message}`;
      console.error('Error uploading file:', error.message);
    } else {
        
      messageElement.textContent = 'File uploaded successfully: ' + JSON.stringify(data);
      console.log('File uploaded successfully:', data);
    }

    // const resTwo = await supabase.from("USER_FILES").insert({
    //   user_id: userId,
    //   folder_name: folderType,
    //   file_name: selectedFile.name,
    // })
  };

    // const uploadFile = async () =>{
    //   let res = await fetch('/api/upload-file/', {
    //     method: 'POST',
    //     body: json({ file: selectedFile, folderType: folderType })
    //   });

    //   res = await res.json();
    //   // console.log(res);
    // }
    // onMount(() => {
 
    //   uploadFile();
    // });
    // uploadFile();
  </script>
  
  <main>
   
      {#if folderType === "structured"}
      <input type="file" accept=".xls, .xlsx, .csv" on:change={handleFileChange} class="choosefile"/>
      {:else}
      <input type="file" accept=".pdf, .doc, .docx" on:change={handleFileChange} class="choosefile"/>
      {/if}
      
      <!-- Use a dynamic class based on folderType -->
      <button on:click={uploadFile} class="{folderType}-uploadbtn">Upload</button>
      
      <p id="message"></p>
 
  
  </main>
  
  <style>
    .choosefile {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    .structured-uploadbtn, .unstructured-uploadbtn {
      padding: 10px;
      margin: 10px;
      background-color: #4CAF50; 
      color: white; 
      border: none; 
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
  