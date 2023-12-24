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


    export let pageUrl;
    export let docs;
    export let searchType;

    // $: isTitledocActive.set(pageUrl == `documents/${searchType}/${encodeURIComponent(document.name)}/`);

	$: {
    const activeDoc = document.querySelector('.titledoc.active');
    if (activeDoc) {
      selectSearch.set(false);
	} else {
      selectSearch.set(true);
    }
  }


    let finalDocs = docs;

	let temp;

	let currentPath;

	$:currentPath = $pg?.url?.pathname;

    console.log('page url is', currentPath);
    // export let docs2;

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

    console.log('search type is', searchType);
    // 
</script>
<!-- &#128269; -->
<input class="docsearch" type="text" bind:value={searchInput} placeholder="Search..."/>
<ul class="scrollable-docs">
    {#each finalDocs as document, i}
	<!-- {#if !(searchType == 'finance-ai' && i == 0)} -->
	{#if document.name !== "" && document.name !== ".emptyFolderPlaceholder"}
        <li class="listTitle">
            <a
                href="/documents/{searchType}/{document.name}/"
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
            
        
        </li>
		{/if}
    {/each}

</ul>

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
	}

	.titledoc {
		font-size: 0.8em !important;
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