<script>
	// import documents from '$lib/data/documents.json';
	// import output from 'C:/Users/Ayan-PC/Downloads/chat_assistant_10/chat_assistant_10/output.json';
	import { onDestroy, onMount } from 'svelte';
	import { selectSearch } from '$lib/stores/global.js';
	// import { searchBoxx } from '$lib/stores/global.js';
	// import { sr } from '$lib/data/helpers';
	// import { srn } from '$lib/data/helpers';
	// import { sfp } from '$lib/data/helpers';
	// import { temp } from '$lib/data/helpers';
	// import Layout fr/om '../../routes/+layout.svelte';
	import FileUpload from './FileUpload.svelte';
	import { createFolder } from '../data/AddFolder';
	import { listFolder } from '../data/listFolders';
	import { lisFolder } from '$lib/stores/global.js';
	import SearchList from './SearchList.svelte';

	import { supabase } from '$lib/supabase.js';
	import { page as pg } from '$app/stores';
	import { goto } from '$app/navigation';
	import { embs } from '$lib/stores/global.js';
	import { filenameStore } from '$lib/stores/global.js';




	// export let data;
	// export let data2;

	export let pageUrl;
	export let bucketFiles;
	export let bucketFilesUnStructured;
	export let userId;
	export let searchType;
	export let userDetails;

	$:currentPath = $pg?.url?.pathname;
	
	let uploadingFile = '';
	let isResizing = false;
	let isOnEdge = false;
	let keydownHandler;
	let socket;

	function changeCursor(event) {
	let nav = document.getElementById('nav');
	let rect = nav.getBoundingClientRect();
	if (rect.right - event.clientX < 10) {
		nav.style.cursor = 'ew-resize';
		isOnEdge = true;
	} else {
		nav.style.cursor = 'default';
		isOnEdge = false;
	}
}

onMount(() => {
    document.body.addEventListener('dragover', handleDragOver);
    document.body.addEventListener('dragleave', handleDragLeave);
    document.body.addEventListener('drop', handleDrop);

    return () => {
      document.body.removeEventListener('dragover', handleDragOver);
      document.body.removeEventListener('dragleave', handleDragLeave);
      document.body.removeEventListener('drop', handleDrop);
    };
  });

onMount(async () => {
		// socket = io.connect('http://192.168.200.29:8080/module5');
		// socket = io.connect('http://10.20.20.62:8080/module5');
		socket = io.connect('https://icsfinblade.com:444/module5');
		// socket = io.connect('http://192.168.100.113:8080/module5');
		// socket.on('receive_embeddings', function (data) {
		// 	$embs = data.embeddings;
		// 	// embs = data.embeddings;
		// 	console.log('Embeddings progress is', $embs);
		// 	});
		socket.on('receive_embeddings', function (data) {
					console.log('Embeddings progress is', data.embeddings);
					$embs = data.embeddings;
				});
	
		});

		let embsmessage = '';

		$: embsmessage = $embs === 'Started' ? 'Understanding the document...' : 
						 $embs === '40%' ? 'Creating chunks...' : 
					     $embs === '60%' ? 'Creating embeddings...' : 
						 $embs === 'Completed' ? 'Successful uploaded...': $embs;


onMount(() => {
    if (typeof window !== 'undefined') {
      keydownHandler = function handleKeydown(event) {
        if (isResizing && event.key === 'Escape') {
          stopResize(event);
        }
      };

      window.addEventListener('keydown', keydownHandler);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', keydownHandler);
    }
  });

  //fjiosdfjiodsjgfio

    function startResize(event) {
        if (isOnEdge) {
   		 isResizing = true;
		document.body.classList.add('no-select');
		document.getElementById('nav').style.cursor = 'ew-resize';
    }
}

    function doResize(event) {
        if (isResizing) {
			let newWidth = event.pageX;
        let minWidth = 200; // Set your minimum width here
        let maxWidth = 500; // Set your maximum width here

        if (newWidth < minWidth) newWidth = minWidth;
        else if (newWidth > maxWidth) newWidth = maxWidth;

        document.getElementById('nav').style.width = `${newWidth}px`;
		document.getElementById('nav').style.cursor = 'ew-resize';
			
        }
    }

    function stopResize(event) {
        isResizing = false;
		document.body.classList.remove('no-select');
		document.getElementById('nav').style.cursor = 'default';
    }

	// let isPageUrl = false;

	// let socket;

	let folderType = 'structured';

	let upload = false;
	let uploadFolder = false;
	let showDocuments = true;
	let showDocuments2 = true;
	let li2 = false;
	let li = true;

	let searchInput = '';
	let searchInput2 = '';

	function uploading() {
		upload = !upload;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	let newFolderName = '';
	let dataType = 'structured';

	let foldersz = [];

	onMount(async () => {
		foldersz = await listFolder();
	});

	const handleCreateFolder = () => {
		createFolder(dataType, newFolderName);
		// Reset input field or perform any other necessary actions
		setTimeout(() => {
			newFolderName = '';
		}, 100);
	};

	function uploadFldr() {
		uploadFolder = !uploadFolder;
		toggleShowDocuments();
		toggleShowDocuments2();
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	onMount(() => {
		const navID = document.getElementById('symbtn');
		if (navID) {
			navID.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
			navID.style.color = 'rgba(255, 255, 255)';
		}

		const toggleButton = document.getElementById('openSidebar');
		const object = document.getElementById('nav');
		let isBright = true;
		let isMarginIncreased = false;

		toggleButton.addEventListener('click', () => {
			isBright = !isBright;
			isMarginIncreased = !isMarginIncreased;
			let currentDisplay = window.getComputedStyle(object).getPropertyValue('display');
			// if (currentDisplay === 'none') {
			object.classList.toggle('show-sidebar');

			toggleButton.style.filter = isBright ? 'brightness(100%)' : 'brightness(50%)';
			toggleButton.style.marginTop = isMarginIncreased ? '0.5em' : '1em';

			// } else {
			//     object.style.display = 'none';
			// }
		});
	});

	// let fileName;

	// function submitStructure(e) {
	// 	let filename = e.target.dataset.docName;
	// 	sr(filename);
	// }

	// function submitFileName(e) {
	// 	let filename = e.target.dataset.docName;
	// 	sfp(filename);
	// }

	function toggleShowDocuments() {
		showDocuments = !showDocuments;
		hideDocSearch();
	}

	function toggleShowDocuments2() {
		showDocuments2 = !showDocuments2;
		hideDocSearch2();
	}

	// function toggleDataLake() {
	// 	li2 = true;
	// 	li = false;

	// 	folderType = 'unstructured';
	// 	dataType = 'unstructured';
	// 	$lisFolder = 'unstructured';

	// 	$selectSearch = false;
	// 	$searchBoxx = true;

	// 	searchInput = '';
	// 	searchInput2 = '';

	// 	const navID = document.getElementById('symbtn');
	// 	if (navID) {
	// 		navID.style.borderBottom = 'none';
	// 		navID.style.color = 'rgba(255, 255, 255, 0.7)';
	// 	}
	// 	const navID2 = document.getElementById('finbtn');
	// 	if (navID2) {
	// 		navID2.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
	// 		navID2.style.color = 'rgba(255, 255, 255)';
	// 	}
	// }

	// function toggleDataLake2() {
	// 	li2 = false;
	// 	li = true;

	// 	folderType = 'structured';
	// 	dataType = 'structured';
	// 	$lisFolder = 'structured';

	// 	$selectSearch = true;
	// 	$searchBoxx = false;

	// 	searchInput = '';
	// 	searchInput2 = '';

	// 	const navID = document.getElementById('finbtn');
	// 	if (navID) {
	// 		navID.style.borderBottom = 'none';
	// 		navID.style.color = 'rgba(255, 255, 255, 0.7)';
	// 	}
	// 	const navID2 = document.getElementById('symbtn');
	// 	if (navID2) {
	// 		navID2.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
	// 		navID2.style.color = 'rgba(255, 255, 255)';
	// 	}
	// }

	//////////////////////	Data Lake search filter for Symantec Search	Start	//////////////////////////////////

	let isDocSearchHidden = false; // Initialize the variable to false

	function hideDocSearch() {
		isDocSearchHidden = !isDocSearchHidden;
		let hds = document.getElementsByClassName('docsearch');

		if (isDocSearchHidden) {
			// If the search is hidden, you might want to hide it by modifying its style.
			for (let i = 0; i < hds.length; i++) {
				hds[i].style.display = 'none';
			}
		} else {
			// If it's not hidden, you can show it again.
			for (let i = 0; i < hds.length; i++) {
				hds[i].style.display = 'block'; // Or another appropriate display value
			}
		}
	}

	let financeAiDocs = bucketFiles;

	// console.log("THis is Sidebar bucketfiles:", bucketFiles)

	function filterDocuments() {
		financeAiDocs = bucketFiles.filter((document) =>
			document.name.toLowerCase().includes(searchInput2.toLowerCase())
		);
	}

	$: searchInput2, filterDocuments();

	//////////////////////	Data Lake search filter for Symantec Search	End	//////////////////////////////////

	//////////////////////	Data Lake search filter for Finance AI	Start	//////////////////////////////////

	let isDocSearchHidden2 = false; // Initialize the variable to false

	function hideDocSearch2() {
		isDocSearchHidden2 = !isDocSearchHidden2;
		let hds2 = document.getElementsByClassName('docsearch2');

		if (isDocSearchHidden2) {
			// If the search is hidden, you might want to hide it by modifying its style.
			for (let j = 0; j < hds2.length; j++) {
				hds2[j].style.display = 'none';
			}
		} else {
			// If it's not hidden, you can show it again.
			for (let j = 0; j < hds2.length; j++) {
				hds2[j].style.display = 'block'; // Or another appropriate display value
			}
		}
	}

	let semanticDocs = bucketFilesUnStructured;

	function filterDocuments2() {
		semanticDocs = bucketFilesUnStructured.filter((document) =>
			document.name.toLowerCase().includes(searchInput.toLowerCase())
		);
	}

	$: searchInput, filterDocuments2();

	//////////////////////	Data Lake search filter for Finance AI	End	//////////////////////////////////
	let docopen = true;
	
	function docopenz() {
		docopen = !docopen;
	}

	let isDragging = false;

	const handleDragOver = (event) => {
        event.preventDefault();
		isDragging = true;
    };

	const handleDragLeave = (event) => {
		event.preventDefault();
		isDragging = false;
	};


let uploadProgress = 0; // variable to keep track of the upload progress
let uploadComplete = false;
let uploadBar = false;

const handleDrop = async (event) => {
	event.preventDefault();
	
	isDragging = false;
	let files = event.dataTransfer.files;
	let folderTypez;
	let firstFileUploaded = false;
	let userID = userDetails.id;
	
	
	if (userID) {
			const { data, error } = await supabase.storage.createBucket(userID, {
				public: true
				// allowedMimeTypes: ['image/png'],
				// fileSizeLimit: 1024
			});
		}

	// Check all files before uploading
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fileExtension = file.name.split('.').pop();

        if ((searchType == 'finance-ai' && fileExtension !== 'xlsx') || 
            (searchType != 'finance-ai' && fileExtension !== 'pdf')) {
            alert ('Only ".xlsx" file are accepted in Database Search & only ".pdf" files are accepted in Semantic Search');
            return;
        }
    }



	
	


	// for (let i = 0; i < files.length; i++) {
	// 	let file = files[i];
	for (let file of files) {
		if (file) {

			// Upload files
			let selectedFileName = file.name;
			let username = userDetails.user_metadata.name;
			uploadingFile = selectedFileName;

			uploadBar = true;
			

			if(searchType == 'finance-ai'){
				folderTypez = 'structured';
			}else if(searchType == 'semantic-search'){
				folderTypez = 'unstructured';
			}

			
	

			// Wrap the emit and response handling in a new Promise
			async function uploadFile() {
				return new Promise(async (resolve, reject) => {
					// Emit the upload event
					socket.emit('upload', { folderType: folderTypez, selectedFile: selectedFileName, username: username, userid: userId });
					console.log({ folderTypez, selectedFileName, username, userId });

					$embs = '';
					$embs = 'Uploading file...';

					if (searchType !== 'finance-ai') {
						console.log('Embeddings progress is1', $embs);

						// if ($embs !== 'Started' && $embs !== "" && $embs !== 'Uploading file...') {
						// 	console.log('Embeddings progress is2', $embs);
						// 	alert('Failed to upload file. Please try again: ' + $embs);
						// 	uploadBar = false;
						// 	$embs = '';
						// 	return;

						// } else while ($embs !== 'Completed') {
						// 	// console.log('Embeddings progress i222', $embs);
						// 	await new Promise(r => setTimeout(r, 1000));
						// }

						while ($embs == 'Started' || $embs == "" || $embs == 'Uploading file...') {
							await new Promise(r => setTimeout(r, 1000));
							
							
							if ($embs == 'Completed') {
								resolve('Completed');

							} else if ($embs !== 'Started' && $embs !== "" && $embs !== 'Uploading file...' && $embs !== 'Completed') {

								console.log('Embeddings progress is2', $embs);
								alert('Failed to upload file. Please try again: ' + $embs);
								uploadBar = false;
								$embs = '';
								uploadingFile = '';
								return;
							}};




						
					}
					// Once $embs === 'Completed', resolve the Promise
					
					else if (searchType == 'finance-ai') {
						// console.log('Embeddings progress isss', $embs);
                   	 	resolve('Completed');
               		}

					else {
						alert('Failed to upload file. Please try again: ' + $embs);
						uploadBar = false;
						$embs = '';
						uploadingFile = '';
						reject('Failed');
						return;
					}
				});
			};

			const filePath = `${folderTypez}/${file.name}`;
			const { error } = await supabase.storage.from(`${userId}`).upload(filePath, file);
			

			if (error) {
				console.error(error.message);
				alert('Error uploading file: ' + error.message);
				uploadBar = false
				// $embs = '';
				return;

			} else {
				
				await uploadFile();

				console.log('File uploaded successfully');
				$embs = '';
				uploadingFile = '';
				setTimeout(() => {
				uploadProgress += 100 / files.length; // increment the upload progress
			}, 100);

			}
		}
		setTimeout(() => {
		if (uploadProgress >= 100) {
			uploadComplete = true;
			setTimeout(() => {
				uploadComplete = false;
				uploadProgress = 0;
				uploadBar = false;
				
				
				if (!firstFileUploaded) {
					setFileNameStore()


				if (searchType == 'finance-ai') {	
                goto(`/documents/finance-ai/${file.name.replace(/(\.pdf|\.xlsx)$/, '')}`);
				} else if (searchType == 'semantic-search') {
				goto(`/documents/semantic-search/${file.name.replace(/(\.pdf|\.xlsx)$/, '')}`);
				}
                firstFileUploaded = true;
				
		
           	 }
			}, 1000);
		
		}
	}, 200);
		function setFileNameStore() {
		
        if(searchType == 'finance-ai'){
            let filename = file.name.replace(/(\.pdf|\.xlsx)$/, '');
		    // sr(filename);
			filenameStore.set({filename: filename, source: 'finance-ai'});
		}
        else if(searchType == 'semantic-search'){
            let filename = file.name.replace(/(\.pdf|\.xlsx)$/, '');
		    // sfp(filename);
			filenameStore.set({filename: filename, source: 'semantic-search'});
        }
	}
	}
};




</script>

<button id="openSidebar" style="margin-top: 1em;"><img src="/images/3hvl.png" alt="" /></button>

<nav id="nav" on:mousemove={changeCursor} on:mousedown={startResize} on:mousemove={doResize} on:mouseup={stopResize} >
	{#if uploadBar}
	<div>
		<progress value={uploadProgress} max="100" class:complete={uploadComplete}></progress>
		<span>{Math.round(uploadProgress)}%</span>
		<br>
		<br>
		<span style="word-wrap: break-word;">{embsmessage}<p style="color: cornflowerblue;">{uploadingFile}</p></span>
		<!-- {#if uploadComplete}
        <p>File(s) uploaded successfully</p>
   		{/if} -->
	</div>
	<br>
	{/if}
	<ul class="ulstat" on:drop={handleDrop} on:dragover={handleDragOver} on:dragleave={handleDragLeave}>
		<li>
			<div>
				<div class="datacntn">
					<!-- <h4	class="dtlk" on:click={docopenz}>
						{#if docopen}<span>&#x25BC;</span>{:else}<span>&#x25BA;</span>{/if}<span>Data Lake</span>
					</h4> -->
					<h4	class="dtlk" >
						<span>Data Lake</span>
					</h4>
					<!-- <button
						on:click={() => {
							// uploading(), toggleShowDocuments();
							upload= !upload; docopen= !docopen;
						}}
						class="addbtn"><img src="/images/add_files.png" alt="Add Files" /></button
					> -->
				</div>
				
				{#if upload}
				<br>
					<div>
						<FileUpload {searchType} {userId} {userDetails} />
					</div>
				{/if}
				<p style="color: grey; font-size: small">Drop your files to add in this Data Lake</p>
				
			</div>
			
			<!-- {#if docs2} -->
			<!-- {#if showDocuments} -->
			<!-- {/if} -->
			<!-- {/if} -->
		</li>
		<!-- {/if} -->

		<!-----------------
			------------------------------------------------------ Finance AI ------------------------------------------------------------------------->
		<!-- {#if li} -->

		<!-- <SearchList searchType={searchType} docs={financeAiDocs}/> -->

		<!-- <li id="findb"> -->
		{#if docopen}
		{#if searchType == 'finance-ai'}
			{#if financeAiDocs}
				<SearchList {pageUrl} {searchType} docs={financeAiDocs} {userDetails} />
			{/if}
		{:else if searchType == 'semantic-search'}
			{#if semanticDocs}
				<SearchList {pageUrl} {searchType} docs={semanticDocs} {userDetails} />
			{/if}
		{/if}
		{/if}
		<div 
			on:dragover={handleDragOver} 
			on:dragleave={handleDragLeave} 
			on:drop={handleDrop} 
			class:dragging={isDragging}
			>
			{#if isDragging}
			<span class="drop-text">Drop here</span>
		  {/if}
		</div>

		<!-- </li> -->
		<!-- {/if} -->

		<div style="display:flex;flex-direction:column;margin-top:auto">
			
			<div style="display:flex;flex-direction:column;margin-top:auto;align-items:center">
				<p style="font-size: small; color: rgba(255, 255, 255, 0.7)">Powered By</p>
				<img src="/images/ics2.png" alt="ICS Logo" style="max-width: 5em; height: auto;" />
			</div>
			<li />
		</div>
	</ul>
	
</nav>


<style lang="scss">

	progress.complete {
        background-color: green;
    }

	.dragging {
		background-color: #f0f0f093;
		border: 1px dashed #303030;;
		border-radius: 5px;
		color: #303030;
		outline: 1px dashed #303030;
		width: 100%; /* adjust as needed */
		height: max-content; /* adjust as needed */
		margin: auto;
		padding: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.drop-text {
		font-size: medium;
		
	}


	.dtlk {
		display: flex;
		flex-direction: row;
		gap:0.3em;
		color:rgb(255, 255, 255);
		/*cursor: pointer;*/
		margin: 0;
	}
	.datacntn {
		display: flex;
		flex-direction: row;
		gap: 3em; 
		justify-content: space-between;
		align-items: center;
		

	}
	.addfldr {
		padding: 10px;
		margin: 10px;
		margin-left: 15px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.addbtn {
		background-color: #89898900;
		border: none;
		cursor: pointer;
	}

	.addbtn img {
		vertical-align: middle;
		width: 1.5em;
		height: auto;
		filter: invert(100%);
	}

	.fintab {
		cursor: pointer;
		line-height: 1.5em;
		font-size: 1em !important;
		font-weight: normal;
		display: flex;
		gap: 1em;
		color: rgba(255, 255, 255, 0.8) !important;
		white-space: nowrap;
		padding-left: 2em !important;
	}

	.fintab:hover,
	.fintab.active {
		color: rgb(74, 170, 226) !important;
		white-space: normal; /* Display full text on hover */
		width: auto;
	}

	#findb {
		list-style: none;
		margin: 0;
		padding: 0;
		color: #fff;
		text-decoration: none;
		font-size: 1.2rem;
		line-height: 1.5em;
		max-height: 50vh;
		overflow-y: auto;
	}

	#openSidebar {
		max-height: max-content !important;
		max-width: max-content !important;
		position: absolute;
		background-color: #ffffff00;
		border: none;
		color: #898989;
		cursor: pointer;
		display: none;
	}

	::placeholder {
		color: rgba(255, 255, 255, 0.39);
		opacity: 1; /* Firefox */
	}
	.navcontainer {
		display: grid;
		grid-template-columns: 49% 49%;
		gap: 2%;
	}
	.navbutton {
		color: rgba(255, 255, 255, 0.5);
		background-color: transparent;
		border: none;
		font-size: medium;
		font-weight: bold;
		cursor: pointer;
	}
	.statbtn {
		cursor: pointer;
		row-gap: 5%;
		display: grid;
	}
	.statbtn a {
		padding-left: 1em;
	}
	.navbutton:hover {
		color: rgba(255, 255, 255, 0.8) !important;
	}

	#nav {
		/*background: rgba(0, 0, 0, 0.2);*/
		background: #303030;
		backdrop-filter: blur(0.5);
		padding: 20px 10px;
		height: 100%;
		width: 300px;
		position: relative;
			

	}

	#nav::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 1px;
		background-image: linear-gradient(to bottom, black, white, black);
}

	#nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		height: 100%;
	
	}
	#nav ul li {
		list-style: none;
		margin: 0;
		padding: 0;
		color: #fff;
		text-decoration: none;
		font-size: 1.2rem;
		
	}
	/*#nav > ul > li{
            border-bottom:1px solid rgb(32, 44, 51);
            margin-bottom:5px;
            
        }*/
	#nav ul li a {
		color: #fff;
		text-decoration: none;
		font-size: 1.2rem;
		line-height: 1.5em;
	}

	#nav > ul > li li {
		/*border-bottom:1px solid rgb(88, 88, 88);*/
		font-size: 0.8rem !important;
	}

	.scrollable-docs {
		max-height: 40vh;
		overflow-y: auto;

	
	}

	.docsearch {
		background-color: rgba(83, 82, 82, 0);
		border: none;
		margin-left: 2em;
		margin-bottom: 1em;
		width: 15em;
		outline: none;
	}

	.docsearch2 {
		background-color: rgba(83, 82, 82, 0);
		border: none;
		margin-left: 2em;
		margin-bottom: 1em;
		width: 15em;
		outline: none;
	}

	input {
		position: sticky;
		top: 0% !important;
		background-color: rgba(83, 82, 82, 0.9);
		color: wheat;
		z-index: 1;
	}

	.listTitle {
		white-space: nowrap;
		padding-left: 2em !important;
	}

	.listTitle:hover {
		white-space: normal; /* Display full text on hover */
		width: auto;
	}

	.titledoc {
		font-size: 1em !important;
		color: rgba(255, 255, 255, 0.8) !important;
		font-weight: normal;
		display: flex;
		gap: 1em;
	}

	.titledoc:hover,
	.titledoc.active {
		color: rgb(74, 170, 226) !important;
	}
</style>
