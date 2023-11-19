<!-- <h1>First Doc</h1> -->
<script>
    export let data;
    let {document, structured, url} = data;
</script>

<!-- <h1>{document.title}</h1> -->

{#if document}
    {#if structured}
        <iframe title="{document.name}" src="https://view.officeapps.live.com/op/embed.aspx?src={data.url}"></iframe>
    {:else}
        <object data="{data.url}#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="100%" title="{document.name}"></object>
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



