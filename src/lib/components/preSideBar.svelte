<script>
	// import { chatpage } from '$lib/stores/global.js';
	// import { searchBox } from '$lib/stores/global.js';
	import { goto } from '$app/navigation';
	import { signOut } from '$lib/database/utility.js';

	async function signOutUser() {
		let res = await signOut();
		if (!res.error) {
			goto('/login');
		}
	}

	let buttons = [
		{ name: 'Finance AI', icon: '/images/support.png', link: '/documents/finance-ai' },
		{ name: 'Symantec Search', icon: '/images/aboutus.png', link: '/documents/symantec-search' },
		{ name: 'ChatGPT', icon: '/images/chatgpt.png', link: '/chatgpt-plus' },
		{ name: 'Zapier', icon: '/images/zapier.png', link: '/chatgpt-plus' },
		{ name: 'API Access', icon: '/images/apiaccess.png', link: '/chatgpt-plus' },
		{ name: 'About US', icon: '/images/rag.png', link: '/' },
	
		
	];
	let activeButton = null;
	let activeLogout = false;
</script>

<div class="sidebar">
	{#each buttons as button}
		<div
			class="button"
			on:mouseover={() => (activeButton = button)}
			on:mouseout={() => (activeButton = null)}
			on:click={() => {
				goto(button.link);
			}}
		>
			<img class="icon" src={button.icon} alt={button.name} />
			<div class="tag">{activeButton === button && button.name}</div>
		</div>
	{/each}
	<button
		class="logout"
		on:mouseover={() => (activeLogout = true)}
		on:mouseout={() => (activeLogout = false)}
		on:click={() => {
			signOutUser();
		}}
	>
		{#if activeLogout} <span class="logout-tag">Logout</span>{/if}
		<img style="width: 2em; height: auto;" src="/images/logout.png" alt="logout" />
	</button>
</div>

<style>
	.logout-tag {
		position: absolute;
		left: 3.5em; /* Adjust as needed */
		/* rest of your styles */
	}

	.logout {
		/* justify-self: end; */
		position: absolute;
		bottom: 0;
		background-color: #3d3d3d00;
		color: #fff;
		border: none;
		border-radius: 5px;
		margin-bottom: 20px;
		cursor: pointer;
		filter: invert(0.5);
	}

	.sidebar {
		width: 4em;
		background-color: #22222286;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 20px;
		padding-left: 0.5em;
		padding-right: 0.5em;
    border-right: 1px solid rgb(56, 56, 56);
		/* height: 100vh; */
	}

	.button {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		background-color: #992d2d00;
		width: 50px;
		height: 50px;
		padding: 10px;
		margin: 5px;
		transition: background-color 0.3s ease;
		position: relative;
	}

	.button:nth-child(3) {
		margin-bottom: 1em;
	}

	.button:nth-child(3)::after {
		content: '';
    display: block;
    width: 50%;
    height: 1px;
    background-color: rgb(56, 56, 56);
    margin: 0.5px auto;
    position: absolute;
    bottom: -0.5em; /* Adjust as needed */
	}

	.icon {
		width: 0.8em;
		height: auto;
		background-color: #cccccc00;
		/* border-radius: 50%; */
		margin-bottom: 5px;
		/* Add a transition for smooth color change */
		filter: invert(0.5);
		transition: background-color 0.3s ease;
	}

	.tag {
		display: none;
		background-color: #000000;
		color: #fff;
		padding: 10px;
		border-radius: 5px;
		font-size: 12px;
		margin-left: 10em;
		top: 0em;
		z-index: 2;
	}

	.tag {
		position: relative;
		/* rest of your styles */
	}

	.tag::before {
		content: '';
		position: absolute;
		top: 50%;
		left: -10px; /* Adjust this value to position the arrow correctly */
		transform: translateY(-50%);
		border-width: 5px;
		border-style: solid;
		border-color: transparent #000000 transparent transparent;
	}

	.button:hover {
		background-color: #3d3d3d;
	}

	.button:hover .tag {
		display: block;
	}
</style>
