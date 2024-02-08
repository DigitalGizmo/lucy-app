<script>
    import { fade } from 'svelte/transition';
    export let imageIndex;
    export let currScrollY, panelHeight;

    // Leaves
    let cloudsTransX = 0;
    // let cloudsTransY = 0;    

    // Leaves
    $: if (imageIndex < 4 ) {
        cloudsTransX = (currScrollY/4) - (panelHeight * 2) + 100;
        // cloudsTransY = -currScrollY/7    
    }

</script>

<style>

</style>

<!-- ---- CLOUDS ---- -->
{#if (imageIndex > 1 && imageIndex < 7)}
    <image transition:fade={{ duration: 500}} 
    width="100%" 
    transform="translate({cloudsTransX} 0), scale(2)"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-clouds.jpg" />
{/if}

