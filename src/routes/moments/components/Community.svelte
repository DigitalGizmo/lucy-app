<script>
    import { fade } from 'svelte/transition';
    export let showModal;
    export let imageIndex;
    export let currScrollY, panelHeight;

</script>

<style>

</style>

<!-- ---- FOREGROUND ANIMATIONS ---- -->
{#if (imageIndex === 2)}
    <image transition:fade={{ duration: 500}} 
    width="100%" height="100%" 
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-small.png" />
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