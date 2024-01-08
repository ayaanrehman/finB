<script>

	import HomePage from "$lib/components/HomePage.svelte";
	export let data;

</script>
<HomePage userDetails={data.userDetails}></HomePage>