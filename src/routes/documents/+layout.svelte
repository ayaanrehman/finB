<script>
	import SearchBox from "$lib/components/SearchBox.svelte";
</script>

<div class="doc-page-container">
    <div style="border-right: 0.5px solid grey;">
        <slot /> 
    </div>
    <div>
        
        <SearchBox />
    </div>
</div>
<style>
    div.doc-page-container{
        display: grid;
        grid-template-columns: 50% 50%;
        height: 100%;
        /*min-height: 85vh;*/
    }
</style>
