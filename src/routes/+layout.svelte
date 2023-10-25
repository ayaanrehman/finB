<script>
import Header from "$lib/components/Header.svelte"
import PageTransition from "$lib/components/PageTransition.svelte";
import documents from "$lib/data/documents.json";
import { onMount } from "svelte";
import { writable } from 'svelte/store';

export let data;

let showDocuments = false;
let li2 = false;
let li = true;

onMount(() => {
    const navID = document.getElementById('symbtn');
    if (navID) {
        navID.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
        navID.style.color = 'rgba(255, 255, 255)';
        
    }
});


function toggleShowDocuments(){
    showDocuments = !showDocuments;
}

function toggleDataLake(){
    li2 = true;
    li = false;
    const navID = document.getElementById('symbtn');
    const div = document.getElementsByTagName("body");
    if (navID) {
        navID.style.borderBottom = 'none';
        navID.style.color = 'rgba(255, 255, 255, 0.7)';
    }
    const navID2 = document.getElementById('finbtn');
    if (navID2) {
        navID2.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
        navID2.style.color = 'rgba(255, 255, 255)';

    }

}

function toggleDataLake2(){
    li2 = false;
    li = true;
    const navID = document.getElementById('finbtn');
    if (navID) {
        navID.style.borderBottom = 'none';
        navID.style.color = 'rgba(255, 255, 255, 0.7)';
    }
    const navID2 = document.getElementById('symbtn');
    if (navID2) {
        navID2.style.borderBottom = '0.5px solid rgba(255, 255, 255, 0.4)';
        navID2.style.color = 'rgba(255, 255, 255)';
    }
}


let searchInput = '';
let filteredDocuments = documents;

function filterDocuments() {
    const searchTerm = searchInput.toLowerCase();
    filteredDocuments = documents.filter((document) =>
      document.title.toLowerCase().includes(searchTerm)
    );
  }


</script>

<Header></Header>

<div class="container">
  
    <nav id="nav">
        <ul class="ulstat">
            <div class="navcontainer">
                <button class="navbutton" id="symbtn" on:click={toggleDataLake2}>Symantec Search</button>
                <button class="navbutton" id="finbtn" on:click={toggleDataLake}>Finance AI</button>
                <br>
                
             </div>
             {#if li}
             <li class="dl"><a on:click={toggleShowDocuments} class:active={showDocuments} style="cursor: pointer; color: Gold">
                <span style="font-size:normal;color:gold!important;">{#if showDocuments}&#11206;{:else}&#11208;{/if}</span> Data Lake</a>
               
            {#if documents}
                {#if showDocuments}
                <ul>
                    <input style="background-color: rgba(83, 82, 82, 0.9);; color: wheat;" type="text" bind:value={searchInput} placeholder="Search for files...">
                    {#each documents as document, i}
                        <li><a href="/documents/{document.slug}" class="titledoc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{document.title}.pdf</a></li>
                    {/each}
                </ul>
                {/if}
            {/if}
          </li>
          {/if}
          {#if li2}
           <li class="dl"><a on:click={toggleShowDocuments} class:active={showDocuments} style="cursor: pointer; color: white">
            <span style="font-size:normal;color:white!important;">{#if showDocuments}&#11206;{:else}&#11208;{/if}</span> Data Lake</a>
          {#if documents}
            {#if showDocuments}
            <ul>
                <input style="background-color: rgba(83, 82, 82, 0.9);; color: wheat;" type="text" bind:value={searchInput} placeholder="Search for files...">
                {#each documents as document, i}
                    <li><a href="/documents/{document.slug}" class="titledoc">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{document.title}.csv</a></li>
                {/each}
            </ul>
            {/if}
        {/if}
           </li>
           {/if}

        

            <div style="display:flex;flex-direction:column;margin-top:auto">
                <div class="statbtn">
                    
                    <li style="border-top: 0.5px solid rgba(255, 255, 255, 0.4); padding-top: 5%"><a href="/ ">Home</a></li>
                    <li><a href="/ ">API Access</a></li>
                    <li><a href="/">Support</a></li>
                    <li style="border-bottom: 0.5px solid rgba(255, 255, 255, 0.4); padding-bottom: 5%"><a href="/">About Us</a></li>
                    
                    </div>
                    <br>
                    <br>
                <div style="display:flex;flex-direction:column;margin-top:auto;align-items:center">
                <p style="font-size: small; color: rgba(255, 255, 255, 0.7)">Powered By</p>
                <img src="/images/ics2.png" alt="ICS Logo" style="max-width: 5em; height: auto;" >
            </div>
             </div>
    
        </ul>
    </nav>
 
    <main>
        <PageTransition pathname={data.pathname}>
            <slot />
        </PageTransition>
    </main>
    
</div>
<style lang="scss">

    ::placeholder {
    color: rgba(255, 255, 255, 0.63);
    opacity: 1; /* Firefox */
    }

    .navcontainer {
        display: grid;
        grid-template-columns: 49% 49%;
        gap: 2%;
    }

    .navbutton{
        color: rgba(255, 255, 255, 0.7);
        background-color: transparent;
        border: none;
        font-size: medium;
        font-weight:bold;
        cursor: pointer;
    }

    .statbtn{
        cursor: pointer;
        row-gap: 5%;
        display: grid;
        
    }

    .statbtn a{
        padding-left: 1em;
        
    }


    .navbutton:hover{
        color: rgb(255, 255, 255) !important; 
        border-bottom: 0.5px solid rgba(255, 255, 255) !important;
    }



    .container{
        display: grid;
        min-height: 85vh;
        grid-template-columns: 20em 1fr;
        gap: 10px;
        color:#fff;
        position: relative;
        
    }
    #nav{
        background:rgba(0,0,0,.2);
        backdrop-filter: blur(.5);
        padding:20px 10px;
        height: 100%;
    }
    
    #nav ul{
        list-style: none;
        margin:0;
        padding:0;
        display: flex;
        flex-direction: column;
        height: 100%;
        gap:10px;
    }
    #nav ul li{
        list-style: none;
        margin:0;
        padding:0;
        color:#fff;
        text-decoration: none;
        font-size:1.2rem;
        line-height: 1.5em;
    }
    /*#nav > ul > li{
        border-bottom:1px solid rgb(32, 44, 51);
        margin-bottom:5px;
        
    }*/


    #nav ul li a{
        color:#fff;
        text-decoration: none;
        font-size:1.2rem;
        line-height: 1.5em;
        
    }
   
    #nav > ul > li li{
        /*border-bottom:1px solid rgb(88, 88, 88);*/
        font-size:0.8rem !important;
    }

    .dl {
        max-height: 40vh;
        overflow-y: scroll;
    }



     .titledoc{
        font-size: 1.2em !important;
    }

    .titledoc:hover {
        color: rgb(74, 170, 226) !important;
        
    }



    
</style>
