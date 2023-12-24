<script>
	import { onMount } from 'svelte';
	import { selectSearch } from '$lib/stores/global.js';
	// import { searchBoxx } from '$lib/stores/global.js';
	import { defaultBase64Img } from '$lib/constants/constants.js';
	import Ratings from './Ratings.svelte';
	// import { sfp } from '$lib/data/helpers';
	// import { sr } from '$lib/data/helpers';
	import { filenameStore } from '$lib/stores/global.js';


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

	let base64img = null;
	// let filename;
	// filenameStore.subscribe(value => { filename = value; }); // subscribe to the store

	// base64img = defaultBase64Img;
	// base64img = `data:image/png;base64,${defaultBase64Img}`;

	let response = '';
	let question = '';
	let ref = '';

	let docfilename = $filenameStore.filename;
	let srchtp = $filenameStore.source;

	let socket;
	// let plotimg = '';

	let titledoc = 'one.pdf';
	titledoc = titledoc.split('.');
	titledoc = titledoc[0];

	// onMount(async () => {
	// 	socket.on('base64img', function (data) {
	// 		base64img = `data:image/png;base64,${data.base64_img}`;
	// 		console.log('This is Plotted Image: ', base64img);
	// 	});
	// });
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
			socket = io.connect('https://icsfinblade.com:444/module1');
		} else if (srchtp == 'semantic-search') {
			// socket = io.connect('http://192.168.200.29:89/module4');
			// socket = io.connect('http://icsfinblade.com:8080/module4');
			// socket = io.connect('http://54.146.82.200:8080/module4');
			// socket = io.connect('http://172.31.55.58:8080/module4');
			socket = io.connect('https://icsfinblade.com:444/module4');
		}

		socket.on('receive_response', function (data) {
			
			base64img = `data:image/png;base64,${data.base64d}`;
			if (base64img === `data:image/png;base64,None`) {
				base64img = null;
			}
			console.log('This is Plotted Image: ', data.base64d);
			showLoadingContainer = false;
			generatingResponse = false;
			response = data.response;
			paresp = true;
			// ref = data.ref;
			ref = 'Functionality not available yet.';
			console.log('This is Response: ', response);
		});
	});

	function submitQuestion() {
		// if (question.length < 1) {
		// 	alert('Please type something.');
		// } else if (!question.trim()) {
		// 	question = '';
		// 	alert('Please avoid typing just blank spaces.');

		// } else {
		socket.emit('submit_question', { question, docfilename });
		console.log('This is Question: ', question);
		console.log('This is Filename: ', docfilename);
		console.log('This is Source: ', srchtp);
		showLoadingContainer = true;
		showContainerarrow = true;
		paresp = false;
		showresponse = true;
		generatingResponse = true;
		// }
	}

	function clearsubmitQuestion() {
		showContainerarrow = false;
		newline = false;
		showref = false;
		showresponse = false;
		generatingResponse = false;
		paresp = false;
		visual = false;

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
</script>

{#if $selectSearch}
	<div class="input-container">
		<div class="qtn">
			<input
				class="input-box"
				type="text"
				placeholder="Please select a document from the Data Lake..."
				disabled
			/>
			<button style="cursor: unset;" class="submit" />
		</div>
	</div>
<!-- {/if} -->

<!-- {#if $searchBoxx} -->
{:else}
<div class="search-box-container">
	<div class="input-container" id="question-container">
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
				class="input-box"
				type="text"
				placeholder="Talk to your documents..."
			/>
			{#if !showLoadingContainer}
				<button id="submit" class="submit" data-type="qsubmit" on:click={submitQ} />
			{:else}
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
				<div>
					<b>Response</b>
					<br />
					{#if generatingResponse}
						<p>Please wait while we generate a response for your query.....</p>
						<div class="loader-container">
							<div class="loader-line">
								<div class="loader-ball" />
							</div>
						</div>
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

<style>
	.search-box-container {
		width: 100%;
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
