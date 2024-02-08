<script>
    import { fade } from 'svelte/transition';

    export let showModal;
    export let imageIndex;

</script>

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