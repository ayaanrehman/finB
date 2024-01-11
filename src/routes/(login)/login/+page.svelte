<script>
	import { onMount } from 'svelte';

	let emailInput;
	let tagline = false;

	onMount(() => {
		emailInput.focus();
	});

	let email = '';
	let password = '';

	let successmsg = false;
	let failuremsg = false;

	async function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		let res = await fetch('/api/login', { method: 'POST', body: data });
		let text = await res.text();
		if (text == 'logged in') {
			successmsg = true;
			failuremsg = false;
			window.location.href = '/homepage/';
			console.log('login success');
		} else {
			successmsg = false;
			failuremsg = true;
			console.log('login failure');
			email = '';
			password = '';
		}
	}

	onMount(() => {
		setTimeout(() => {
			tagline = true;
		}, 1720);
	});
</script>

<div class="overlay" class:fade-out={successmsg} />
<main>
	<div class="form-container">
		<!-- <img class="logologin" src="/images/FinBlade Logo-02 2.png" alt="finblade" /> -->
		<div>
			<p style="color: black;">Log in to</p>
			<img class="logologin" src="/images/finblade-Recovered.png" alt="finblade" />
		</div>

		<form on:submit|preventDefault={handleSubmit}>
			<input
				type="email"
				name="email"
				autocomplete="off"
				bind:value={email}
				bind:this={emailInput}
				placeholder="Enter your email"
			/>
			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="Enter your password"
			/>
			<button type="submit">Submit</button>
		</form>
		{#if successmsg}
			<p class="successmsg">User Authenticated Successfully</p>
		{/if}
		{#if failuremsg}
			<p class="failuremsg">Invalid Username or Password</p>
		{/if}
		<div class="userhelper">
			<a href="/signup/">Create a New User</a>
			<a href="/forgot-password/">Forgot Password</a>
		</div>
	</div>
	<div class="vid-container">
		<div class="wallp">
			<div class="dot" />

			<div class="logo-animation">
				<img src="/images/finblade.png" width="200px" height="auto" alt="Company Logo" />

				{#if tagline}
					<div style="position: relative;">
						<p>Elevate your workforce with Gen-AI.</p>
						<div id="movingBox" />
					</div>
				{:else}
					<p style="color: black;">"Placeholder"</p>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	@keyframes moveRight {
		0% {
			left: 0;
		}
		100% {
			left: 100%;
		}
	}

	#movingBox {
		position: absolute;
		top: 0;
		width: 1000px;
		background-color: black;
		color: white;
		padding: 20px;
		animation: moveRight 3s forwards;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		opacity: 1;
		display: block;
		z-index: 10;
		animation: ofadein 2s forwards;
	}

	.fade-out {
		animation: ofadeout 2s forwards;
	}

	@keyframes ofadein {
		0% {
			opacity: 1;
			display: block;
		}
		100% {
			opacity: 0;
			display: none;
		}
	}

	@keyframes ofadeout {
		0% {
			opacity: 0;
			display: none;
		}
		100% {
			opacity: 1;
			display: block;
		}
	}

	.dot {
		position: absolute;
		width: 50px;
		height: 50px;
		background: white;
		border-radius: 50%;
		animation: grow 3s, fadeOut 2s forwards;
	}

	/* .dot::before {
		content: '';
		position: absolute;
		top: -30px;
		left: -30px;
		width: 110px;
		height: 110px;
		border: 20px solid white;
		border-radius: 50%;
		box-sizing: border-box;
		opacity: 0.5;
		animation: rotate 3s linear;
	} */

	@keyframes grow {
		0% {
			transform: scale(0.1);
		}
		100% {
			transform: scale(20);
		}
	}

	/* @keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	} */

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.successmsg {
		border: none;
		border-radius: 20px;
		background-color: rgb(32, 155, 32);
		padding: 10px;
		position: relative;
		display: inline-block;
		color: white;
	}
	.successmsg::before {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="white"><path d="M7.687 14.4l-5.087-5.099 1.518-1.518 3.568 3.58 7.069-7.069 1.518 1.518z"/></svg>');
		position: absolute;
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}

	.successmsg::after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green"><path d="M7.687 14.4l-5.087-5.099 1.518-1.518 3.568 3.58 7.069-7.069 1.518 1.518z"/></svg>');
		position: absolute;
		background-color: green;
		height: 100%;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.failuremsg {
		border: none;
		border-radius: 20px;
		background-color: rgb(223, 28, 28);
		padding: 10px;
		position: relative;
		display: inline-block;
		color: white;
	}
	.failuremsg::before {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="white"><path d="M10 8.586l2.293-2.293 1.414 1.414L11.414 10l2.293 2.293-1.414 1.414L10 11.414l-2.293 2.293-1.414-1.414L8.586 10 6.293 7.707l1.414-1.414L10 8.586z"/></svg>');
		position: absolute;
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}
	.failuremsg::after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(170, 0, 0)"><path d="M10 8.586l2.293-2.293 1.414 1.414L11.414 10l2.293 2.293-1.414 1.414L10 11.414l-2.293 2.293-1.414-1.414L8.586 10 6.293 7.707l1.414-1.414L10 8.586z"/></svg>');
		position: absolute;
		background-color: rgb(170, 0, 0);
		height: 100%;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.userhelper {
		display: flex;
		justify-content: space-between;
	}

	button {
		color: white;
		background-color: rgb(39, 118, 179);
		border-color: rgba(255, 255, 255, 0.5);
		height: 2em;
		cursor: pointer;
		margin-top: 3em;
		border: none;
	}

	.logologin {
		width: 10em;
		height: auto;
		margin: 0 auto;
		margin-bottom: 2em;
	}

	main {
		display: grid;
		grid-template-columns: 35% 1fr;
		justify-content: center;
		align-items: center;
		width: 100%;
		background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(131, 131, 131));
		height: auto;
	}
	/* video {
		width: 100%;
		height: 100vh;
		object-fit: contain;
	} */

	.bgimg {
		width: 100%;
		height: 100vh;
		/* filter: grayscale(100%);
		opacity: 100%; */
	}

	.wallp {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		width: 100%;
		height: 100vh;
		background-color: black;
	}

	.logo-animation {
		display: flex;
		justify-content: center;

		flex-direction: column;
		align-items: center;
		animation: fadeIn 1s 1s forwards;
		opacity: 0;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.vid-container {
		background-color: rgb(255, 255, 255);
	}

	.form-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 10px;
		justify-content: center;
		width: 80%;
		margin: auto;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	form input {
		color: rgba(0, 0, 0, 0.849);
		font-size: 14px;
		padding: 10px;
		background-color: rgba(240, 248, 255, 0);
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.692);
	}

	form input:focus {
		outline: none;
	}

	a {
		color: rgba(0, 0, 0, 0.849);
		font-size: 14px;
		padding: 10px;
		background-color: rgba(240, 248, 255, 0);
		border: none;
		/* border-bottom: 1px solid rgba(0, 0, 0, 0.692); */
		text-decoration: none;
	}

	a:hover {
		color: rgb(39, 118, 179);
	}
</style>
