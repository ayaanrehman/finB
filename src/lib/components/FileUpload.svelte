<script>
	import { supabase } from '$lib/supabase.js';

	export let userId;
	export let searchType;


	let selectedFile;
	let folderType;

	if(searchType == 'finance-ai'){
		folderType = 'structured';
	}else if(searchType == 'semantic-search'){
		folderType = 'unstructured';
	}


	console.log('user id store is', userId);


	const handleFileChange = (event) => {
		selectedFile = event.target.files[0];
	};

	const uploadFile = async () => {

		let userID = userId;

		if (userID) {
			const { data, error } = await supabase.storage.createBucket(userID, {
				public: true
				// allowedMimeTypes: ['image/png'],
				// fileSizeLimit: 1024
			});
		}

		if (!selectedFile) {
			const messageElement = document.getElementById('message');
			console.error('No file selected.');
			messageElement.textContent = `No file selected.`;
			// return;
		}
		console.log(selectedFile);

		const { data, error } = await supabase.storage
			.from(userID)
			.upload(`${folderType}/${selectedFile.name}`, selectedFile);

		const messageElement = document.getElementById('message');

		if (error) {
			messageElement.textContent = `Error uploading file: ${error.message}`;
			console.error('Error uploading file:', error.message);
		} else {
			messageElement.textContent = 'File uploaded successfully: ' + JSON.stringify(data.path);
			console.log('File uploaded successfully:', data);
			window.location.href = '/homepage/';		

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

	#message {
		margin: 10px;
		padding: 10px;
		border-radius: 5px;
		color: aqua;
		word-wrap: break-word;


	}
</style>
