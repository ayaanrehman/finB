<script>
	import { onDestroy, onMount, beforeUpdate } from 'svelte';
	import { preSidebarEnabled } from '$lib/stores/global.js';

	export let userDetails;

	beforeUpdate(() => {
		$preSidebarEnabled = true;
	});

	onDestroy(() => {
		$preSidebarEnabled = true;
	});

	let username = userDetails?.user_metadata?.name.split(' ')[0];

	let greeting;

	const apps = [
		{ name: 'Semantic Search', url: '/documents/semantic-search/', backgroundImage: '/images/homepage/semantic.jpeg' },
		{ name: 'Database Search', url: '/documents/finance-ai/', backgroundImage: '/images/homepage/pandas.jpeg' },
		{ name: 'Web Seach', url: '/websearch/', backgroundImage: '/images/homepage/websearch.jpeg' },
		{ name: 'Secure-GPT', url: '/chatgpt-plus/', backgroundImage: '/images/homepage/sgpt.jpeg' },
		{ name: 'Zapier Integration', url: '/zapier/', backgroundImage: '/images/homepage/zapier.jpeg' },
		{ name: 'API Access', url: '/api-access/', backgroundImage: '/images/homepage/api.jpeg' },
		{ name: 'Settings', url: '/settings', backgroundImage: '/images/homepage/settings.jpeg' },
		{ name: 'Account Preferences', url: '/accounts/', backgroundImage: '/images/homepage/accounts.jpeg' }
	];

	onMount(() => {
		const currentHour = new Date().getHours();

		if (currentHour < 12) {
			greeting = 'Good Morning';
		} else if (currentHour < 18) {
			greeting = 'Good Afternoon';
		} else {
			greeting = 'Good Evening';
		}
	});
</script>

<div>
	<div class="overlay"></div>
	<h4 style="margin-left: 20px;">{greeting}, {username}</h4>
    <p style="margin-left: 20px;">Welcome to FinBlade. Please select a module to continue.</p>

	<div class="tile-container">
		{#each apps as app}
			<a href={app.url} class="tile" style="background-image: url({app.backgroundImage});"><p>{app.name}</p></a>
		{/each}
	</div>
</div>

<style>

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
		animation: ofadein 1s forwards;
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

	.tile-container {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		
		row-gap: 60px;
        column-gap: 20px;
		align-items: center;
		justify-content: center;
		padding: 20px;
		margin: 0 auto !important;

	}



	@media (max-width: 1600px) {
    .tile-container {
        grid-template-columns: repeat(4, 1fr);
   	 }
	}



    .tile {
        display: flex;
        justify-content: left;
        align-items: end;
        /* text-align: center; */
        width: 300px;
        height: 150px;
        border-radius: 20px;

        filter: grayscale(100%);
       
        background-size: cover;
        background-position: center;

        box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
        color: rgb(255, 0, 0);
        font-size: 18px;
        text-decoration: none;
        transition: transform .2s;
    }

	@media (max-width: 1300px) {
		.tile {
			width: 200px;
			height: 100px;
		}
	}

	@media (max-width: 1000px) {
		.tile {
			width: 150px;
   		    height: 75px;
		}
	}

	@media (max-width: 700px) {
		.tile {
			width: 100px;
    	    height: 50px;
		}
	}

    .tile:hover {
        transform: scale(1.1);
        filter: grayscale(0%);   
    }

    .tile p {
        padding-left: 20px;
        margin-bottom: 20px;
        width: 100%;
        font-size: 15px;
        color: rgb(255, 255, 255);
        background-color: rgba(0, 0, 0, 0.6);
        
    }

    .tile:hover p {
        background-color: rgba(0, 0, 0, 0.9);
        font-size: 18px;
    }
</style>
