<!-- <h1>First Doc</h1> -->
<script>
    import { onMount } from 'svelte';
    
    
    export let data;
    let {doc, structured, url} = data;


     function close() {
       let docPageContainer = document.querySelector('.doc-page-container');
        if(docPageContainer){
            docPageContainer.classList.remove('minimize');

        }

    };
    
    

    onMount( () => {
       
     
        close();        
    });

</script>

<!-- <h1>{doc.title}</h1> -->

{#if doc}
    {#if structured}
        <iframe title="{doc.name}" src="https://view.officeapps.live.com/op/embed.aspx?src={data.url}"></iframe>
    {:else}
        <object data="{data.url}#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="100%" title="{doc.name}"></object>
    {/if}
{:else}
    <p>No Document Found!</p>
{/if}

<style>
    object{
        width: 95%;
        min-height: 70vh;
        height: calc(100vh - 98px);
    }

    iframe {
        width: 95%;
        min-height: 70vh;
        height: calc(100vh - 98px);
    }
</style>



