<script>
    // import {Chat}

	import Accounts from "$lib/components/Accounts.svelte";

    export let data;

</script>
<Accounts userDetails={data.userDetails}></Accounts>
