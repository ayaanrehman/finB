<!-- <h1>First Doc</h1> -->
<script>
    export let data;
    let {document} = data;
</script>
<h1>{document.title}</h1>
<object data="{document.link}" type="application/pdf" width="100%" height="100%" title="{document.title}"></object>
<style>
    object{
        width: 95%;
        min-height: 70vh;
        height: 100%;
    }
</style>