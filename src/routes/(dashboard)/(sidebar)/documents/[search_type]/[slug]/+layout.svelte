<script>
	import SearchBox from "$lib/components/SearchBox.svelte";
    import { onMount } from 'svelte';
    import { srn } from '$lib/data/helpers';
    import { selectSearch } from '$lib/stores/global.js';
	import { searchBoxx } from '$lib/stores/global.js';

 

    let page = true;
    let pagemin = false;

    let isActive = false;

    function root() {
        selectSearch = true;
        searchBoxx = false;

    }
  

	function pgchg() {
        let minBtn = document.querySelector('.minviewer');

        let docPageContainer = document.querySelector('.doc-page-container');

        docPageContainer.classList.toggle('minimize');

    };

     onMount( () => {
        // pgchg();        
    });

</script>

<div id="pgctnr" class="doc-page-container">
    <!-- {#if page} -->
        <div class="doc-container" style="border-right: 0.5px solid grey;">
             <a href='/'><button id="cv" class="closeviewer">X</button>
            </a>
            <button id="minviewer" class="minviewer" on:click={pgchg} class:active={isActive}>&#8211;</button>
                <slot /> 
        </div>
    <!-- {/if} -->
        <!-- {#if pagemin}
        <a href='/'><button on:click={() => { srn(); root(); }} id="cv" class="closeviewer">X</button>
            </a>
        <button class="minviewer" on:click={pgchg} class:active={isActive}>&#8211;</button>
        {/if} -->

</div>
<style>
    .doc-page-container{
        transition: .1s all ease-out;
        min-width: 40%;
        max-width: 40%;
    }
    :global(.doc-page-container.minimize){
        min-width: unset !important;
        width: 0px !important;
        overflow: visible;
        z-index: 9999;
    }
    :global(.doc-page-container.minimize .closeviewer, .doc-page-container.minimize .minviewer){
        right:-30px !important;
    }
    .closeviewer {
       cursor: pointer;
       background-color: rgba(0, 0, 0, 0);
       color: rgb(0, 0, 0);
       background:#fff;
       border-radius: 12px;
       border: none;
       font-size: 0.8em;
       position: absolute;
       right:5px;
       top:5px;
       display: flex;
       justify-content: center;
       align-items: center;
       width: 24px;
       height: 24px;
       padding:5px;
       text-decoration: unset;
       font-weight: bold;
       /* padding-left: 30%; */
       /* padding-top: 0.2em; */
      
       
    }

    .closeviewer:hover {
        background-color: rgb(170, 0, 0);
        color: white;
    }

    .minviewer {
       cursor: pointer;
       background-color: rgba(0, 0, 0, 0);
       color: rgb(0, 0, 0);
       background:#fff;
       border-radius: 12px;
       border: none;
       font-size: 0.8em;
       position: absolute;
       right:5px;
       top:39px;
       display: flex;
       justify-content: center;
       align-items: center;
       width: 24px;
       height: 24px;
       padding:5px;
       text-decoration: unset;
       font-weight: bold;
       /* padding-left: 30%; */
       /* padding-top: 0.2em; */
      
       
    }

    .minviewer:hover {
        background-color: rgb(0, 74, 170);
        color: white;
    }


    .doc-container{
        position: relative;
    }

    .doc-page-container{
        display: grid;
        grid-template-columns: 100%;
        height: calc(100vh - 75px);
        /*min-height: 85vh;*/
    }

    .active{
        display: block !important;
    }


</style>
