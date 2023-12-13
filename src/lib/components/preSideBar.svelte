<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signOut } from '$lib/database/utility.js';
	import { onMount } from 'svelte';
	// import { buttonName } from '$lib/stores/global.js';

	async function signOutUser() {
		let res = await signOut();
		if (!res.error) {
			goto('/login/');
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
	{#each buttons as button}
		<div class="button" class:active={currentPath.includes(button.link)}>
			<a href={button.link}>
				<img class="icon" class:iconactive={currentPath.includes(button.link)} src={button.icon} alt={button.name} />
				<div class="tag">{button.name}</div>
			</a>
		</div>
	{/each}
	<button class="accounts" on:mouseenter={() => showPopup = true} on:mouseleave={() => showPopup = false}>
		<img class="icon" src="/images/user.png" alt="user" />
        <div class="popup" class:show={showPopup}>
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div class="button" class:active={currentPath.includes('/accounts/')} style="margin-top:auto;">
			<a href="/accounts/">
				<!-- {#if activeUser} <span class="user-tag">Account Preferences</span>{/if} -->
				<img class="icon" src="/images/sidebar/settings.png" alt="user" />
				<div class="tag">Account Preferences</div>
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
				<div class="tag">Logout</div>
			</a>
		</div>
		</div>
	</button>
</div>

<style>
	 .popup {
        display: none;
        position: absolute;
        right: -80px;
		bottom: 0px;
        background-color: #ffffff31;
        border: 1px solid #000000;
        padding: 10px;
        z-index: 1;
		backdrop-filter: blur(5px);
    }

    .popup.show {
        display: block;
    }

	.accounts {
		position: relative;
		margin-top: auto;
		cursor: pointer;
		background-color: #992d2d00;
		transition: background-color 0.3s ease;
		border: none;
		margin-bottom: 10px;

		
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
		width: 100%;
		height: 100%;
	}
	.button.active a {
		filter: sepia(100%) hue-rotate(180deg) saturate(500%);
	}
	.button a .tag {
		position: absolute;
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

	.button:nth-child(6)::after {
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
		width: 75%;
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
