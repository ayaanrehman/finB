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

	onMount(async () => {
		const inputBox = document.querySelector('.input-box1');
		inputBox.focus();

		socket = io.connect('http://54.146.82.200:8080/module3');
		// socket = io.connect('http://172.31.55.58:8080/module3');
		socket.on('chat_response', function (data) {
			response = data.answer;
			console.log('This is Response: ', response);
			messages = [...messages, { text: response, sender: 'server', timestamp: new Date() }];
			loadanim = false;
			setTimeout(() => {
				scrollToBottom();
			}, 100);
				
			
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
			socket.emit('chatgpt_question', { question: chatquestion, stylevar: stylevar });
			loadanim = true;
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

</script>

<div class="chat1">
	<h3 style="color: white;">Enterprise AI Chat with GuardRails</h3>
	<div class="chat-gpt-container">
		<div id="chat-history1" class="chat-history1"  readonly="readyonly">
			<div class="message placeholder" bind:this={chatHistory}>
				{#if messages.length === 0}
					<div class="chatting">
						<b>Welcome! Start writing a question...</b>
						<!-- <p>Ask questions like:</p>
						<i>"Brainstorm incentives for a customer loyalty program in a small bookstore"</i>
						<i>"Suggest some codenames for a project introducing flexible work arrangements"</i>
						<i>"Help me pick a birthday gift for my sister who likes gardening"</i> -->
					</div>
				{:else}
					{#each messages as message (message.text)}
						<div class="message {message.sender}">
							<p>{message.text}</p>
							<span style="font-size: x-small;">{formatDate(message.timestamp)}</span>
						</div>
					{/each}
				{/if}
			</div>
			<button id="scroll-to-top1" on:click={scrollToTop}>&#9650;</button>
			<button id="scroll-to-bottom1" on:click={scrollToBottom}>&#9660;</button>

			<form on:submit={submitQuestion}>
				<div class="input-container1">
					<div class="qtnn">
						<input
							class="input-box1"
							type="text"
							bind:value={chatquestion}
							placeholder="Enter your question to ChatGPT Plus"
						/>
						<button
							class="submit2 {loadanim ? 'transparent' : ''}"
							on:click|preventDefault={submitQuestion}
							type="submit"
						>
							{#if loadanim}
								<div id="loading-container2">
									<div class="dot-flashing2" />
								</div>
							{/if}
						</button>
					</div>

					<button id="clear-chat-button" class="clear-button">X</button>
				</div>
			</form>
		</div>
		<div class="chat-helpers">
			<div>
				<button on:click={() => {
					stylevar='style1', submitQuestion();
				}}
				>Rephrase this statement in ICS Format</button>
			</div>
			<div>
				<button>Translate this sentence</button>
			</div>
			<div>
				<!-- <button>Suggest synonyms for this phrase</button> -->
			</div>
		</div>
	</div>
</div>
<button
	on:click={(e) => {
		question = '';
	}}
/>

<style lang="scss">
	@import url('https://fonts.cdnfonts.com/css/leelawadee');

	.transparent {
		background-image: none !important;
		cursor: default;
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
		gap: 12px;
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
	}

	.server {
		text-align: left;
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
		height: calc(100% - 80px);
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
		height: 90vh;
		max-height: 90vh;
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
		font-style: italic;
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
	.chat1 .chat-history1 .message.placeholder::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0;
		height: 0;
		border-bottom: 1em solid rgb(26, 26, 26);
		border-right: 1em solid transparent;
	}

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
		background-image: url('/images/send2.png');
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
	#loading-container2 {
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
	}
</style>
