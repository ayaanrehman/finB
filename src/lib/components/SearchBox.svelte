<script>
	import { onMount } from 'svelte';

	let showresponse = false;
	let showContainerarrow = false;
	let showref = false;
	let showContainerarrow2 = false;
    let showLoadingContainer = false;

    let response = ' ';
    let question = '';
	let ref = ' ';

	function pieerror() {
		let piebtn = document.querySelector('.pie');
		piebtn.addEventListener('click', function () {
			setTimeout(() => {
				alert('No pie-chart available.');
			}, 1000);
		});
	}

	function showrefunc() {
		let refBtn = document.querySelector('.gr');
		refBtn.addEventListener('click', function () {
			showContainerarrow2 = true;
			setTimeout(() => {
				showref = true;
			}, 1000);
		});
	}


    onMount(async() => {
        socket.on('receive_response', function (data) {
            showLoadingContainer = false;  
            response = data.response;
			ref = data.ref;
            showContainerarrow = true;
            setTimeout(() => {
				showresponse = true; 
                setTimeout(() => {
                    showrefunc();
					pieerror();
                }, 1100);
			}, 1000);
                
	    });
    });
    
           
    

 
	

	function submitQuestion() {
		// let questionInput = document.getElementById('question');
		// let question = questionInput.value.trim();
		let sugg = document.querySelector('.suggestion');

		if (question.length < 1) {
			alert('Please type something.');
			// Clear the input field
			question = '';
		} else {
			socket.emit('submit_question', { question });
            showLoadingContainer = true;
		}
	}

	function clearsubmitQuestion() {
		
        showContainerarrow = false;
        showContainerarrow2 = false;
        showref = false;
        showresponse = false;
        // question = '';
        // showSuggestion = false;
	}

	onMount(async () => {
        let submitBtn = document.getElementById('submit');
        submitBtn.addEventListener('click', function(e){
					clearsubmitQuestion();
            setTimeout(() => {
                submitQuestion();
                // setTimeout(() => {
                //     showrefunc();
				// 	pieerror();
                // }, 1100);
				
				}, 100);
        });
	
	});

	// Handle Enter key press for each input field
	onMount(async () => {
		document.body.addEventListener('keydown', function (event) {
			if (event.key === 'Enter') {
                clearsubmitQuestion();
				
				setTimeout(() => {
                    submitQuestion();
                //     setTimeout(() => {
                //     showrefunc();
				// 	pieerror();
                // }, 1100);
				}, 100);
			}
		});
	});
</script>

<div class="input-container" id="question-container">
	{#if showContainerarrow2}
		<div class="containerarrow2">
			<div class="horizontal-line2" />
			<div class="vertical-line2" />
			<div class="arrowhead2" />
		</div>
	{/if}
	<div class="qtn">
		<input id="question" bind:value={question} class="input-box" type="text" placeholder="Talk to your documents..." />
        {#if !showLoadingContainer}
		<button id="submit" class="submit" data-type="qsubmit" />
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
<div class="cntinr" style="position:relative">
	{#if showref}
		<div id="ref" class="ref" readonly="readonly">
			<div>
				<b>Reference</b>
				<br />
				<p>{ref}</p>
			</div>
		</div>
	{/if}
	{#if showresponse}
		<div id="response" class="response" readonly="readonly">
			<div>
				<b>Response</b>
				<br />
				<p class="paresp">{response}</p>
			</div>
		</div>
		<div class="suggestion">
			<button class="pie" style="cursor: pointer;">Plot a pie-chart</button>
			<button class="gr" style="background-color: maroon;cursor: pointer;">Get Reference</button>
			<!-- <button class="clr" style="background-color: maroon; cursor: pointer;" on:click={() => {clearsubmitQuestion(); question='';}}>Clear Search</button> -->
		</div>
	{/if}


</div>

<style>
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
			width: 100px;
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
			height: 50px;
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
			height: 100px;
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
		width: 50px;
		height: 50px;
	}

	.containerarrow2 {
		position: relative;
		margin-top: 2em;
		width: 50px;
		height: 50px;
	}

	.horizontal-line {
		position: absolute;
		width: 50px;
		left: 10px;
		height: 2px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: lineAnimation 0.5s linear;
	}

	.vertical-line {
		position: absolute;
		width: 2px;
		height: 100px;
		top: 0;
		left: 60px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: verticalLineAnimation 1s linear;
	}

	.horizontal-line2 {
		position: absolute;
		width: 100px;
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
		right: 100px;
		background-color: rgba(255, 255, 255, 0.6);
		animation: verticalLineAnimation2 1s linear;
	}

	.arrowhead2 {
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
	}
</style>
