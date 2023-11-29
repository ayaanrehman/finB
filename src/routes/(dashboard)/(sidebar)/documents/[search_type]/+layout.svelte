<script>
    import Sidebar from "$lib/components/Sidebar.svelte";
    import SearchBox from "$lib/components/SearchBox.svelte";

    export let data;
</script>

<Sidebar searchType={data.searchType} userId={data.userId} pageUrl={data.pathname} bucketFiles={data.bucketFiles} bucketFilesUnStructured={data.bucketFilesUnStructured}/>
<!-- {/if} -->
 <main>
    <!-- <SearchBox /> -->
    <slot />
     <!-- {#if $searchBox} -->
     <!-- <PageTransition pathname={data.pathname}> -->
     <!-- </PageTransition> -->
     <!-- {/if} -->
     </main>