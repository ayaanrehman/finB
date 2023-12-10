<script>
	import { goto } from '$app/navigation';
	import {page} from '$app/stores';
	import { signOut } from '$lib/database/utility.js';
	import { onMount } from 'svelte';
	import { buttonName } from '$lib/stores/global.js';

	async function signOutUser() {
		let res = await signOut();
		if (!res.error) {
			goto('/login/');
		}
	}

	// export let pathName = '/' ;

	// console.log(pathName);

	let currentPath;

	$:currentPath = $page?.url?.pathname;

	console.log('current path is', $page?.url?.pathname);

	// onMount(() => {
	// 	pathName = window.location.pathname;
	// });

	// console.log(currentPath)

	let buttons = [
		{
			name: 'Symantec Search',
			icon: '/images/sidebar/symantec-search.png',
			link: '/documents/symantec-search/'
		},
		{
			name: 'Database Search',
			icon: '/images/sidebar/finance-ai.png',
			link: '/documents/finance-ai/'
		},
		{ name: 'Guard Rails', icon: '/images/sidebar/chatgpt-plus.png', link: '/chatgpt-plus/' },
		{ name: 'Zapier Integration', icon: '/images/sidebar/zapier.png', link: '/zapier/' },
		{ name: 'API Access', icon: '/images/sidebar/apiaccess.png', link: '/api-access/' },
		{ name: 'Settings', icon: '/images/sidebar/settings.png', link: '/settings/' }
	];
	let activeButton = null;
	let activeLogout = false;
	let activeUser = false;
</script>

<div class="sidebar">
	{#each buttons as button, index (button.link)}
		<div class="button" class:active={currentPath === button.link}>
			<a
				href="{button.link}">
				<img class="icon" src={button.icon} alt={button.name} />
				<div class="tag">{activeButton === button && button.name}</div>
			</a>
		</div>
	{/each}

	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<a href="/accounts/"
		class="user">
		{#if activeUser} <span class="user-tag">Account Preferences</span>{/if}
		<img style="width: 2em; height: auto;" src="/images/user.png" alt="user" />
	</a>
	<button class="logout"
		on:click={() => {
			signOutUser();
		}}
	>
		{#if activeLogout} <span class="logout-tag">Logout</span>{/if}
		<img style="width: 2em; height: auto;" src="/images/logout.png" alt="logout" />
	</button>
</div>

<style>
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
		border-right: 0.5px solid rgb(56, 56, 56);
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
	.button.active a{
		filter: sepia(100%) hue-rotate(180deg) saturate(500%);
	}

	.button:nth-child(4) {
		margin-bottom: 1em;
	}

	.button:nth-child(4)::after {
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
		width: 1em;
		height: auto;
		background-color: #cccccc00;
		filter: invert(0);
		transition: background-color 0.3s ease;
	}

	.active {
		/* filter: sepia(100%) hue-rotate(180deg) saturate(500%); */
		/*background-color: #3d3d3d;  This background color should be applied to the whole button and not just the icon */
	}

	.tag {
		display: none;
		background-color: #000000;
		color: #fff;
		padding: 10px;
		border-radius: 5px;
		font-size: 12px;
		margin-left: 10em;
		top: -2em !important;
		z-index: 2;
		position: relative;
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

	.button.active, .button:hover {
		background-color: #3d3d3d !important;
	}

	.button.active, .button:hover .tag {
		display: block;
	}
</style>
