<script>
    import { fade } from 'svelte/transition';
    export let showModal;
    export let imageIndex;
    export let currScrollY;

    // Leaves
    let leavesTransX = 0;
    let leavesTransY = 0;    

    // Leaves
    $: if (imageIndex < 4 ) {
        leavesTransX = currScrollY/4
        leavesTransY = -currScrollY/7    
    }

</script>


<!-- ---- LEAVES ---- -->
<!-- leaves -->
{#if imageIndex < 4}
    <image transition:fade={{ duration: 500}} 
    class="image-layer" width="100%" height="100%" 
    transform="translate({leavesTransX} {leavesTransY})"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/leaves-only.png" />
{/if}


<!-- ---- HOTSPOTS ---- -->
{#if imageIndex === 1}
    <g transition:fade={{ duration: 1500}}>
        <!-- <a hx-get="/moments/more"> -->
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("Casement Window", "how");}}>
            <rect x="620" y="700" width="50px" height="120px" 
            class="hotspot"></rect>
        </a>
    </g>
{/if}
{#if imageIndex === 3}
    <g transition:fade={{ duration: 1500}}>
        <!-- <a hx-get="/moments/more"> -->
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("Lidded Hanging Pot", "how");}}>
            <rect x="727" y="745" width="240px" height="130px" 
            class="hotspot"></rect>
        </a>
    </g>
{/if}