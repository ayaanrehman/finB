<script>
    import { fade, fly } from 'svelte/transition';
    import { page } from '$app/stores';

    $: currentPath = $page.url.pathname;
  const pageTransitionDuration = 200;

</script>
{#key currentPath}
<div in:fly={{  x:30, duration: pageTransitionDuration, delay: pageTransitionDuration }}
       out:fly={{ x: -30, duration: pageTransitionDuration }}>
    <slot />
</div>
{/key}
