<script>
	import { onMount } from 'svelte';
	import io from 'socket.io-client';


	let question = '';
	let messages = [];
	let socket;
	let response = '';
	let chatquestion = '';
	let loadanim = false;
	let chatHistory;
	let stylevar = 'None';
	let inputBox;

	let typing = false;

	let loadURL = "/images/FinBlade_Icon.png";

	onMount(() => {
    inputBox.focus();
  });

	onMount(async () => {
		// socket = io.connect('https://54.146.82.200:8080/module3');
		// socket = io.connect('http://172.31.55.58:8080/module3');
		// socket = io.connect('https://icsfinblades.com:444/module3');
		// socket = io.connect('http://192.168.200.29:8080/module3');
		// socket = io.connect('http://192.168.100.113:8080/module3');
		socket = io.connect('https://icsfinblade.com:444/module3');
		socket.on('chat_response', function (data) {
			response = data.answer;
			// console.log('This is Response: ', response);
			messages = messages.filter(message => !message.typing);
			messages = [...messages, { text: response, sender: 'server', timestamp: new Date() }];
			// loadanim = false;
			loadURL = "/images/FinBlade_Icon.png";
			setTimeout(() => {
				scrollToBottom();
			}, 100);
			typing = false;
				
			
		});
	});

	

	function formatDate(date) {
		return date.toLocaleTimeString();
	}

	function scrollToBottom() {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

	function scrollToTop() {
        chatHistory.scrollTop = 0;
    }


	function submitQuestion() {
		if (chatquestion.trim() !== '') {
			messages = [...messages, { text: chatquestion, sender: 'client', timestamp: new Date() }];
			messages = [...messages, { text: '', sender: 'server', timestamp: new Date(), typing: true }];
			socket.emit('chatgpt_question', { question: chatquestion, stylevar: stylevar });
			typing = true;
			// loadanim = true;
			loadURL = "/images/FinBlade_Icon.gif";
			setTimeout(() => {
				scrollToBottom();
				chatquestion = '';
				//focus on input box
				const inputBox = document.querySelector('.input-box1');
				inputBox.focus();
			}, 100);
		}
		console.log(stylevar)
	};


	onMount(async () => {
		
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

</script>

<div class="chat1">
	<!-- <h3 style="color: white;">Enterprise AI Chat with GuardRails</h3> -->
	<div class="chat-gpt-container">
		<div id="chat-history1" class="chat-history1"  readonly="readyonly">
			<div class="message placeholder" bind:this={chatHistory}>
		

			
				{#if messages.length === 0}
					<div class="chatting">
						<!-- <b>Welcome! Start writing a question...</b> -->
						<!-- <p>Ask questions like:</p>
						<i>"Brainstorm incentives for a customer loyalty program in a small bookstore"</i>
						<i>"Suggest some codenames for a project introducing flexible work arrangements"</i>
						<i>"Help me pick a birthday gift for my sister who likes gardening"</i> -->
						<div id="container">
							<div class="box-container">
								<div class="box" id="box1">1</div>
						
									<p bind:this={steps[0]}>Ask anything in the Input Box</p>
							
							</div>
							<div class="line" id="line1" />
				
							<div class="box-container">
								<div class="box" id="box2">2</div>
								<p bind:this={steps[1]}>Let Secure-GPT reply to your query in Secure Way</p>
							</div>
							<div class="line" id="line2" />
				
							<div class="box-container">
								<div class="box" id="box3">3</div>
								<p bind:this={steps[2]}>Use helpers on the right for formatting your letters</p>
							</div>
						</div>

					</div>
				{:else}
					{#each messages as message (message.text)}
						<div class="message {message.sender}">
							<p>{message.text}</p>
							{#if message.typing}
								<div class="typing-indicator">
									<span></span>
									<span></span>
									<span></span>
								</div>
							{/if}
							<span style="font-size: x-small;">{formatDate(message.timestamp)}</span>
						</div>
					{/each}
				
				{/if}
			</div>
			<button id="scroll-to-top1" on:click={scrollToTop}>&#9650;</button>
			<button id="scroll-to-bottom1" on:click={scrollToBottom}>&#9660;</button>

			<form on:submit={() => {
				stylevar='None', 
				submitQuestion()
				
			}}>
				<div class="input-container1">
					<div class="qtnn">
						<input
							class="input-box1"
							type="text"
							bind:value={chatquestion}
							bind:this={inputBox}
							placeholder="Enter your question to Secure-GPT"
						/>
						<button
							class="submit2"
							style="background-image: url({loadURL});"
							on:click|preventDefault={() => {
								stylevar='None', 
								submitQuestion()
								
							}}
							type="submit"
						>
							<!-- {#if loadanim}
								<div id="loading-container2">
									<div class="dot-flashing2" />
								</div>
							{/if} -->
						</button>
					</div>

					<button id="clear-chat-button" class="clear-button">X</button>
				</div>
			</form>
		</div>
		<div class="chat-helpers">
			<div>
				<button on:click={() => {
					stylevar='style1', 
					submitQuestion()
					
				}}
				>Rephrase this statement in Corporate Format</button>
			</div>
			<div>
				<button>Translate this sentence</button>
			</div>
			<div>
				<button>Suggest synonyms for this phrase</button>
			</div>
		</div>
	</div>
</div>

<!-- <button
	on:click={(e) => {
		question = '';
	}}
/> -->

<style lang="scss">
	
	@import url('https://fonts.cdnfonts.com/css/leelawadee');

	.transparent {
		background-image: none !important;
		cursor: default;
	}

	#container {
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;
		align-items: center;
		/* background-color: #0000006b; */
		
		width: 100%;
		height: 100%;
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
		// position: absolute;
		top: 50px;
		
		margin: 20px;
		margin-top: 10px !important;
		width: 150px;
		text-align: center;
		opacity: 0;
		font-size: smaller;
		color: gainsboro;
		transition: opacity 1s;
	}

	.line {
		position: relative;
		width: 150px;
		height: 1px;
		top: -20px;
		
		background: linear-gradient(
			to right,
			rgb(17, 17, 17),
			rgba(255, 255, 255, 0.438),
			rgb(17, 17, 17)
		);
		/* background-color: white; */
		opacity: 0;
		transition: opacity 1s;
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

	.typing-indicator {
		display: inline-block;
		position: relative;
		width: 40px;
		height: 20px;
	}

	.typing-indicator span {
		position: absolute;
		top: 0;
		width: 6px;
		height: 6px;
		margin: 0 1px;
		background: #292929;
		border-radius: 50%;
		animation: typing-indicator 1.4s infinite;
		animation-fill-mode: both;
	}

	.typing-indicator span:nth-child(1) {
		left: 6px;
		top: 5px;
		animation-delay: 0.2s;
	}

	.typing-indicator span:nth-child(2) {
		left: 18px;
		top: 5px;
		animation-delay: 0.4s;
	}

	.typing-indicator span:nth-child(3) {
		left: 30px;
		top: 5px;
		animation-delay: 0.6s;
	}

	@keyframes typing-indicator {
		0% { transform: scale(1); }
		20% { transform: scale(1, 2.2); }
		40% { transform: scale(1); }
	}

	.message {
		margin: 0;
	}

	.chat-gpt-container {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 220px;
		border: 1px solid #ffffff41;
		border-radius: 0.5em;
		height: 100%;
	}
	.chat-helpers {
		display: flex;
		flex-direction: column;
		gap: 75px;
		padding: 1em;
		margin-top: 12px;
	}
	.chat-helpers button {
		width: 100%;
		height: 60px;
		background-color: #666;
		border-radius: 10px;
		border: none;
		color: #fff;
		text-align: center;
		padding-left: 10px;
		cursor: pointer;
	}

	.chat-helpers button:hover {
		filter: brightness(200%);
		color: black;
	}
	.client {
		text-align: right;
		white-space: pre-wrap;
	}

	.server {
		text-align: left;
		white-space: pre-wrap;
	}

	#scroll-to-bottom1 {
		position: absolute;
		right: 1em;
		bottom: 1em;
		cursor: pointer;
	}

	#scroll-to-top1 {
		position: absolute;
		right: 1em;
		bottom: 3em;
		cursor: pointer;
	}

	

	.message.placeholder b,
	.message.placeholder p,
	.message.placeholder i {
		margin: 30px 0; /* Adjust as needed */
	}

	.message.placeholder {
		height: calc(100% - 50px);
		overflow-y: auto;
		padding: 1em;
	}

	.qtnn {
		display: flex;
		flex-direction: row;
		grid-template-rows: 85% 15%;
		width: 100%;
		height: 100%;
		padding: 0.5em;
		border-radius: 0.5em;
		background-color: rgb(26, 26, 26);
		border: 1px solid #ffffffcc;
		position: relative;
		color: white;
	}

	.chat1 {
		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;
		background-color: rgba(26, 26, 26, 0);
		width: 100%;
		height: 87vh;
		max-height: 87vh;
		padding: 1em;
		color: white;
		font-family: 'Leelawadee', sans-serif !important;
	}
	.chat1 h3 {
		margin: 0;
		margin-bottom: 0.5em;
	}

	.chat1 .chat-history1 {
		width: 100%;

		padding: 1em;

		border-radius: 0.5em;
		background-color: rgba(26, 26, 26, 0);
	}

	.chat-history1 {
		flex-grow: 1;
		overflow-y: auto;
		padding: 1em;
		padding-bottom: 0;
		margin-bottom: 1em;
		border-radius: 0.5em;
		background-color: rgba(26, 26, 26, 0);
	}

	.chat1 .chat-history1 .message {
		margin-bottom: 1em;
		padding: 0.5em;
		border-radius: 0.5em;
		background-color: rgb(26, 26, 26);
		border: 1px solid #ffffff21;
		position: relative;
	}
	.chat1 .chat-history1 .message.placeholder {
		color: #fff;
		
	}
	.chat1 .chat-history1 .message.placeholder p {
		margin: 0;
	}
	.chat1 .chat-history1 .message.placeholder i {
		font-style: normal;
	}
	.chat1 .chat-history1 .message.placeholder b {
		font-weight: normal;
	}

	.chat1 .chat-history1 .message.placeholder::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		border-top: 1em solid rgb(26, 26, 26);
		border-left: 1em solid transparent;
	}
	/*.chat1 .chat-history1 .message.placeholder::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0;
		height: 0;
		border-bottom: 1em solid rgb(26, 26, 26);
		border-right: 1em solid transparent;
	}*/

	.input-box1 {
		width: 100%;
		height: 100%;
		padding: 0.5em;
		border-radius: 0.5em;
		background-color: rgba(26, 26, 26, 0);
		border: none;
		position: relative;
		color: white;
	}

	.input-box1:focus {
		outline: none;
	}

	.submit2 {
		cursor: pointer;
		border: none;
		width: 2em;
		height: 2em;
		z-index: 10;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		background-color: #33333300;
		position: relative;
	}

	.chat1 .chat-history1 .message.client {
		/* Styles for client messages */
		background-color: #007bff;
		color: white;
		width: fit-content;
		margin-left: auto;
	}

	.chat1 .chat-history1 .message.server {
		/* Styles for server messages */
		background-color: #6c757d;
		color: white;
		width: fit-content;
	}

	/* CSS for the loading animation container */
	/*#loading-container2 {
		height: auto;
		background-color: rgba(255, 255, 255, 0);
		z-index: 9999;
	}

	.dot-flashing2 {
		position: relative;

		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: #810a0a;
		color: #810a0a;
		animation: dot-flashing 1s infinite linear alternate;
		animation-delay: 0.5s;
		right: 2px !important;
	}
	.dot-flashing2::before,
	.dot-flashing2::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
	}
	.dot-flashing2::before {
		left: -15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: #810a0a;
		color: #810a0a;
		animation: dot-flashing 1s infinite alternate;
		animation-delay: 0s;
	}
	.dot-flashing2::after {
		left: 15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: #810a0a;
		color: #810a0a;
		animation: dot-flashing 1s infinite alternate;
		animation-delay: 1s;
	}

	@keyframes dot-flashing2 {
		0% {
			background-color: #810a0a;
		}
		50%,
		100% {
			background-color: rgba(152, 128, 255, 0.2);
		}
	}*/
</style>
