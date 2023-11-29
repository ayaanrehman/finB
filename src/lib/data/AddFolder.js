import { supabase } from "$lib/supabase.js";

export const createFolder = async (dataType, newFolderName) => {
  // Use the Storage service to create a folder
  const { data, error } = await supabase.storage
    .from('dha')
    .upload(`ics-chat/${dataType}/${newFolderName}/dummy.txt`)

  const messageElement = document.getElementById('messagefoldr');
  
  if (error) {
    messageElement.textContent = `Error creating folder: ${error.message}`;
    console.error('Error creating folder:', error.message);
  } else {
    messageElement.textContent = 'Folder created: ' + JSON.stringify(data);
    // console.log('Folder created:', data);
  }
};



