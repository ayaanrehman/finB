<script>
	import { onMount } from 'svelte';

	export let data;

	export let form;

	let email = '';
	let password = '';

onMount(  () =>{
  if (form?.success) {
      // goto('/homepage/');
      window.location.href = "/homepage/";
  }
});

</script>

<main>
	<div class="form-container">
		<img src="/images/finblade1.png" alt="finblade" />

		<form method="POST">
			<input type="email" name="email" bind:value={email} placeholder="Enter your email" />
			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="Enter your password"
			/>
			<button type="submit">Submit</button>
		</form>
		<p>
			{#if form?.success}User Authenticated{/if}
		</p>
		<p>
			{#if form?.error}Invalid Username or Password{/if}
		</p>
		<div class="userhelper">
		<a href="/signup/">Create a New User</a>
		<a href="/forgot-password/">Forgot Password</a>
		</div>
		
	</div>
	<div class="vid-container">
		<video src="/1.mp4" autoplay muted playsinline loop />
	</div>
</main>

<style>
	.userhelper{
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

	img {
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
		background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(175, 175, 175));
		height: auto;
	}
	video {
		width: 100%;
		height: 100vh;
		object-fit: contain;
	}

	.vid-container {
		background-color: black;
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
