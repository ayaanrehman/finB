<script>
	// import documents from '$lib/data/documents.json';
	// import output from 'C:/Users/Ayan-PC/Downloads/chat_assistant_10/chat_assistant_10/output.json';
	import { onMount } from 'svelte';
	import { selectSearch } from '$lib/stores/global.js';
	import { searchBoxx } from '$lib/stores/global.js';
	import { sr } from '$lib/data/helpers';
	import { srn } from '$lib/data/helpers';
	import { sfp } from '$lib/data/helpers';
	import { temp } from '$lib/data/helpers';
	// import Layout fr/om '../../routes/+layout.svelte';
	import FileUpload from './FileUpload.svelte';
	import { createFolder } from '../data/AddFolder';
	import { listFolder } from '../data/listFolders';
	import { lisFolder } from '$lib/stores/global.js';
	

	// export let data;
	// export let data2;

	export let pageUrl;
	export let bucketFiles;
	export let bucketFilesUnStructured;
	export let userId;
	export let searchType;


	console.log('search type is', searchType);


	

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

	function submitStructure(e) {
		let filename = e.target.dataset.docName;
		sr(filename);
	}

	function submitFileName(e) {
		let filename = e.target.dataset.docName;
		sfp(filename);
	}

	function toggleShowDocuments() {
		showDocuments = !showDocuments;
		hideDocSearch();
	}

	function toggleShowDocuments2() {
		showDocuments2 = !showDocuments2;
		hideDocSearch2();
	}

	function toggleDataLake() {
		li2 = true;
		li = false;

		folderType = 'unstructured';
		dataType = 'unstructured';
		$lisFolder = 'unstructured';

		$selectSearch = false;
		$searchBoxx = true;

		searchInput = '';
		searchInput2 = '';

		const navID = document.getElementById('symbtn');
		if (navID) {
			navID.style.borderBottom = 'none';
			navID.style.color = 'rgba(255, 255, 255, 0.7)';
		}
		const navID2 = document.getElementById('finbtn');
		if (navID2) {
			navID2.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
			navID2.style.color = 'rgba(255, 255, 255)';
		}
	}

	function toggleDataLake2() {
		li2 = false;
		li = true;

		folderType = 'structured';
		dataType = 'structured';
		$lisFolder = 'structured';

		$selectSearch = true;
		$searchBoxx = false;

		searchInput = '';
		searchInput2 = '';

		const navID = document.getElementById('finbtn');
		if (navID) {
			navID.style.borderBottom = 'none';
			navID.style.color = 'rgba(255, 255, 255, 0.7)';
		}
		const navID2 = document.getElementById('symbtn');
		if (navID2) {
			navID2.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
			navID2.style.color = 'rgba(255, 255, 255)';
		}
	}

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

	let docs = bucketFiles;

	function filterDocuments() {
		docs = bucketFiles.filter((document) =>
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

	let docs2 = bucketFilesUnStructured;

	function filterDocuments2() {
		docs2 = bucketFilesUnStructured.filter((document) =>
			document.name.toLowerCase().includes(searchInput.toLowerCase())
		);
	}

	$: searchInput, filterDocuments2();

	//////////////////////	Data Lake search filter for Finance AI	End	//////////////////////////////////
</script>

<button id="openSidebar" style="margin-top: 1em;"><img src="/images/3hvl.png" alt="" /></button>

<nav id="nav">
	<ul class="ulstat">
		<div class="navcontainer">
			<!-- <button
				class="navbutton"
				id="symbtn"
				on:click={() => {
					toggleDataLake2();
					temp(0.1);
				}}>Finance AI</button
			>
			<button
				class="navbutton"
				id="finbtn"
				on:click={() => {
					srn();
					temp(0.4);
					toggleDataLake();
				}}>Symantec Search</button
			> -->
			<br />
		</div>
		{#if li2}
			<li>
				<div>
					<a
						on:click={toggleShowDocuments}
						class:active={showDocuments}
						style="cursor: pointer; color: rgba(255, 255, 255, 0.8); font-size: smaller; font-weight: bold;"
					>
						<span style="font-size: normal; color: #545b64;"
							>{#if showDocuments}&#11206;{:else}&#11208;{/if}</span
						> Data Lake</a
					>
					<button
						on:click={() => {
							uploading(), toggleShowDocuments();
						}}
						class="addbtn"><img src="/images/add_files.png" alt="Add Files" /></button
					>

					<button class="addbtn" on:click={uploadFldr}
						><img src="/images/add_folders.png" alt="Add Folders" /></button
					>
					{#if uploadFolder}
						<br />
						<input
							style="margin-left: 20px;"
							bind:value={newFolderName}
							placeholder="New Folder Name"
						/>
						<button class="addfldr" on:click={handleCreateFolder}>Add Folder</button>
						<p id="messagefoldr" />
					{/if}
					{#if upload}
						<div>
							<FileUpload {folderType} {userId} />
						</div>
					{/if}
					<br />
					<input
						class="docsearch"
						type="text"
						bind:value={searchInput}
						placeholder="&#128269; Search..."
					/>
				</div>

				{#if docs2}
					{#if showDocuments}
						<ul class="scrollable-docs">
							{#each docs2 as document, i}
								<li class="listTitle">
									<a
										href="/documents/symantec-search/{document.name}"
										data-doc-name={document.name}
										class="titledoc"
										class:active={pageUrl == '/documents/symantec-search/' + encodeURIComponent(document.name) + '/'}
										on:click={(e) => {
											submitFileName(e), temp(0.4);
											$searchBoxx = true;
											$selectSearch = false;
										}}
									>
										<span>&#128462;</span><span style="pointer-events: none;">{document.name}</span
										></a
									>
									
								
								</li>
							{/each}
							<!-- {#each foldersz as folder (folder.id)}
							<div>{folder.name}</div>
							{/each} -->
						</ul>
					{/if}
				{/if}
			</li>
		{/if}

		<!----------------------------------------------------------------------- Finance AI ------------------------------------------------------------------------->
		{#if li}
			<li id="findb">
				<div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<a
						on:click={toggleShowDocuments2}
						class:active={showDocuments2}
						style="cursor: pointer; color: rgba(255, 255, 255, 0.8); font-size: smaller; font-weight: bold;"
					>
						<span style="font-size: normal; color: #545b64;"
							>{#if showDocuments2}&#11206;{:else}&#11208;{/if}</span
						> Data Lake</a
					>
					<button
						on:click={() => {
							uploading(), toggleShowDocuments2();
						}}
						class="addbtn"><img src="/images/add_files.png" alt="Add Files" /></button
					>
					<button class="addbtn" on:click={uploadFldr}
						><img src="/images/add_folders.png" alt="Add Folders" /></button
					>
					{#if uploadFolder}
						<br />
						<input
							style="margin-left: 20px;"
							bind:value={newFolderName}
							placeholder="New Folder Name"
						/>
						<button class="addfldr" on:click={handleCreateFolder}>Add Folder</button>
					{/if}
					{#if upload}
						<div>
							<FileUpload {folderType}  {userId}/>
						</div>
					{/if}
					<br />
					<input
						class="docsearch2"
						type="text"
						bind:value={searchInput2}
						placeholder="&#128269; Search..."
					/>
				</div>

				{#if docs}
					{#if showDocuments2}
						<!-- {listTables} -->
						{#if docs.length > 0}
							<ul>
								{#each docs as document, i}
									<a href="/documents/symantec-search/{document.name}">
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<li
											class="fintab"
											data-doc-name={document.name}
											class:active={pageUrl ==
												'/documents/symantec-search/' + encodeURIComponent(document.name) + '/'}
											on:click={(e) => {
												submitStructure(e), temp(0.0);
												$searchBoxx = true;
												$selectSearch = false;
											}}
										>
											<span>&#128462;</span><span style="pointer-events: none;"
												>{document.name}</span
											>
										</li></a
									>
								{/each}
								<!-- {#each foldersz as folder (folder.id)}
								<div>{folder.name}</div>
								{/each} -->
							</ul>
						{:else}
							<p>No tables available.</p>
						{/if}
					{/if}
				{/if}
			</li>
		{/if}

		<div style="display:flex;flex-direction:column;margin-top:auto">
			<div class="statbtn">
			

				<!-- <li style="border-top: 0.5px solid rgba(255, 255, 255, 0.4); padding-top: 5%">
					<a href="/ ">Home</a>
				</li>
				<li><a href="/ ">API Access</a></li>
				<li><a href="/">Support</a></li>
				<li style="padding-bottom: 5%">
					<a href="/">About Us</a>
					
				</li> -->
			</div>
			<br />
			<br />
			<div style="display:flex;flex-direction:column;margin-top:auto;align-items:center">
				<p style="font-size: small; color: rgba(255, 255, 255, 0.7)">Powered By</p>
				<img src="/images/ics2.png" alt="ICS Logo" style="max-width: 5em; height: auto;" />
			</div>
			<li />
		</div>
	</ul>
</nav>

<style lang="scss">


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
		background: #22222286;
		backdrop-filter: blur(0.5);
		padding: 20px 10px;
		height: 100%;
	}

	#nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 10px;
	}
	#nav ul li {
		list-style: none;
		margin: 0;
		padding: 0;
		color: #fff;
		text-decoration: none;
		font-size: 1.2rem;
		line-height: 1.5em;
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
