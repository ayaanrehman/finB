<script>
  import { createClient } from '@supabase/supabase-js';

  let selectedFile;

  const supabaseUrl = 'https://abdznefkfvnsbiboryxt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHpuZWZrZnZuc2JpYm9yeXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NDMxMjEsImV4cCI6MjAxNDQxOTEyMX0.RXccIdpzH8QOQvX6OUPSb9HsW8aAKNvPtYv6-lE-9Ps';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleFileChange = (event) => {
    selectedFile = event.target.files[0];
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const { data, error } = await supabase.storage
      .from('dha') // Replace with your bucket name
      .upload(`unstructured/${selectedFile.name}`, selectedFile);

    if (error) {
      console.error('Error uploading file:', error.message);
    } else {
      console.log('File uploaded successfully:', data);
    }
  };
</script>

<main>
  <input type="file" accept=".pdf, .doc, .docx" on:change={handleFileChange} />
  <button on:click={uploadFile}>Upload</button>
</main>
