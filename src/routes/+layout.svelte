<script>
import Header from "$lib/components/Header.svelte"
import PageTransition from "$lib/components/PageTransition.svelte";
import Sidebar from "../lib/components/Sidebar.svelte";

export let data;
console.log(data.pathname);
</script>

<Header />

<div class="container">
   <Sidebar pageUrl={data.pathname}/>
    <main>
        <PageTransition pathname={data.pathname}>
            <slot />
        </PageTransition>
    </main>
    
</div>
<style>
    .container{
        display: grid;
        grid-template-columns: 20em 1fr;
        gap: 10px;
        color:#fff;
        position: relative;
        height: calc(100vh - 98px);
    }  
</style>
