<script>
    import Header from "$lib/components/Header.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte";
    import PreSideBar from "$lib/components/preSideBar.svelte";
    export let data;

    console.log('layout data is', data);

    </script>
    
    <Header />
    
    <div class="container">
        <PreSideBar />
        <!-- <PageTransition> -->
            <slot />
        <!-- </PageTransition> -->
    </div>

    <style lang="scss">
        .container {
            grid-template-columns:  60px auto 1fr;
            display: grid;
            color: #fff;
            position: relative;
            height: calc(100vh - 75px);
        }
    </style>
    