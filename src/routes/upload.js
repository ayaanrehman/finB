// src/routes/api/upload.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "$env/static/private"

export async function post(request) {

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const file = request.files.get('file');

  const { data, error } = await supabase.storage
    .from('dha') // Replace with your bucket name
    .upload(`structured/${file.name}`, file);

  if (error) {
    return {
      status: 500,
      body: JSON.stringify({ error: 'Error uploading file' }),
    };
  }

  return {
    status: 200,
    body: JSON.stringify({ success: 'File uploaded successfully', data }),
  };
}
