<script>
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import SearchBox from "$lib/components/SearchBox.svelte";
    import {isFirstLoad} from "$lib/stores/global.js";
    import {onMount} from "svelte"
	// import { afterUpdate } from "svelte";

    let showVidTwo = false;

    onMount(async() => {
        function hidevideo(){
        let vidOne = document.querySelector('.vid-one');
        let overlay = document.querySelector('.overlay-video');

        let vidTwo;

        vidOne.addEventListener('ended', function() {
            // alert('ended');
                showVidTwo = true;
                // let vidTwo = document.querySelector('.vid-two');
            vidTwo.addEventListener('ended', function(){
                overlay.classList.add('hide-overlay');
                setTimeout(() => {
                    $isFirstLoad = false;
                    
                }, 1000);
            });
            // console.log(overlay);
        // Fade out the video by changing the overlay's background color to black with transparency
            
            

        });
    }
    // hidevideo();
    });
</script>

<svelte:head>

{#if browser}
<script>
    
    
    
</script>
{/if}
</svelte:head>
{#if $isFirstLoad}
<div class="overlay-video">
        {#if !showVidTwo}
            <video class="fullscreen-video vid-one" src="/1.mp4" autoplay muted playsinline></video>
            {:else}
        <video class="fullscreen-video vid-two" src="/1.mp4" autoplay muted playsinline></video>

        {/if}
</div>
{/if}
<SearchBox />

<style>

#fullscreen-video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    transition: background-color 1s ease; /* Transition for fading */
}

:global(.overlay-video.hide-overlay){
    opacity:0;
    visibility: hidden;
    transition: all 1s ease;
}
</style>
