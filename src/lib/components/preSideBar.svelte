<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signOut } from '$lib/database/utility.js';
	import { onMount } from 'svelte';
	export let userDetails;
	// import { buttonName } from '$lib/stores/global.js';

	let userName = '';
	let userEmail = '';

	$: {
		userName = userDetails?.user_metadata?.name;
		userEmail = userDetails?.email;
	}

	async function signOutUser() {
		let res = await fetch('/api/logout', 
		{method:"POST"}
	 	)
		 console.log("res is:", res)
		 if (res = "logged out") {
			
		window.location.href = "/login";
	}

	}

	// export let pathName = '/' ;

	// console.log(pathName);
	let showPopup = false;
	let currentPath;

	$: currentPath = $page?.url?.pathname;

	console.log('current path is', $page?.url?.pathname);

	// onMount(() => {
	// 	pathName = window.location.pathname;
	// });

	// console.log(currentPath)

	let buttons = [
		{
			name: 'Semantic Search',
			icon: '/images/sidebar/semantic-search.png',
			link: '/documents/semantic-search/'
		},
		{
			name: 'Database Search',
			icon: '/images/sidebar/finance-ai.png',
			link: '/documents/finance-ai/'
		},
		{ name: 'Secure-GPT', icon: '/images/sidebar/chatgpt-plus.png', link: '/secure-gpt/' },
		{ name: 'Web Search', icon: '/images/sidebar/web-search.png', link: '/websearch/' },
		
		{ name: 'Zapier Integration', icon: '/images/sidebar/zapier.png', link: '/zapier/' },
		{ name: 'API Access', icon: '/images/sidebar/apiaccess.png', link: '/api-access/' },
		{ name: 'Settings', icon: '/images/sidebar/settings.png', link: '/settings/' }
	];
	let activeButton = null;
	let activeLogout = false;
	let activeUser = false;
</script>

<div class="sidebar">
	{#each buttons as button}
		<div class="button" class:active={currentPath.includes(button.link)}>
			<a href={button.link}>
				<img
					class="icon"
					class:iconactive={currentPath.includes(button.link)}
					src={button.icon}
					alt={button.name}
				/>
				<div class="tag">{button.name}</div>
			</a>
		</div>
	{/each}
	<button
		class="accounts"
	
	>
		<img class="icon" src="/images/user.png" alt="user" />
		<div class="popup show">
			<p style="color: white;">User: {userName}</p>
			<p style="color: white;">Email: {userEmail}</p>
			<div class="accx">
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<div
					class="button"
					class:active={currentPath.includes('/accounts/')}
					style="margin-top:auto;"
				>
					<a href="/accounts/">
						<!-- {#if activeUser} <span class="user-tag">Account Preferences</span>{/if} -->
						<img class="icon" src="/images/sidebar/settings.png" alt="user" />
						<div class="acctxt">Account Preferences</div>
					</a>
				</div>
				<div class="button">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						on:click={() => {
							signOutUser();
						}}
					>
						<img style="filter: invert(1);" class="icon" src="/images/logout.png" alt="logout" />
						<div class="acctxt">Logout</div>
					</a>
				</div>
			</div>
		</div>
	</button>
</div>

<style>
	.accx {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		
	}

	.acctxt {
		color: rgb(255, 255, 255);
		font-size: 12px;
		margin-top: 15px;
		width: 100%;
		
		
	}

	.popup {
		display: none;
		position: absolute;
		/* right: -100px; */
		top:-150px;
		left:0px;
		/* bottom: 75%; */
		width: 200px;
		height: 15em;
		background-color: #666666c9;
		border: 1px solid #000000;
		padding: 10px;
		z-index: 1;
		/* vertical-align: bottom; */
		backdrop-filter: blur(5px);
	}

	/* .popup {
		display: none;
	
	} */
	.accounts {
		position: relative;
		margin-top: auto;
		cursor: pointer;
		background-color: #992d2d00;
		transition: background-color 0.3s ease;
		border: none;
		margin-bottom: 10px;
	}
	button.accounts:hover .popup{
		display: block;
	}

	.active1 {
		background-color: #3d3d3d !important;
	}

	.logout-tag {
		position: absolute;
		left: 3.5em;
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
		margin-left: 0.5em;
		cursor: pointer;
		filter: invert(0.5);
	}

	.user-tag {
		position: absolute;
		left: 3.5em;
	}

	.user {
		/* justify-self: end; */
		position: absolute;
		bottom: 4em;
		background-color: #3d3d3d00;
		color: #fff;
		border: none;
		border-radius: 5px;
		margin-bottom: 20px;
		cursor: pointer;
		filter: invert(1);
	}

	.sidebar {
		width: 4em;
		background-color: #222222;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 20px;
		padding-left: 0.5em;
		padding-right: 0.5em;
		z-index: 999;
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
		margin: 5px;
		transition: background-color 0.3s ease;
		position: relative;
	}
	.button a {
		position: relative;
		
		height: 100%;
		text-decoration: none;
		
	}
	.button.active a, .button:hover {
		/* filter: sepia(100%) hue-rotate(180deg) saturate(500%); */
	    filter: sepia(100%) hue-rotate(180deg) saturate(500%) ;
	}

	.button a .tag {
		position: absolute;
	}

	.button:nth-child(5) {
		margin-bottom: 20px;
	}

	.button:nth-child(5)::after {
		content: '';
		display: block;
		width: 50%;
		height: 1px;
		background-color: rgb(56, 56, 56);
		margin: 0.5px auto;
		position: absolute;
		bottom: -0.5em; /* Adjust as needed */
	}

	.button:nth-child(7)::after {
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
		width: 24px;
		height: auto;
		background-color: #00000000;
		filter: invert(0) brightness(200%);
		transition: background-color 0.3s ease;
	}

	.iconactive {
		filter: invert(0) sepia(0%) hue-rotate(270deg) saturate(100%);
		/*background-color: #3d3d3d;  This background color should be applied to the whole button and not just the icon */
	}

	.tag {
		/* display: block; */
		position: absolute;
		background-color: #000000;
		color: #fff;
		padding: 10px;
		border-radius: 5px;
		font-size: 12px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		width: 100px;
		right: -100px;
		position: relative;
		opacity: 0;
		visibility: hidden;
		transition: 0.2s all ease-in-out;
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

	.button.active,
	.button:hover {
		background-color: #3d3d3d !important;
	}

	.button:hover .tag {
		/* display: iniine-block; */
		visibility: visible;
		opacity: 1;
		right: -127px;
		z-index: 2;
	}
</style>
