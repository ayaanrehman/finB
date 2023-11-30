<script>
	import { onMount } from 'svelte';
	import io from 'socket.io-client';
	import { readonly } from 'svelte/store';

	let question = '';
	let messages = [];
	let socket;
	let response = '';
	let chatquestion = '';

	// socket = io.connect('http://icsfinblade.com:8080/');

	// onMount(() => {
	
	// 	socket.on('chat_response', (data) => {
	// 		messages = [...messages, { text: data, sender: 'server' }];
	// 	});
	// });

    // const submitMessage = (event) => {
    // event.preventDefault(); // Prevent form from being submitted normally
    // if (question.trim() !== '') {
    //   messages = [...messages, { text: question, sender: 'client' }];
    //   socket.emit('chatgpt_question', chatquestion);
    //   chatquestion = '';
    // }


	// function submitQuestion() {
	// 	socket.emit('chatgpt_question', chatquestion);
	// 	console.log('This is Question: ', chatquestion);
	// }

	// onMount(async () => {
	// 	socket.on('chat_response', function (data) {
	// 		response = data.response;
	// 		console.log('This is Response: ', response);
			
	// 	});
	// })


</script>

<div class="chat1">
	<h3 style="color: white;">Enterprise AI Chat with GuardRails</h3>
	<div class="chat-gpt-container">
		<div id="chat-history1" class="chat-history1" readonly="readyonly">
			<div class="message placeholder">
				{#if messages.length === 0}
					<div class="chatting">
						<b>Welcome! Start writing a question...</b>
						<p>Ask questions like:</p>
						<i>"Brainstorm incentives for a customer loyalty program in a small bookstore"</i>
						<i>"Suggest some codenames for a project introducing flexible work arrangements"</i>
						<i>"Help me pick a birthday gift for my sister who likes gardening"</i>
					</div>
				{:else}
					{#each messages as message (message.text)}
						<div class={message.sender}>
							{message.text}
						</div>
					{/each}
				{/if}
				<button id="scroll-to-bottom1">&#9660;</button>
			</div>
	
			<form on:submit={submitQuestion}>
				<div class="input-container1">
				  <div class="qtnn">
					<input class="input-box1" type="text" bind:value={chatquestion} placeholder="Enter your question to ChatGPT Plus" />
					<button class="submit2" type="submit" />
				  </div>
	
				<button id="clear-chat-button" class="clear-button">X</button>
				<div id="loading-container">
					<div class="dot-flashing" />
				</div>
			</div>
			
			</form>
		</div>
		<div class="chat-helpers">
			<div>
				<button>Rephrase this statement in ICS Format</button>
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
<button on:click={(e) =>{
	question = 'hhsagfhh.'
}}>

</button>

<style lang="scss">
	@import url('https://fonts.cdnfonts.com/css/leelawadee');

	.chat-gpt-container{
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 220px;
		border: 1px solid #ffffff41;
		border-radius: 0.5em;
		height: 100%;
	}
	.chat-helpers{
		display: flex;
		flex-direction: column;
		gap:12px;
		padding: 1em;
		margin-top:12px;
	}
	.chat-helpers button{
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
	}

	.message.placeholder b,
	.message.placeholder p,
	.message.placeholder i {
		margin: 30px 0; /* Adjust as needed */
		
	}

	.message.placeholder {
		height: calc(100% - 80px);
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
		height: 100%;
		padding: 1em;
		color: white;
		overflow: hidden;
		position: relative;
		font-family: 'Leelawadee', sans-serif !important;
	}
	.chat1 h3 {
		margin: 0;
		margin-bottom: 0.5em;
	}
	.chat1 .chat-history1 {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding: 1em;
		padding-bottom: 0;
		margin-bottom: 1em;
		border-radius: 0.5em;
		background-color: rgba(26, 26, 26, 0);
		position: relative;
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
	.chat1 .chat-history1 .message.placeholder br {
		display: none;
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
		border: 1px solid #ffffff79;
		width: 2em;
		height: 2em;
		z-index: 10;
		background-image: url('/images/send2.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		background-color: #33333300;
	}
</style>
