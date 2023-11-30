<script>
    import Header from "$lib/components/Header.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    
    import { chatpage } from '$lib/stores/global.js';
    import { searchBox } from '$lib/stores/global.js';
    import PreSideBar from "$lib/components/preSideBar.svelte";
    
    export let data;

    
    
    
    
    
    
    
    console.log('layout daata is', data);
    
    
    
    // console.log(data.bucketFiles);
    </script>
    
    <Header />
    
    <div class="container">
        <PreSideBar />
        <!-- {#if $searchBox} -->
        <!-- <PageTransition> -->
            <slot />

        <!-- </PageTransition> -->
      
            
            
        
    </div>
    <style lang="scss">
        .container {
            grid-template-columns:  60px 300px 1fr;
            display: grid;
            color: #fff;
            position: relative;
            height: calc(100vh - 86px);
        }
    </style>
    