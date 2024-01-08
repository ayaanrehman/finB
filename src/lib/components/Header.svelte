<script>
// import { buttonName } from '$lib/stores/global.js';

import { page } from '$app/stores';
import { onMount } from 'svelte';
import io from 'socket.io-client';
import { embs } from '$lib/stores/global.js';

let isConnected = false;
let socket;


let title;
let imgg;

let loading = false;
let successMessage = false;

$: if (loading) {
    successMessage = false;
  }

$: {
  if ($embs === 'Started') {
    loading = true;
  } else if ($embs === 'Completed') {
    loading = false;
    successMessage = true;
    setTimeout(() => {
      successMessage = false;
      $embs = '';
    }, 3000);
  }
}

$: pathName = $page?.url?.pathname;

$: pathName && updateTitle();

$: imgg && updateTitle();

function updateTitle(){
  if(pathName.includes('/documents/semantic-search/')){
    title = 'Semantic Search';
    imgg = '/images/sidebar/semantic-search.png';
    // console.log("Imgg: ", imgg);
  } else if(pathName.includes('/documents/finance-ai/')){
    title = 'Database Search';
    imgg = '/images/sidebar/finance-ai.png';
  } else if(pathName === '/chatgpt-plus/'){
    title = 'Secure-GPT';
    imgg = '/images/sidebar/chatgpt-plus.png';
  } else if(pathName === '/zapier/'){
    title = 'Zapier Integration';
    imgg = '/images/sidebar/zapier.png';
  } else if(pathName === '/api-access/'){
    title = 'API Access';
    imgg = '/images/sidebar/apiaccess.png';
  } else if(pathName === '/settings/'){
    title = 'Settings';
    imgg = '/images/sidebar/settings.png';
  } else {
    title = '';
    imgg = '';
  }
}

onMount(async () => {
    // socket = io.connect('https://icsfinblade.com:444');
    socket = io.connect('http://192.168.200.29:8080');
    // socket = io.connect('http://192.168.100.113:8080');
    socket.on('connect', function() {
      console.log('Connected!');
      isConnected = true;
    });
    socket.on('disconnect', function() {
      console.log('Disconnected!');
      isConnected = false;
    });

  });

// updateTitle();
// console.log("Imgg: ", imgg);


</script>

<link
	href="https://www.dafontfree.net/embed/bGVlbGF3YWRlZS11aS1zZW1pbGlnaHQtbm9ybWFsJmRhdGEvNDkvbC8zODUxMi9MZWVsVUlzbC50dGY"
	rel="stylesheet"
	type="text/css"
/>

<header>
	<div class="overlay-header">
  <div class="header-container">
    <div class="vline"></div>
	<a href="/homepage/">
		<img
			src="/images/finblade.png"
			alt="Company Logo"
			class="logo"
			width="auto"
			height="60em"
		/>
	</a>
  <img class="headerimg" src={imgg} alt="{title}">

  <span>{title}</span>
  <div class="status">
    <h6>Status:</h6>
  {#if isConnected}
  <div class="light light-green"></div>
  {:else}
  <div class="light light-red"></div>
  {/if}
  </div>




 
</div>

  </div>


{#if loading}
  <div class="loadingbox">
    <h5>Creating Embeddings: {$embs}</h5>
  <div class="loading-ring"></div>
</div>
{/if}
{#if successMessage}
<div class="successbox">
  <h5>Embeddings Successfully Created:</h5>
<div class="tick"></div>
</div>
  
{/if}
 
 
	<hr class="header-line" />
</header>

<style>

.loadingbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  color: white;
  position: absolute;
  right: 20em;
  top: 1.8em;
  height: 1em;
}

.successbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  color: white;
  position: absolute;
  right: 20em;
  top: 1.8em;
  height: 1em;
}

/* .tick {
  position: relative;
  width: 0;
  top: 0.1em;

  transform: rotate(45deg);
}

.tick::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 5px;
  background: #0f0;
  bottom: 25px;
  left: 20px;
}

.tick::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 30px;
  background: #0f0;
  bottom: 25px;
  left: 30px;
} */

  .loading-ring {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .tick {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 8px solid #008000; /* Green */
    border-radius: 50%;
  }

  /* @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  } */

  .status {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    color: white;
    position: absolute;
    right: 10em;
  }

 .light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
 
  }

  .light-green {
    background-color: #007400;
  }

  .light-red {
    background-color: #810000;
  }

  .headerimg {
    left: 2.5em;
    bottom: 0.8em;
    margin: 0.5em;
    position: absolute;
    width: 20px;
    height: auto;
  }

  span {
    color: white;
    left: 5em;
    bottom: 1em;
    margin: 0.5em;
    position: absolute;
    font-weight: bold;
  }

  .header-container {
    display: flex;
    flex-direction: row;
    grid-template-rows: auto auto;
    justify-content: right;
    align-items: center;
    padding: 0.5em;
    max-height: 4.5em;
  }

  .vline {
    width: 1px;
    height: 5em;
    margin-right: 1em;
    /*background-color: #8a8a8a;*/
    background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #c5c5c5,
    rgba(0, 0, 0, 0)
    );
  }


</style>
