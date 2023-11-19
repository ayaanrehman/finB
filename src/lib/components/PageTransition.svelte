<script>
    import { fade, fly } from 'svelte/transition';
    export let pathname = '';
    
  const pageTransitionDuration = 200;

</script>
{#key pathname}
<div in:fly={{  x:30, duration: pageTransitionDuration, delay: pageTransitionDuration }}
       out:fly={{ x: -30, duration: pageTransitionDuration }}>
    <slot />
</div>
{/key}
