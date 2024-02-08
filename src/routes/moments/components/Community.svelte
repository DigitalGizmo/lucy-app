<script>
    import { fade } from 'svelte/transition';
    export let showModal;
    export let imageIndex;
    export let currScrollY, panelHeight;

    // Leaves
    let cloudsTransX = 0;
    let cloudsTransY = 0;    

    // Leaves
    $: if (imageIndex < 4 ) {
        cloudsTransX = (currScrollY/4) - (panelHeight * 2)
        // cloudsTransY = -currScrollY/7    
    }

</script>

<style>

</style>

<!-- ---- CLOUDS ---- -->
{#if (imageIndex > 1 && imageIndex < 7)}
    <image transition:fade={{ duration: 500}} 
    width="100%" 
    transform="translate({cloudsTransX} 0), scale(1.7)"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-clouds.jpg" />
{/if}


<!-- ---- HOTSPOTS ---- -->
{#if imageIndex === 0}
    <g transition:fade={{ duration: 1500}}>
        <!-- <a hx-get="/moments/more"> -->
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("Bag", "how");}}>
            <rect x="470" y="840" width="200px" height="200px" 
            class="hotspot"></rect>
        </a>
    </g>
{/if}
{#if imageIndex === 2}
    <g transition:fade={{ duration: 1500}}>
        <!-- <a hx-get="/moments/more"> -->
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("Lidded Hanging Pot", "how");}}>
            <rect x="350" y="445" width="110px" height="160px" 
            class="hotspot"></rect>
        </a>
    </g>
{/if}