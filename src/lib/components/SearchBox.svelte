<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import { selectSearch } from '$lib/stores/global.js';
	// import { searchBoxx } from '$lib/stores/global.js';
	import { defaultBase64Img } from '$lib/constants/constants.js';
	import Ratings from './Ratings.svelte';
	// import { sfp } from '$lib/data/helpers';
	// import { sr } from '$lib/data/helpers';
	import { filenameStore } from '$lib/stores/global.js';
	import { page as pg } from '$app/stores';
	import { fly } from 'svelte/transition';

	export let userDetails;

	export let searchType;

	let whichsrch = true;
	let searchMode = 'Normal Search';
	let searchModeBox = false;


	let loadURL = "/images/FinBlade_Icon.png";


	let showresponse = false;
	let showContainerarrow = false;
	let showref = false;
	let showContainerarrow2 = false;
	let showLoadingContainer = false;
	let generatingResponse = false;
	let paresp = false;
	let visual = false;
	let newline = false;
	let visualfull = false;

	let historyBox = false;
	let historyButton = true;

	let base64img = null;
	let None;
	// let filename;
	// filenameStore.subscribe(value => { filename = value; }); // subscribe to the store

	// base64img = defaultBase64Img;
	// base64img = `data:image/png;base64,${defaultBase64Img}`;
	let response = '';
	let question = '';
	let ref = '';
	// console.log('This is userDetail: ', userDetails);
	let username = userDetails.user_metadata.name;
	let userid = userDetails.id;

	let docfilename = $filenameStore.filename;
	let srchtp = $filenameStore.source;

	let searchHistory = [];

	function formatDate(date) {
		return date.toLocaleTimeString();
	}

	let socket;
	// let plotimg = '';

	let titledoc = 'one.pdf';
	titledoc = titledoc.split('.');
	titledoc = titledoc[0];

	$: currentPath = $pg?.url?.pathname;

	onMount(() => {
		if (currentPath === '/documents/semantic-search/' || currentPath === '/documents/finance-ai/') {
			$selectSearch = true;
		} else {
			$selectSearch = false;
		}
	});

	function graphPlotted() {
		showresponse = false;
		showContainerarrow = false;
		showref = false;
		showContainerarrow2 = false;
		showLoadingContainer = false;
		generatingResponse = false;
		paresp = false;
		newline = false;
		visual = true;
	}

	function pieerror() {
		visual = true;
	}
	function fullgraph() {
		visualfull = true;
	}

	function closefullgraph() {
		visualfull = false;
	}

	function showrefunc() {
		newline = true;
		showref = true;
	}

	onMount(async () => {
		if (srchtp == 'finance-ai') {
			// socket = io.connect('http://192.168.200.29:89/module1');
			// socket = io.connect('http://icsfinblade.com:8080/module1');
			// socket = io.connect('http://54.146.82.200:8080/module1');
			// socket = io.connect('http://172.31.55.58:8080/module1');
			// socket = io.connect('https://icsfinblades.com:444/module1');
			socket = io.connect('http://192.168.200.29:8080/module1');
			// socket = io.connect('http://10.20.20.62:8080/module1');
			// socket = io.connect('http://192.168.100.113:8080/module1');
		} else if (srchtp == 'semantic-search') {
			// socket = io.connect('http://192.168.200.29:89/module4');
			// socket = io.connect('http://icsfinblade.com:8080/module4');
			// socket = io.connect('http://54.146.82.200:8080/module4');
			// socket = io.connect('http://172.31.55.58:8080/module4');
			// socket = io.connect('https://icsfinblades.com:444/module4');
			socket = io.connect('http://192.168.200.29:8080/module4');
			// socket = io.connect('http://10.20.20.62:8080/module4');
			// socket = io.connect('http://192.168.100.113:8080/module4');
		}

		socket.on('receive_response', function (data) {
			if (data.base64d === null || data.base64d === 'None' || data.base64d === undefined) {
				base64img = null;
			} else {
				base64img = `data:image/png;base64,${data.base64d}`;
			}

			// console.log('This is Plotted Image: ', base64img);
			showLoadingContainer = false;
			generatingResponse = false;
			response = data.response;
			loadURL = "/images/FinBlade_Icon.png";
			searchHistory.push({ sender: 'ICS Assistant', message: response, timestamp: new Date() });
			if (base64img !== null && base64img !== undefined && base64img !== 'None') {
				searchHistory.push({
					sender: 'ICS Assistant',
					message: {
						type: 'image',
						src: base64img,
						alt: 'No Chart Available',
						style: {
							marginTop: '1em',
							marginLeft: '1em'
						}
					},
					timestamp: new Date()
				});
			}
			// searchHistory.push({ sender: 'ICS Assistant', message: response });
			paresp = true;
			// ref = data.ref;
			ref = 'Functionality not available yet.';
			// console.log('This is Response: ', response);
		});
	});

	let inputContainer = false;
	let firstInput = true;

	onMount(() => {
		setTimeout(() => {
			firstInput = false;
		}, 100);
	});

	let steps = [];

	onMount(() => {
		setTimeout(() => {
			steps.forEach((step, index) => {
				setTimeout(() => {
					step.style.opacity = 1;
				}, (index + 1) * 1000); // delay increases for each step
			});
		}, 1000);
	});

	function submitQuestion() {
		whichsrch = false;

		socket.emit('submit_question', { question, docfilename, username, userid, searchMode });
		searchHistory.push({ sender: 'You', message: question, timestamp: new Date() });

		if (inputContainer) {
			showLoadingContainer = true;
			showContainerarrow = true;
			paresp = false;
			showresponse = true;
			generatingResponse = true;
		} else {
			inputContainer = true;
			setTimeout(() => {
				showLoadingContainer = true;
				showContainerarrow = true;
				paresp = false;
				showresponse = true;
				generatingResponse = true;
			}, 1000);
		}
		searchMode = 'Normal Search';
		loadURL = "/images/FinBlade_Icon.gif";
	}

	function clearsubmitQuestion() {
		showContainerarrow = false;
		newline = false;
		showref = false;
		showresponse = false;
		generatingResponse = false;
		paresp = false;
		visual = false;
		whichsrch = true;
		searchMode = 'Normal Search';
		loadURL = "/images/FinBlade_Icon.png";

		// base64img = null;

		// question = '';
		// showSuggestion = false;
	}

	function submitQ() {
		console.log('submit clicked');
		clearsubmitQuestion();
		setTimeout(() => {
			submitQuestion();
		}, 100);
	}

	// onMount(async () => {
	// 	let submitBtn = document.getElementById('submit');
	// 	submitBtn.addEventListener('click', function (e) {
	// 		console.log("submit clicked")
	// 		clearsubmitQuestion();
	// 		setTimeout(() => {
	// 			submitQuestion();
	// 		}, 100);
	// 	});
	// });

	// Handle Enter key press for each input field
	onMount(() => {
		function handleKeyDown(event) {
			if (event.key === 'Enter') {
				clearsubmitQuestion();

				setTimeout(() => {
					submitQuestion();
				}, 100);
			}
		}

		document.body.addEventListener('keydown', handleKeyDown);

		// Return a function that will be called when the component is unmounted
		return () => {
			document.body.removeEventListener('keydown', handleKeyDown);
		};
	});

	// Gen-AI for Enterprise. Elevate your workforce with Gen-AI.

	onMount(() => {
		setTimeout(() => {
			let boxes = document.querySelectorAll('.box');
			let lines = document.querySelectorAll('.line');

			let index = 0;

			let interval = setInterval(() => {
				if (index < boxes.length) {
					boxes[index].style.opacity = 1;
					if (index < lines.length) {
						lines[index].style.opacity = 1;
					}
					index++;
				} else {
					clearInterval(interval);
				}
			}, 1000);
		}, 500);
	});

	let boz;

	onMount(() => {
		const handleClickOutside = (event) => {
			if (boz && !boz.contains(event.target)) {
				searchModeBox = false;
			}
		};

		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});

	let rotation = 0;

	function whichsrchz() {
		const container = document.getElementById('searchBoxContainer');
		rotation += 120;
		container.style.transform = `rotateX(${rotation}deg)`;
		lever.style.transform = `rotate(${rotation}deg)`;

		switch (rotation % 360) {
			case 0:
				searchMode = 'Normal Search';
				break;
			case 120:
				searchMode = 'Ensamble Search';
				break;
			case 240:
				searchMode = 'HYDE Search';
				break;
		}
	}
</script>

<!-- <div style="position: absolute; background-color:black; width: 100%; height 100%"
on:click={() => {
	searchModeBox = false;
}}
>
	fds
</div> -->

{#if $selectSearch}
	<div class="disabledQ">
		<div class="input-container" class:first={firstInput}>
			<div class="qtn">
				<input
					class="input-box"
					type="text"
					placeholder="Please select a document from the Data Lake..."
					disabled
				/>
				<button  style="cursor: unset; background-image: url({loadURL});" class="submit" />
			</div>
		</div>

		<!-- <div class="steps" bind:this={steps}>
			<p>Step 1: Select a document from the Data Lake</p>
			<p>Step 2: Ask a question</p>


		</div> -->
		<div id="container">
			<div class="box-container">
				<div class="box" id="box1">1</div>
				{#if searchType === 'semantic-search'}
					<p bind:this={steps[0]}>Choose a PDF file from your Desktop</p>
				{:else}
					<p bind:this={steps[0]}>Choose an XLSX file from your Desktop</p>
				{/if}
			</div>
			<div class="line" id="line1" />

			<div class="box-container">
				<div class="box" id="box2">2</div>
				<p bind:this={steps[1]}>Drag and drop here</p>
			</div>
			<div class="line" id="line2" />

			<div class="box-container">
				<div class="box" id="box3">3</div>
				<p bind:this={steps[2]}>Start talking to your document</p>
			</div>
			<!-- <div class="line" id="line3"></div>
		
			<div class="box-container">
				<div class="box" id="box4">4</div>
				<p bind:this={steps[3]}>Enjoy!</p>
			</div> -->
		</div>
	</div>

	<!-- {/if} -->

	<!-- {#if $searchBoxx} -->
{:else}
	<div class="search-box-container">
		{#if whichsrch && searchType === 'semantic-search'}
			<div class="searchModeItems" bind:this={boz}>
				{#if !searchModeBox}
					<span class="searchModeSpan">Using {searchMode}</span>
				{/if}
				<button
					class="searchModeButton"
					on:click={() => {
						searchModeBox = !searchModeBox;
					}}
				>
					<i class="fa fa-cog" aria-hidden="true" />
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
					/>
				</button>
			</div>

			{#if searchModeBox}
				<div
					class="whichsrch"
					in:fly={{ y: -500, duration: 1000 }}
					out:fly={{ y: -500, duration: 500 }}
				>
					<!-- <div class="srchlvr">
				<div id="searchBoxContainer">
					<span id="searchBox1" class="searchBox" >Normal Search</span>
					<span id="searchBox2" class="searchBox" >HYDE Search</span>
					<span id="searchBox3" class="searchBox" >Ensamble Search</span>
				</div>
				<div class="lever">
					<button id="lever" on:click={whichsrchz}>
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
					</button>
				</div>
			</div> -->
					<div class="searchTypeSelection">
						<label>
							<input type="radio" bind:group={searchMode} value="Normal Search" />
							Normal Search
						</label>

						<label>
							<input type="radio" bind:group={searchMode} value="HYDE Search" />
							HYDE Search
						</label>

						<label>
							<input type="radio" bind:group={searchMode} value="Ensamble Search" />
							Ensamble Search
						</label>
					</div>
				</div>
			{/if}
		{/if}
		<div class="input-container" id="question-container" class:active={inputContainer}>
			{#if showContainerarrow2}
				<div class="containerarrow2">
					<div class="horizontal-line2" />
					<div class="vertical-line2" />
					<div class="arrowhead2" />
				</div>
			{/if}

			<div class="qtn">
				<input
					id="question"
					bind:value={question}
					on:input={clearsubmitQuestion}
					autocomplete="off"
					class="input-box"
					type="text"
					placeholder="Talk to your documents..."
				/>
				{#if question.length > 50 && !showLoadingContainer}
					<div id="display" class="texta" placeholder="Search with a question..." readonly>
						{question}
					</div>
				{/if}

				
					<button id="submit" style="background-image: url({loadURL});" class="submit" data-type="qsubmit" on:click={submitQ} />
				{#if showLoadingContainer}
					<div id="loading-container">
						<div class="dot-flashing" />
					</div>
				{/if}
			</div>

			{#if showContainerarrow}
				<div class="containerarrow">
					<div class="horizontal-line" />
					<div class="vertical-line" />
					<div class="arrowhead" />
				</div>
			{/if}
		</div>
		<!-- <p style="width: 100%; text-align: center;">{searchMode}</p> -->

		{#if visual}
			<!-- <div class="vertical-line4" /> -->

			<div class="vsgraph">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="visuals"
					on:click={() => {
						fullgraph();
					}}
				>
					<!-- {#if imgnotrcvd} -->
					<!-- <div class="loaderroll">

</div> -->
					<p style="color: grey; margin: 0%;">Graph</p>
					<img
						id="recentImage"
						src={base64img}
						alt="No Chart Available"
						width="80%"
						height="auto"
						style="margin-top: 1em; margin-left: 1em"
					/>
					<!-- {/if} -->
				</div>

				<!-- 
<div class="containerlinegraph">
<div class="horizontal-line4" />
<div class="vertical-line4" />
</div>
-->
			</div>
		{/if}

		<div class="cntinr" style="position:relative">
			{#if showref}
				<div id="ref" class="ref" readonly="readonly">
					<div>
						<b>Reference</b>
						<br />
						<p style="color: grey;">{ref}</p>
						<br />
						<a style="color: blanchedalmond; font-size: small;" href="/documents/{titledoc}"
							>Open Source Document</a
						>
					</div>
				</div>
			{/if}
			{#if newline}
				<div class="containerlinemid">
					<div class="horizontal-line3" />
				</div>
			{/if}

			{#if showresponse}
				<div id="response" class="response" readonly="readonly">
					<b>Response</b>
					{#if generatingResponse}
						<p>Please wait while we generate a response for your query.....</p>
						<div class="loader-container">
							<div class="loader-line">
								<div class="loader-ball" />
							</div>
						</div>
						<br />
						<button
							class="stopsearch"
							on:click={() => {
								clearsubmitQuestion();
								question = '';
							}}>Stop Search</button
						>
					{/if}
					{#if paresp}
						<p class="paresp">{response}</p>
						<div class="suggestion">
							{#if base64img}
								<button
									class="pie"
									on:click={() => {
										graphPlotted();
									}}
									style="cursor: pointer;">Visualize Graph</button
								>
							{/if}
							<button
								class="gr"
								on:click={() => {
									showrefunc();
								}}
								style="background-color: maroon;cursor: pointer;">Get Reference</button
							>
							<!-- <button class="clr" style="background-color: maroon; cursor: pointer;" on:click={() => {clearsubmitQuestion(); question='';}}>Clear Search</button> -->
						</div>
						<Ratings />
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if visualfull}
		<div class="visualsfull">
			<img id="recentImage" class="base64imgf" src={base64img} alt="No Chart Available" />
			<button
				class="closegraphbutton"
				on:click={() => {
					closefullgraph();
				}}>Close Graph</button
			>
		</div>
	{/if}
{/if}

{#if historyBox}
	<div
		class="ovrly"
		on:click={() => {
			historyBox = false;
		}}
	/>
	<div class="historyBox" in:fly={{ x: 1000, duration: 1000 }} out:fly={{ x: 1000, duration: 500 }}>
		<div class="srchHeader">
			<h4>Search History</h4>
			<button
				class="closeHistory"
				on:click={() => {
					historyBox = false;
				}}>X</button
			>
		</div>

		{#if searchHistory.length === 0}
			<p>No search history available</p>
		{:else}
			{#each searchHistory.slice().reverse() as chat, i}
				<div class="chatmsg {chat.sender === 'You' ? 'user' : 'ai'}">
					{#if chat.message.type === 'image' && chat.message.src !== null && chat.message.src !== undefined}
						<img id="recentImage" src={chat.message.src} alt={chat.message.alt} />
					{:else}
						<p>{chat.message}</p>
					{/if}

					<span style="font-size: x-small;">{formatDate(chat.timestamp)}</span>
				</div>
			{/each}
		{/if}
	</div>
{/if}

{#if historyButton}
	<button
		class="historyButton"
		on:click={() => {
			historyBox = !historyBox;
		}}
	>
		<p>Search History</p>
	</button>
{/if}

<style>
	/* input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active  {
		transition: background-color 5000s ease-in-out 0s;
		-webkit-text-fill-color: #ffffff00 !important;
	} */

	.submit {

	cursor: pointer;
	border: none;
	align-self: center;
	width: 2em;
	height: 2em;
	z-index: 10;
	background-size: cover; 
	background-repeat: no-repeat; 
	background-position: center; 
	background-color: #33333300;
	position: absolute;
	right: 0.5em;
	top: 1em;
	}

	.searchTypeSelection {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		margin: auto;
		margin-top: 1em;
	}

	.searchTypeSelection label {
		cursor: pointer;
	}

	.searchModeButton {
		border: none;
		color: white;
		cursor: pointer;
		border-radius: 5px;
		width: max-content;
		height: max-content;
		margin: auto;
		font-size: large;
		background-color: #010e4800;
	}

	.searchModeButton:hover {
		background-color: rgb(74, 170, 226);
	}

	.searchModeSpan {
		border: none;
		color: white;
		cursor: pointer;
		border-radius: 5px;
		width: max-content;
		height: max-content;
		margin: auto;
		font-size: small;
		margin-right: 5px;
	}

	.searchModeItems {
		display: flex;
		position: absolute;
		bottom: 0;
		right: 0;
		flex-direction: row;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.8);
		width: fit-content;
		padding: 5px;
		border-radius: 10px 10px 0px 0px;
		border: 1px solid #ffffff79;
	}

	#container {
		display: flex;
		align-items: center;
		justify-content: center;
		align-items: center;
		/* background-color: #0000006b; */

		width: 95%;
		height: 50%;
		z-index: 999;
	}

	.box {
		width: 50px;
		height: 50px;
		border-radius: 20%;
		border-color: rgba(255, 255, 255, 0.363);
		border-width: 1px;
		border-style: solid;
		background: radial-gradient(circle at 50% 50%, rgb(105, 105, 105), rgb(68, 68, 68), rgb(63, 63, 63));
		/* background-color: #555555; */
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 1s;
	}

	.box-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
		padding: 0;
		position: relative;
	}

	.box-container p {
		position: absolute;
		top: 50px;
		margin: 20px;
		width: 150px;
		text-align: center;
		opacity: 0;
		font-size: smaller;
		color: gainsboro;
		transition: opacity 1s;
	}

	.line {
		width: 150px;
		height: 1px;
		background: linear-gradient(
			to right,
			rgb(83, 83, 83),
			rgba(255, 255, 255, 0.438),
			rgb(83, 83, 83)
		);
		/* background-color: white; */
		opacity: 0;
		transition: opacity 0.5s;
		animation: stepAnimation 2s forwards;
	}

	@keyframes stepAnimation {
		0% {
			width: 0;
		}
		50% {
			width: 10px;
		}
		100% {
			width: 150px;
		}
	}

	.disabledQ {
		width: 100%;
	}

	.input-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: center;
		overflow-wrap: normal;
		position: relative;
		width: 95%;
		margin-top: 10em;
		transition: margin-top 1s ease-in-out;
	}

	.input-container.active {
		margin-top: 2em;
	}

	.input-container.first {
		margin-top: 2em;
	}

	.steps {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 50%;
		opacity: 0;
		z-index: 999;
		transition: opacity 1s ease;
	}

	.qtn {
		position: relative;
		left: 0%;
		width: 50%;
	}

	.input-box {
		width: 100%;
		/* margin-bottom: 20px; */
		align-self: center;
		padding: 10px;
		border-radius: 24px;
		border: 1px solid #5f6368;
		background-color: #202124;
		font-family: Roborto, arial, sans-serif;
		font-size: 14px;
		font-weight: normal;
		overflow-wrap: normal;
		padding-right: 2em;
		white-space: pre-wrap;
		/* margin: 0 auto; */
		margin: 7px 0;
		box-shadow: none;
		color: white;
	}

	.input-box:focus {
		outline: none;
		border: 1px solid #444444;
		box-shadow: 0 0 10px #719ece;
	}

	.response {
		height: 20%;
		border: 1px solid #ffffff00;
		background-color: rgb(32, 44, 51);
		width: 50%;
		margin-top: 2em;
		margin-left: auto;
		margin-right: 2%;
		color: rgb(121, 121, 121);
		font-family: 'leelawadee-ui-semilight-normal', sans-serif;
		font-size: medium;
		font-weight: lighter;
		padding: 10px; /* Add some padding to the chat history */
		display: flex;
		flex-direction: column;
		white-space: pre-wrap;
		border-radius: 1em;
		overflow-wrap: normal;
		z-index: 6;
		opacity: 100%;
		animation: resanim 2s linear;
	}

	@keyframes resanim {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 100%;
		}
	}

	.ref {
		height: max-content;
		overflow-y: scroll;
		border: 1px solid #ffffff00;
		background-color: rgb(32, 44, 51);
		width: 30%;
		margin-top: 2.5em;
		left: 3em;
		color: rgb(121, 121, 121);
		font-family: 'leelawadee-ui-semilight-normal', sans-serif;
		font-size: medium;
		font-weight: lighter;
		/* max-height: 50%; */
		padding: 10px; /* Add some padding to the chat history */
		display: flex;
		white-space: pre-wrap;
		border-radius: 1em;
		overflow-wrap: normal;
		position: relative;
		z-index: 6;
		opacity: 100%;
		animation: refanim 1.5s linear;
	}

	@keyframes refanim {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 100%;
		}
	}

	.paresp {
		max-height: 10em;
		overflow-y: auto;
		color: white;

		padding: 0%;
		margin: 10px;

		&::-webkit-scrollbar {
			width: 10px;
			display: block;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f133;
		}

		&::-webkit-scrollbar-thumb {
			background: #d6d6d6; /* Grey color */
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #8b8b8b;
		}
	}

	.stopsearch {
		background-color: maroon;
		color: white;
		border: none;
		cursor: pointer;
		width: max-content;
		height: 2em;
		/* position: absolute; */
		left: 2em;
	}

	.stopsearch:hover {
		background-color: rgb(184, 0, 0);
	}

	.srchHeader {
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
		background-color: rgba(0, 0, 0, 0.8);
		/* padding: 0.5em; */
	}

	.closeHistory {
		background-color: white;
		border: none;
		color: black;
		cursor: pointer;
		border-radius: 5px;
		width: auto;
		height: auto;
		margin: auto;
		margin-right: 10px;
	}

	.closeHistory:hover {
		background-color: red;
		color: white;
	}
	.chatmsg {
		margin: 0.5em;
		white-space: pre-wrap;
	}

	.chatmsg p {
		margin: 0;
	}

	.chatmsg img {
		width: 100%;
		height: auto;
	}

	.user {
		background-color: grey;
		color: white;
		padding: 5px;
		width: max-content;
		max-width: 95%;
		border-radius: 5px;
		height: max-content;
	}

	.ai {
		background-color: rgb(21, 109, 209);
		color: white;
		padding: 5px;
		width: max-content;
		max-width: 95%;
		border-radius: 5px;
		height: max-content;
	}

	.historyButton {
		position: absolute;
		width: max-content;
		height: max-content;
		background-color: rgb(114, 114, 114);
		border-radius: 5px;
		color: white;
		border: none;
		cursor: pointer;
		right: 1em;
		top: 1em;
		z-index: 999;
	}

	.historyButton:hover {
		background-color: rgb(74, 170, 226);
	}

	.historyBox {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 30%;
		max-width: 30%;
		min-height: 200px;
		max-height: 100%;
		background: linear-gradient(to bottom, rgb(0, 0, 0), #363636, rgba(0, 0, 0));
		color: white;
		border: none;
		margin: auto;
		/* margin-left: 5px; */
		overflow-y: scroll;
		border-radius: 10px;
		font-family: Arial, Helvetica, sans-serif;
		font-size: small;
		text-align: left;
		padding: 0.5em;
		opacity: 1;
		z-index: 9999;

		&::-webkit-scrollbar {
			width: 10px;
			display: block;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f133;
		}

		&::-webkit-scrollbar-thumb {
			background: #d6d6d6; /* Grey color */
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #8b8b8b;
		}
	}

	.ovrly {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.6;
		z-index: 9998;
	}

	.texta {
		background-color: rgb(26, 26, 26);
		color: white;
		border: none;
		border-radius: 10px;
		padding: 0.5em;
		resize: none;
		overflow: scroll;
		opacity: 0.8;
		margin-left: 5px;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1em;
		max-height: 300px;
		text-align: left;
		z-index: 99;
	}

	.texta:focus {
		outline: none;
	}

	.search-box-container {
		width: 100%;
		position: relative;
	}

	.selectSearch {
		color: white;
		margin-top: 15%;
	}

	.closegraphbutton {
		color: white;
		background-color: rgb(184, 0, 0);
		border: none;
		cursor: pointer;
		width: max-content;
		height: 2em;
		position: absolute;
		left: 2em;
	}

	.vsgraph {
		display: flex;
		/* justify-content: center; */
		margin: auto;
		margin-left: 5%;

		/* position: absolute; */
		width: 150%;
		/* height: auto; */
		/* right: 0; */
		/* bottom: 0; */
	}

	.base64imgf {
	}

	.cntinr {
		display: flex;
		justify-content: space-between;
		bottom: 0 !important;
	}

	.loaderroll {
		border: 4px solid #535353; /* Light gray border */
		border-top: 4px solid #ff0000; /* Blue border */
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 2s linear infinite; /* Spin animation */
		margin: 0 auto; /* Center the loader */
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.visualsfull {
		background: #00000091;
		top: 0;
		left: 0;
		width: 200%;
		position: fixed;
		z-index: 999999;
		/* justify-content: center; */
		/* align-items: center; */
	}

	.base64imgf {
		margin: auto;
		width: 50%;
		height: 99vh;
	}

	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loader-line {
		width: 150px;
		height: 4px;
		background-color: #666666;
		position: relative;
	}

	.loader-ball {
		width: 20px;
		height: 20px;
		top: -0.5em;
		left: 1em;
		background-color: #010e48;
		border-radius: 50%;
		position: absolute;
		animation: moveRight 3s linear infinite; /* Move right animation */
	}

	@keyframes moveRight {
		0% {
			left: 0;
		}
		50% {
			left: 100%;
		}
		100% {
			left: 0;
		}
	}

	@keyframes moveLeft {
		0% {
			left: 100%;
		}
		50% {
			left: 0;
		}
		100% {
			left: 100%;
		}
	}

	@keyframes lineAnimation {
		0% {
			width: 0;
		}

		100% {
			width: 50px;
		}
	}

	@keyframes lineAnimation2 {
		0% {
			width: 0;
			right: 0;
		}
		100% {
			width: 50px;
			right: 0;
		}
	}

	@keyframes verticalLineAnimation {
		0% {
			height: 0;
			top: 0;
		}
		50% {
			height: 0px;
			top: 0;
		}
		100% {
			height: 100px;
			top: 0;
		}
	}

	@keyframes verticalLineAnimation2 {
		0% {
			height: 0;
			top: 0;
		}
		50% {
			height: 0px;
			top: 0;
		}
		100% {
			height: 150px;
			top: 0;
		}
	}

	@keyframes arrowheadAnimation {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}

	.containerarrow {
		position: relative;
		margin-top: 2em;
		left: -5px;
		width: 50px;
		height: 50px;
	}

	.containerarrow2 {
		position: relative;
		margin-top: 2em;
		right: -5px;
		width: 50px;
		height: 50px;
	}

	.containerlinemid {
		position: relative;
		flex-grow: 1;
		height: 50px;
		top: 6em;
		z-index: 5;
	}

	.horizontal-line3 {
		position: relative;
		height: 2px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: lineAnimation3 1.5s linear;
	}

	.vertical-line4 {
		position: absolute;
		width: 2px;
		height: 15%;
		right: 30%;
		bottom: 20%;

		background-color: rgba(255, 255, 255, 0.6);
		animation: verticalLineAnimation4 2s linear;
	}

	@keyframes verticalLineAnimation4 {
		0% {
			height: 0%;
		}
		100% {
			height: 40%;
		}
	}

	@keyframes lineAnimation3 {
		0% {
			width: 0%;
			left: 100%;
		}
		100% {
			width: 100%;
			left: 0;
		}
	}

	.horizontal-line {
		position: absolute;
		width: 50px;
		left: 10px;
		height: 2px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: lineAnimation 1s linear;
	}

	.vertical-line {
		position: absolute;
		width: 2px;
		height: 100px;
		top: 0;
		left: 60px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: verticalLineAnimation 2s linear;
	}

	.horizontal-line2 {
		position: absolute;
		width: 50px;
		height: 2px;
		right: 0px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: lineAnimation2 0.5s linear;
	}

	.vertical-line2 {
		position: absolute;
		width: 2px;
		height: 150px;
		top: 0;
		right: 50px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: verticalLineAnimation2 1s linear;
	}

	.whichsrch {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 35%;
		right: 35%;
		background-color: rgba(0, 0, 0, 0.8);
		width: max-content;
		height: max-content;
		border-radius: 0 0 20px 20px;
		border: 1px solid rgba(255, 255, 255, 0.4);
		padding: 1% 2%;
		z-index: 999;
	}

	.srchlvr {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		/* height: 100vh; */
	}

	.lever {
		transform: scale(0.6);
		/* margin: auto; */
	}

	#searchBoxContainer {
		perspective: 1000px;

		transform-style: preserve-3d;
		transition: transform 1s;
		height: 30px;
		width: 130px;
		/* margin: auto; */
		justify-content: center;
		align-items: center;
	}

	.searchBox {
		position: absolute;
		font-size: smaller;
		padding: 5px;
		margin: auto;
		width: 130px;
		height: 40px;
		line-height: 30px;
		border: none;
		color: white;
		text-align: center;
		background-color: #0b1d3fee;
		border: 1px solid #808080;
	}

	#searchBox1 {
		transform: rotateX(0deg) translateZ(45px);
	}

	#searchBox2 {
		transform: rotateX(120deg) translateZ(45px);
	}

	#searchBox3 {
		transform: rotateX(240deg) translateZ(45px);
	}

	#lever {
		display: block;
		margin: 20px auto;
		transition: transform 1s;
		height: 80px;
		width: 80px;
		border-radius: 50%;
		border: 16px solid #ad753d; /* Dark brown color for the wheel */
		box-sizing: border-box;
		position: relative;
		cursor: grabbing;
		background: radial-gradient(circle, #ad753d 35%, transparent 40%, #ad753d 40%);
	}

	#lever span:nth-child(n)::before {
		content: '';
		position: absolute;
		height: 30px;
		width: 2px;
		background: #ad753d;
		top: 50%;
		left: 50%;
		transform-origin: 50% 0;
	}

	#lever span:nth-child(1)::before {
		transform: rotate(0deg) translate(0, -50px);
	}
	#lever span:nth-child(2)::before {
		transform: rotate(45deg) translate(0, -50px);
	}
	#lever span:nth-child(3)::before {
		transform: rotate(90deg) translate(0, -50px);
	}
	#lever span:nth-child(4)::before {
		transform: rotate(135deg) translate(0, -50px);
	}
	#lever span:nth-child(5)::before {
		transform: rotate(180deg) translate(0, -50px);
	}
	#lever span:nth-child(6)::before {
		transform: rotate(225deg) translate(0, -50px);
	}
	#lever span:nth-child(7)::before {
		transform: rotate(270deg) translate(0, -50px);
	}
	#lever span:nth-child(8)::before {
		transform: rotate(315deg) translate(0, -50px);
	}

	/*.arrowhead2 {
		position: absolute;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 30px solid white;
		top: 100px;
		right: 86px;
		animation: arrowheadAnimation 2s linear;
        display: none;
	}

	.arrowhead {
		position: absolute;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 30px solid white;
		top: 50px;
		left: 46px;
		animation: arrowheadAnimation 2s linear;
        display: none;
	}*/
</style>
