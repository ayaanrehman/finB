<script>
    import Header from "$lib/components/Header.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    
    import { chatpage } from '$lib/stores/global.js';
    import { searchBox } from '$lib/stores/global.js';
    import PreSideBar from "$lib/components/preSideBar.svelte";
    
    export let data;

    
    
    let containerStyle = '';
    
    $: containerStyle = $searchBox ? 'grid-template-columns: 4em 25em 1fr;' : 'grid-template-columns: 4em 1fr;';
    
    
    console.log('layout daata is', data);
    
    
    
    // console.log(data.bucketFiles);
    </script>
    
    <Header />
    
    <div class="container" style={containerStyle}>
        <PreSideBar />
        <!-- {#if $searchBox} -->
        <slot />
      
            
            
        
    </div>
    <style lang="scss">
        .container {
            display: grid;
            color: #fff;
            position: relative;
            height: calc(100vh - 86px);
        }
    </style>
    