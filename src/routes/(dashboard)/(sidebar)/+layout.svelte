<script>
    import Header from "$lib/components/Header.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    
    import { chatpage } from '$lib/stores/global.js';
    import { searchBox } from '$lib/stores/global.js';
    import PreSideBar from "$lib/components/preSideBar.svelte";
    
    export let data;
    
    let containerStyle = '';
    
    $: containerStyle = $searchBox ? 'grid-template-columns: 3em 25em 1fr;' : 'grid-template-columns: 3em 1fr;';
    
    
    // console.log(data);
    
    
    
    // console.log(data.bucketFiles);
    </script>
    
    <Header />
    
    <div class="container" style={containerStyle}>
        <PreSideBar />
        <!-- {#if $searchBox} -->
       <Sidebar pageUrl={data.pathname} bucketFiles={data.bucketFiles} bucketFilesUnStructured={data.bucketFilesUnStructured}/>
       <!-- {/if} -->
        <main>
            <!-- {#if $searchBox} -->
            <!-- <PageTransition pathname={data.pathname}> -->
                <slot />
            <!-- </PageTransition> -->
            <!-- {/if} -->
            </main>
            
            
        
    </div>
    <style lang="scss">
        .container {
            display: grid;
            color: #fff;
            position: relative;
            height: calc(100vh - 86px);
        }
    </style>
    