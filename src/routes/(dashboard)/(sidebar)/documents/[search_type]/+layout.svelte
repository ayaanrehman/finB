<script>
    import Sidebar from "$lib/components/Sidebar.svelte";
    import SearchBox from "$lib/components/SearchBox.svelte";
   
    

    export let data;

    // console.log('bucket files', data.bucketFiles);
  

</script>

<Sidebar userDetails={data.userDetails} searchType={data.searchType} userId={data.userId} pageUrl={data.pathname} bucketFiles={data.bucketFiles} bucketFilesUnStructured={data.bucketFilesUnStructured}/>
<!-- {/if} -->
 <main>
    <!-- <SearchBox /> -->
    <slot />
    <SearchBox userDetails={data.userDetails} />
     <!-- {#if $searchBox} -->
     <!-- <PageTransition pathname={data.pathname}> -->
     <!-- </PageTransition> -->
     <!-- {/if} -->
</main>
<style>
    main{
        display: flex;
        flex-direction: row;
    }
</style>