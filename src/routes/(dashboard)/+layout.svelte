<script>
    import Header from "$lib/components/Header.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte";
    import PreSideBar from "$lib/components/preSideBar.svelte";
    import { preSidebarEnabled } from '$lib/stores/global.js';

    import { page } from '$app/stores';
    export let data;

    $: currentPath = $page.url.pathname;

    $: currentPath && checkisDocuments();

    export let isDocuments = false;

    function checkisDocuments(){
        if($page.url.pathname.includes('documents')){
            isDocuments = true;
        }  else {
            isDocuments = false;
        }
    }
    // console.log('layout data is', data);
    </script>
    <Header />
    <div class="main-grid">
        <!-- {#if $preSidebarEnabled} -->
        <PreSideBar userDetails={data.userDetails} />
        <!-- {/if} -->
        <PageTransition>
        <div class="container" class:documents={isDocuments}>
                <slot />
        </div>
        </PageTransition>
    </div>


    <style lang="scss">
        .main-grid{
            display: grid;
            grid-template-columns: 60px 1fr;
            height: calc(100vh - 75px);
            position: relative;

        }
        .container.documents {
            display: grid;
            grid-template-columns: auto 1fr;
            color: #fff;
            position: relative;
            height: calc(100vh - 75px);
        }

        .container {
            display: grid;
            color: #fff;
            position: relative;
            height: calc(100vh - 75px);
            grid-template-columns: 1fr;
        }
    </style>
    