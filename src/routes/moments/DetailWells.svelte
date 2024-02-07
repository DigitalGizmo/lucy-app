<script>
    import { fade } from 'svelte/transition';

    export let showModal;
    export let imageIndex;

</script>

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