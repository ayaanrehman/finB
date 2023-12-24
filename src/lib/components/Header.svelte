<script>
// import { buttonName } from '$lib/stores/global.js';

import {page} from '$app/stores';

let title;
let imgg;

$: pathName = $page?.url?.pathname;

$: pathName && updateTitle();

$: imgg && updateTitle();

function updateTitle(){
  if(pathName.includes('/documents/symantec-search/')){
    title = 'Semantic Search';
    imgg = '/images/sidebar/symantec-search.png';
    console.log("Imgg: ", imgg);
  } else if(pathName.includes('/documents/finance-ai/')){
    title = 'Database Search';
    imgg = '/images/sidebar/finance-ai.png';
  } else if(pathName === '/chatgpt-plus/'){
    title = 'Guard Rails';
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

// updateTitle();
console.log("Imgg: ", imgg);


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
	<a href="/">
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

 
</div>
  </div>
 
 
	<hr class="header-line" />
</header>

<style>

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
