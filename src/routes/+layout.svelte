<script>
import Header from "$lib/components/Header.svelte"
import PageTransition from "$lib/components/PageTransition.svelte";
import documents from "$lib/data/documents.json";

export let data;

let showDocuments = false;

function toggleShowDocuments(){
    showDocuments = !showDocuments;
}
</script>
<Header></Header>
<div class="container">
  
    <nav id="nav">
        <ul>
            <li><a href="/ai_search ">Home</a></li>
            <li><a href="/documents">Support</a></li>
            <li><a href="/drawings">About Us</a></li>
            <div style="margin-top:auto;">
                <p>Powered By</p>
                <img src="/images/ics2.png" alt="ICS Logo" style="max-width: 100%; height: auto;" >
             </div>
    
        </ul>
    </nav>
    <nav id="nav2">
        <ul>
            <li><a href="/ ">AI Search</a></li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <li><a on:click={toggleShowDocuments} class:active={showDocuments}>Documents</a>
                {#if documents}
                    {#if showDocuments}
                    <ul>
                        {#each documents as document, i}
                            <li><a href="/documents/{document.slug}">{document.title}</a></li>
                        {/each}
                    </ul>
                    {/if}
                {/if}
            </li>
            <li><a href="/drawings">Search Web</a></li>
    
        </ul>
    </nav>
    <main>
        <PageTransition pathname={data.pathname}>
            <slot />
        </PageTransition>
    </main>
    
</div>
<style lang="scss">
    .container{
        display: grid;
        height: 100%;
        min-height: 80vh;
        grid-template-columns: 10% auto 1fr;
        gap:10px;
        color:#fff;
        
    }
    #nav{
        background:rgba(0,0,0,.2);
        backdrop-filter: blur(.5);
        padding:20px 10px;
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
    #nav > ul > li{
        border-bottom:1px solid #3600cc;
        margin-bottom:5px;
    }
    #nav ul li a{
        color:#fff;
        text-decoration: none;
        font-size:1.2rem;
        line-height: 1.5em;
    }
   
    #nav > ul > li li{
        border-bottom:1px solid green;
    }


    #nav2{
        background:rgba(111, 111, 111, 0.2);
        backdrop-filter: blur(.5);
        padding:20px 10px;
        resize: horizontal; /* Allow horizontal resizing */
        overflow-x: auto; /* Add scrollbars when resized smaller */
        width: 200px;
        max-width: 100%;
        min-width: 30px;
        
    }
    #nav2 ul{
        list-style: none;
        margin:0;
        padding:0;
        display: block;
        flex-direction: column;
        gap:10px;
        
    }
    #nav2 > ul ul{
        height: 400px;
        overflow-y: scroll;
        background:rgba(0,0,0,.2);
        backdrop-filter: blur(.2);
        padding:5px;

    }
    #nav2 ul li{
        list-style: none;
        margin:0;
        padding:10px 0;
        color:#fff;
        text-decoration: none;
        font-size:1.2rem;
        line-height: 1.5em;
        overflow-x: hidden;
    }
    #nav2 > ul > li a.active{
        color:blue !important;
    }
 
    #nav2 > ul > li > a{
        color:#fff;
        text-decoration: none;
        font-size:1.2rem;
        line-height: 1.5em;
    }
   
    #nav2 > ul > li li{
        border-bottom:1px solid #eee;
        font-size:.8rem;
        color:black;
    }
    #nav2 > ul ul li > a{
        color:#fff;
        text-decoration: unset;
    }


    
</style>
