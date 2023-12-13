<script>
    import Header from "$lib/components/Header.svelte"
    import PageTransition from "$lib/components/PageTransition.svelte";
    import PreSideBar from "$lib/components/preSideBar.svelte";

    </script>
    
    <Header />
    
    <div class="container">
        <PreSideBar />
        <main>
            <PageTransition>
                <slot />
            </PageTransition>
        </main>
            
        
    </div>
    <style lang="scss">
        .container {
            display: grid;
            color: #fff;
            position: relative;
            height: calc(100vh - 75px);
            grid-template-columns: auto 1fr;
        }
    </style>
    