import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abdznefkfvnsbiboryxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps';

const supabase = createClient(supabaseUrl, supabaseKey); 

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



