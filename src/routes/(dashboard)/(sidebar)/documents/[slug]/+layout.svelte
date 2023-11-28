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
        // console.log("Working.............")
        
        page = !page
        pagemin=!pagemin

        isActive = !isActive;
        if (isActive) {
        // Change the class of the other div to 'otherDivActive'
        document.getElementById('pgctnr').classList.add('active');
        } else {
        // Remove the 'otherDivActive' class
        document.getElementById('pgctnr').classList.remove('active');
        }   

        // console.log("Worked.............")
    };

</script>

<div id="pgctnr" class="doc-page-container">


    {#if page}
        <div class="doc-container" style="border-right: 0.5px solid grey;">
        
            <a href='/'><button on:click={() => { srn(); root(); }} id="cv" class="closeviewer">X</button>
            </a>
            <button id="minviewer" class="minviewer" on:click={pgchg} class:active={isActive}>&#8211;</button>

        
                <slot /> 
        
            
        </div>
    {/if}
    <div>
        <SearchBox />
        
        {#if pagemin}
        <a href='/'><button on:click={() => { srn(); root(); }} id="cv" class="closeviewer">X</button>
            </a>
        <button class="minviewer" on:click={pgchg} class:active={isActive}>&#8211;</button>
        {/if}

    </div>
</div>
<style>

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
        grid-template-columns: 50% 50%;
        height: calc(100vh - 98px);
        /*min-height: 85vh;*/
    }

    .active{
        display: block !important;
    }


</style>
