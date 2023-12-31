<script>
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { embs } from '$lib/stores/global.js';
	import { page as pg } from '$app/stores';


	export let userId;
	export let searchType;
	export let userDetails;

	$:currentPath = $pg?.url?.pathname;

	// let embs = '';
	let selectedFile;
	let folderType;
	let socket;

	let username = userDetails.user_metadata.name;
	let userid = userDetails.id;

	onMount(async () => {
		socket = io.connect('http://192.168.200.29:8080/module5');
		// socket = io.connect('http://192.168.100.113:8080/module5');
		socket.on('receive_embeddings', function (data) {
			$embs = data.embeddings;
			// embs = data.embeddings;
			console.log('Embeddings progress is', $embs);
			});
		});

	if(searchType == 'finance-ai'){
		folderType = 'structured';
	}else if(searchType == 'semantic-search'){
		folderType = 'unstructured';
	}


	// console.log('user id store is', userId);


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
		// console.log(selectedFile);

		const { data, error } = await supabase.storage
			.from(userID)
			.upload(`${folderType}/${selectedFile.name}`, selectedFile);

		const messageElement = document.getElementById('message');

		let selectedFileName = selectedFile.name;
		socket.emit('upload', { folderType: folderType, selectedFile: selectedFileName, username: username, userid: userid });
		// socket.emit('chatgpt_question', { question: chatquestion, stylevar: stylevar });
		console.log({ folderType, selectedFileName, username, userid });

		if (error) {
			messageElement.textContent = `Error uploading file: ${error.message}`;
			console.error('Error uploading file:', error.message);
		} else {
			// messageElement.textContent = 'File uploaded successfully: ' + JSON.stringify(data.path);
			// console.log('File uploaded successfully:', data);
			// console.log('Fileeeeeeeeeeeeeeee:', `${currentPath}${selectedFileName.replace(/(\.pdf|\.xlsx)$/, '')}`);
			alert('File uploaded successfully');
			// goto('/homepage/');	
			// goto(`${$page.path}/${selectedFileName}`);

			// if (folderType == 'structured') {
			// 	goto('/documents/finance-ai/');
			// } else {
				
				goto(`${currentPath}${selectedFileName.replace(/(\.pdf|\.xlsx)$/, '')}`);
			// } /documents/semantic-search/Resume%20-%20Mohammed%20Abdullah.pdf/
			//   /documents/semantic-search/Resume%20-%20Mohammed%20Abdullah/
		}
	
		
	};
</script>

<main>
	{#if folderType == 'structured'}
		<input type="file" accept=".xlsx" on:change={handleFileChange} class="choosefile" />
	{:else}
		<input type="file" accept=".pdf" on:change={handleFileChange} class="choosefile" />
	{/if}

	<!-- Use a dynamic class based on folderType -->
	<button on:click={uploadFile} class="{folderType}-uploadbtn">Upload</button>

	<!-- {#if embs}
		<h5>{embs}</h5>
	{/if} -->

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
