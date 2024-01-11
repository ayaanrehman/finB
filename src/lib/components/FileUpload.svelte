<script>
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { embs } from '$lib/stores/global.js';
	import { page as pg } from '$app/stores';
	import { filenameStore } from '$lib/stores/global.js';

	export let userId;
	export let searchType;
	export let userDetails;

	$: currentPath = $pg?.url?.pathname;

	// let embs = '';
	let file;
	let folderType;
	let socket;

	let selectedFileName = '';
	let username = userDetails.user_metadata.name;
	let folderTypez;


	onMount(async () => {
		// socket = io.connect('http://192.168.200.29:8080/module5');
		// socket = io.connect('http://10.20.20.62:8080/module5');
		socket = io.connect('https://icsfinblade.com:444/module5');
		// socket = io.connect('http://192.168.100.113:8080/module5');
		socket.on('receive_embeddings', function (data) {
			$embs = data.embeddings;
			// embs = data.embeddings;
			console.log('Embeddings progress is', $embs);
		});
	});

	if (searchType == 'finance-ai') {
		folderType = 'structured';
	} else if (searchType == 'semantic-search') {
		folderType = 'unstructured';
	}

	// console.log('user id store is', userId);

	const handleFileChange = (event) => {
		file = event.target.files[0];
	};

	const uploadFile = async () => {
		selectedFileName = file.name;

		const messageElement = document.getElementById('message');
		messageElement.textContent = `Uploading file...`;

		if (userId) {
			const { data, error } = await supabase.storage.createBucket(userId, {
				public: true
				// allowedMimeTypes: ['image/png'],
				// fileSizeLimit: 1024
			});
		}

		if (!file) {
			const messageElement = document.getElementById('message');
			console.error('No file selected.');
			messageElement.textContent = `No file selected.`;
			// return;
		}
		// console.log(selectedFile)

		// let selectedFileName = selectedFile.name;

		// if (error) {
		// 	messageElement.textContent = `Error uploading file: ${error.message}`;
		// 	console.error('Error uploading file:', error.message);
		// 	return;
		// } else {
		// 	socket.emit('upload', {
		// 		folderType: folderType,
		// 		selectedFile: selectedFileName,
		// 		username: username,
		// 		userid: userid
		// 	});
		// 	console.log({ folderType, selectedFileName, username, userid });

		// 	if(searchType == 'semantic-search'){
		// 		if ($embs !== 'Started' && $embs !== 'Completed' && $embs !== "") {
		// 			alert('Failed to upload file. Please try again' + $embs);
		// 			$embs = '';
		// 			return;
		// 		} else if ($embs == 'Completed') {
		// 			alert('File uploaded successfully1');
		// 			setFileNameStore();
		// 			$embs = '';
		// 			messageElement.textContent = '';
		// 			goto(`${currentPath}${selectedFileName.replace(/(\.pdf|\.xlsx)$/, '')}`);
		// 		}
		// 	} else {

		// 		alert('File uploaded successfully2');
		// 		setFileNameStore();
		// 		$embs = '';
		// 		messageElement.textContent = '';
		// 		goto(`${currentPath}${selectedFileName.replace(/(\.pdf|\.xlsx)$/, '')}`);
		// 	}
		// };

		if (searchType == 'finance-ai') {
			folderTypez = 'structured';
		} else if (searchType == 'semantic-search') {
			folderTypez = 'unstructured';
		}

		// Wrap the emit and response handling in a new Promise
		async function uploadFile() {
			return new Promise(async (resolve, reject) => {
				// Emit the upload event
				socket.emit('upload', {
					folderType: folderTypez,
					selectedFile: selectedFileName,
					username: username,
					userid: userId
				});
				console.log({ folderTypez, selectedFileName, username, userId });

				$embs = '';

				if (searchType !== 'finance-ai') {
					if ($embs !== 'Started' && $embs !== 'Completed' && $embs !== '') {
						alert('Failed to upload file. Please try again' + $embs);
						uploadBar = false;
						$embs = '';
						return;
					} else
						while ($embs !== 'Completed') {
							await new Promise((r) => setTimeout(r, 1000));
						}
						resolve('Completed');	
				}
				// Once $embs === 'Completed', resolve the Promise

				if (searchType == 'finance-ai') {
					resolve('Completed');
				}
			});
		}

		const filePath = `${folderTypez}/${file.name}`;
		const { error } = await supabase.storage.from(`${userId}`).upload(filePath, file);

		if (error) {
			console.error(error.message);
			alert('Error uploading file: ' + error.message);
			$embs = '';
			return;
		} else {
			await uploadFile();
			alert('File uploaded successfully');
			console.log('File uploaded successfully');
			setFileNameStore();
			$embs = '';
			goto(`${currentPath}${file.name.replace(/(\.pdf|\.xlsx)$/, '')}`);
		}
	};

	function setFileNameStore() {
		if (searchType == 'finance-ai') {
			let filename = selectedFileName.replace(/(\.pdf|\.xlsx)$/, '');
			// sr(filename);
			filenameStore.set({ filename: filename, source: 'finance-ai' });
		} else if (searchType == 'semantic-search') {
			let filename = selectedFileName.replace(/(\.pdf|\.xlsx)$/, '');
			// sfp(filename);
			filenameStore.set({ filename: filename, source: 'semantic-search' });
		}
	}
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
		color: white;
		font-size: small;
		word-wrap: break-word;
	}
</style>
