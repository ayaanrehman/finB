import {json} from '@sveltejs/kit';
import { uploadFile } from '$lib/database/utility.js';
export async function POST({ request }) {
    // console.log(selectedFile);
    const res = await request.json();
    console.log(res);

    return json({ body: 'Hello world', status: 200 });
}