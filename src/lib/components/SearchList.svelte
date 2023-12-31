<script>
    // import { onMount } from 'svelte';
	import { selectSearch } from '$lib/stores/global.js';
	// import { searchBoxx } from '$lib/stores/global.js';
	// import { sr } from '$lib/data/helpers';
	// import { srn } from '$lib/data/helpers';
	// import { sfp } from '$lib/data/helpers';
	import { filenameStore } from '$lib/stores/global.js';
	// import { temp } from '$lib/data/helpers';
	import { page  as pg }  from '$app/stores';
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';



	export let userDetails;
    export let pageUrl;
    export let docs;
    export let searchType;

    // $: isTitledocActive.set(pageUrl == `documents/${searchType}/${encodeURIComponent(document.name)}/`);

	$: {
    const activeDoc = document.querySelector('.titledoc.active');
    if (activeDoc) {
    //   selectSearch.set(false);
	$selectSearch = false;
	} else {
    //   selectSearch.set(true);
	$selectSearch = true;
    }
  }

  	let userID = userDetails.id;

    let finalDocs = docs;

	let temp;

	let currentPath;

	$:currentPath = $pg?.url?.pathname;

    // console.log('page url is', currentPath);
    // export let docs2;

	const downloadFile = async () => {
		const { data, error } = await supabase
		.storage
		.from(userID)
		.download(`${searchType == 'finance-ai' ? 'structured' : 'unstructured'}/${$filenameStore.filename}.${searchType == 'finance-ai' ? 'xlsx' : 'pdf'}`);
		// console.log('data in downloadFile is', data);
		// console.log('error in downloadFile is', error);
		// console.log('filenameStore.filename is', $filenameStore.filename);
		// console.log('userID is', userID);
		// console.log('searchType is', `${searchType == 'finance-ai' ? 'structured' : 'unstructured'}`);

		const url = URL.createObjectURL(data);
			// Create a link element
			const link = document.createElement('a');
			link.href = url;
			link.download = `${$filenameStore.filename}.${searchType == 'finance-ai' ? 'xlsx' : 'pdf'}`;
			// Append the link to the body
			document.body.appendChild(link);
			// Click the link to start the download
			link.click();
			// Clean-up by removing the link
			document.body.removeChild(link);
	};

	const deleteFile = async () => {
		const { data, error } = await supabase
		.storage
		.from(userID)
		.remove([`${searchType == 'finance-ai' ? 'structured' : 'unstructured'}/${$filenameStore.filename}.${searchType == 'finance-ai' ? 'xlsx' : 'pdf'}`])
		console.log('data in deleteFile is', data);
		console.log('error in deleteFile is', error);
		console.log('filenameStore.filename is', $filenameStore.filename);
		console.log('userID is', userID);
		console.log('searchType is', `${searchType == 'finance-ai' ? 'structured' : 'unstructured'}`);
			if (error) {
				console.error('Error in deleteFile:', error);
				// Inform the user that the file deletion failed
				alert('Failed to delete file');
			} else {
				console.log('Data in deleteFile:', data);
				// Inform the user that the file has been deleted
				alert('File deleted successfully');
				// Update your application state as needed
			}
			if (searchType == 'finance-ai') {
				// window.location.href = '/documents/finance-ai/';
				goto('/documents/finance-ai/');
				
			} else  {
				// window.location.href = '/documents/semantic-search/';
				goto('/documents/semantic-search/');

			}
	
	};


    let searchInput = '';
	function filterDocuments() {
        if(searchInput !== ''){
                finalDocs = docs.filter((document) =>
                document.name.toLowerCase().includes(searchInput.toLowerCase())
		    );
        }else{
            finalDocs = docs;
        }
	}

    $: searchInput, filterDocuments();
    function submitStructure(e) {
		
	}

    function submitFileName(e) {
		
        if(searchType == 'finance-ai'){
            let filename = e.target.dataset.docName;
		    // sr(filename);
			filenameStore.set({filename: filename, source: 'finance-ai'});
		}
        else if(searchType == 'semantic-search'){
            let filename = e.target.dataset.docName;
		    // sfp(filename);
			filenameStore.set({filename: filename, source: 'semantic-search'});
        }
	}



    // console.log('search type is', searchType);
    // 
</script>
<!-- &#128269; -->
<input class="docsearch" type="text" bind:value={searchInput} placeholder="Search..."/>
<ul class="scrollable-docs">
    {#each finalDocs as document, i}
	<!-- {#if !(searchType == 'finance-ai' && i == 0)} -->
	{#if document.name !== "" && document.name !== ".emptyFolderPlaceholder"}
        <li class="listTitle">
			<div class="fileandbtn">
            <a
                href="/documents/{searchType}/{document.name.replace(/\+/g, '%2B')}/"
                data-doc-name={document.name}
                
                class="titledoc" class:active={pageUrl == `/documents/${searchType}/${encodeURIComponent(document.name)}/`}
                
                on:click={(e) => {
                    submitFileName(e), temp(0.7);
                    // $searchBoxx = true;
                    
                }}
            >
                <span>&#128462;</span><span style="pointer-events: none;">{document.name}</span
                ></a
            >
			{#if pageUrl == `/documents/${searchType}/${encodeURIComponent(document.name)}/`}
				<div class="fileconfig">
					<button title="Download" class="dwnfile" on:click={() => downloadFile(document.name)}>&#x21E9;</button>
					<button title="Delete" class="delfile" on:click={() => {
						if (confirm('Are you sure you want to delete this file?')) {
							deleteFile(document.name)}
							}}>&#x1F5D1;</button>
				</div>
				
			{/if}
		</div>
		</li>
		{/if}
    {/each}

</ul>

<style lang="scss">

	.fileandbtn {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.fileconfig {
		display: flex;
		justify-content: end;
		gap: 5px;
		
	}

	.delfile, .dwnfile {
		background-color: #89898900;
		border: none;
		cursor: pointer;
		color: #898989;
		border-radius: 5px;
		padding: 2px 10px;
		width: max-content;
		font-size: large;
		font-weight: bold;
	}

	.delfile:hover {
		background-color: #ff0000;
		color: white;
	}

	.dwnfile:hover {
		background-color: #0077ff;
		color: rgb(255, 255, 255);
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
        padding-left: 20px !important;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.docsearch {
		background-color: rgba(83, 82, 82, 0);
		border: none;
		margin-left: 1em;
		margin-bottom: 1em;
		width: 15em;
		outline: none;
	}

	.docsearch::placeholder {
		color: rgb(184, 184, 184)	}

	.docsearch2 {
		background-color: rgba(83, 82, 82, 0);
		border: none;
		margin-left: 1em;
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
		
		
		
	}

	.listTitle:hover {
		white-space: normal; /* Display full text on hover */
		width: auto;
		word-wrap: break-word;
	}

	.titledoc {
		font-size: 0.8em !important;
		color: rgba(255, 255, 255, 0.8) !important;
		font-weight: normal;
		display: flex;
		gap: 1em;
		word-break: break-all;
	}

	.titledoc:hover,
	.titledoc.active {
		color: rgb(74, 170, 226) !important;
		white-space: normal; /* Display full text on hover */
		width: auto;
	}
</style>