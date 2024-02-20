<script>
    import { fade } from 'svelte/transition';
    export let showModal;
    export let imageIndex;
    export let currScrollY, panelHeight, moment;

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
    .moment-image {
        width: 100%;
        height: 100%;
    }
</style>

<!-- ---- BACKGROUND ---- -->
<!-- ---- CLOUDS ---- -->
{#if (imageIndex > 1 && imageIndex < 9)}
    <image transition:fade={{ duration: 500}} 
    width="100%" 
    transform="translate({cloudsTransX} 0), scale(2)"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-clouds.jpg" />
{/if}


<!-- Images (frames) one index at a time -->
<!-- --- lucy abijah in front of store ---- -->
{#if imageIndex === 0}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}
<!-- --- lucy thinking ---- -->
{#if imageIndex === 1}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/lucy-thinking-open.png" />

    <image in:fade={{ duration: 1000, delay: 1000}}  out:fade={{duration: 1000}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/lucy-thinking-closed.png" />

{/if}
<!-- --- L & A + kids ---- -->
{#if imageIndex === 2}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}" width="100%" height="100%"></image>

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-small.png" />

    <image in:fade={{ duration: 1000, delay: 1000}}  out:fade={{duration: 1000}}
    class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-kids.png" />
{/if}
<!-- --- Horse comes in ---- -->
{#if imageIndex === 3}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png" alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-med.png" />    

    <image in:fade={{ duration: 1000, delay: 1000}}  out:fade={{duration: 1000}} 
    class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-horse.png" />    

{/if}
<!-- --- L & A closer ---- -->
{#if imageIndex === 4}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-large.png" />   
{/if}
<!-- --- 5, 6, 7 ox cart comes in ---- -->
{#if imageIndex > 4 && imageIndex < 7}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[5].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-large.png" 
    transform= "translate(200 100) scale(0.7)" />  

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-ox-cart.png" 
    transform="translate(-100 200) scale(1.4)" />  
{/if}
{#if imageIndex === 7}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[5].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-large.png" 
    transform= "translate(-700 -2) scale(1.6)" />  

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-ox-cart.png" 
    transform="translate(-3500 300) scale(4)" />  
{/if}
<!-- ---  ---- -->
<!-- {#if imageIndex === 6}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[6].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if} -->
<!-- ---  ---- -->
<!-- {#if imageIndex === 7}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[7].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if} -->

<!-- --- Jin approaches "Heber and Susanna.. ---- -->
{#if imageIndex === 8}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image in:fade={{ duration: 1000, delay: 1500}}  out:fade={{duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-jin.png" />

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-foreground.png" />

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-lucy-abijah.png" />


{/if}
<!-- ---  lucy, abijah greet jin ---- -->
{#if imageIndex === 9}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}
<!-- --- jin thinking ---- -->
{#if imageIndex === 10}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}
<!-- --- lucy thinking ---- -->
{#if imageIndex === 11}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}
<!-- --- lucy-abijah-wells-exterior ---- -->
{#if imageIndex === 12}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}


<!-- ---- FOREGROUND ANIMATIONS ---- -->
<!-- {#if (imageIndex === 2)}
    <image transition:fade={{ duration: 500}} 
    width="100%" height="100%" 
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-small.png" />
{/if} -->

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