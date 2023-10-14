<!-- <script>
import PageTransition from "$lib/components/PageTransition.svelte";
export let data;
</script>
<div class="doc-container">
    <ul class="sub-nav">
        <li><a href="/documents/one">One</a></li>
        <li><a href="/documents/two">Two</a></li>
    </ul>
    <PageTransition pathname={data.pathname}>
        <div class="pdf-container">
            <slot />
        </div>
    </PageTransition>
</div>
<style>
    .doc-container{
        display:grid;
        grid-template-columns: 240px 1fr;
        gap:10px;
    }
    .sub-nav{
        background:rgba(0,0,0,.1);
    }
</style> -->
<slot />
