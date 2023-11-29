<script>
	import { getUser } from '$lib/database/utility.js';
	import {get} from "svelte/store";
	import { supabase } from '$lib/supabase.js';
	import {userIdStore} from "$lib/stores/global.js";

	export let folderType;
	export let userId;
	let selectedFile;

	console.log('user id store is', userId);


	const handleFileChange = (event) => {
		selectedFile = event.target.files[0];
		// console.log(selectedFile);
	};

	const uploadFile = async () => {
		// const userId = await getUser();
		// console.log('user id is', userId);
		// let userID = $userIdStore;

		let userID = userId;

		if (userID) {
			// let res = await supabase.from('dha')

			const { data, error } = await supabase.storage.createBucket(userID, {
				public: true

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
			.from(userID)
			.upload(`${folderType}/${selectedFile.name}`, selectedFile);

		const messageElement = document.getElementById('message');

		if (error) {
			messageElement.textContent = `Error uploading file: ${error.message}`;
			console.error('Error uploading file:', error.message);
		} else {
			messageElement.textContent = 'File uploaded successfully: ' + JSON.stringify(data);
			console.log('File uploaded successfully:', data);
		}
	};
</script>

<main>
	{#if folderType === 'structured'}
		<input type="file" accept=".xls, .xlsx, .csv" on:change={handleFileChange} class="choosefile" />
	{:else}
		<input type="file" accept=".pdf, .doc, .docx" on:change={handleFileChange} class="choosefile" />
	{/if}

	<!-- Use a dynamic class based on folderType -->
	<button on:click={uploadFile} class="{folderType}-uploadbtn">Upload</button>

	<p id="message" />
</main>

<style>
	.choosefile {
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.structured-uploadbtn,
	.unstructured-uploadbtn {
		padding: 10px;
		margin: 10px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
