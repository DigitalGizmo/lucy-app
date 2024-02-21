<script>
  import { fade } from 'svelte/transition';
  export let showModal;
  export let imageIndex;
  export let currScrollY; // , panelHeight, moment

  // Leaves
  let leavesTransX = 0;
  let leavesTransY = 0;    

  // Leaves
  $: if (imageIndex < 4 ) {
      leavesTransX = currScrollY/4
      leavesTransY = -currScrollY/7    
  }
  // For house parallax
  let isCaptured = false;
  let houseScrollStartY = 800;
  let houseTransY = 0;
  let houseScale = 1;
  let houseBgTransY = 0;
  let houseBgTransX = 0;
  let houseBgScale = 1;
  const zoomDelay = 130;

  // House parallax
  $: if (imageIndex === 2 && !isCaptured) {
      houseScrollStartY = currScrollY;
      isCaptured = true;
      // count += 1;
  }
  // Allow time for fade before starting zoom, hence the - ~ 150
  $: if ((houseScrollStartY) - (currScrollY - zoomDelay) < 0) {
      // houseTransY = Math.min(((houseScrollStartY - (currScrollY - zoomDelay))/2), 0);
      houseTransY = ((houseScrollStartY - (currScrollY - zoomDelay))/2);
      houseScale = 1 - ((houseScrollStartY - (currScrollY - zoomDelay))/2000);
      houseBgTransY = ((houseScrollStartY - (currScrollY - zoomDelay))/6);
      // houseBgTransX = ((houseScrollStartY - (currScrollY - zoomDelay))/6);
      houseBgScale = 1 - ((houseScrollStartY - (currScrollY - zoomDelay))/5000)
  }

  // Smoke
  let animationIndex = 0;
  let animationInterval;
  function advance() {
    if (animationIndex < 2) {
      animationIndex += 1;
    } else {
      animationIndex = 0;
    }
    // console.log('ani idx: ' + animationIndex);
  }

  // Smoke
  $: if (imageIndex === 2) {
      animationInterval = setInterval(advance, 1200);
  } else {
    clearInterval(animationInterval);
  }


</script>

{#if imageIndex === 0}
  <image transition:fade={{ duration: 1500}}
  href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/02-dawn-house-color.jpg"
  alt="svg house" 
  width="100%" height="100%"></image>
{/if}
{#if imageIndex === 1}
  <image transition:fade={{ duration: 1500}}
  href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/03-candle-color.jpg"
  alt="svg house" 
  width="100%" height="100%"></image>
{/if}
{#if imageIndex === 2}
  <g transition:fade={{ duration: 1000}}>
    <image 
    transform="translate({houseBgTransX} {houseBgTransY}) scale({houseBgScale})"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/04-house-cutaway-color-nochim.jpg"
    alt="svg house" 
    width="100%" height="100%"></image>

    <g transform="translate(0 {houseTransY}) scale({houseScale})">
      <image 
      class="image-layer" width="100%" height="100%" 
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/1-dark-house-proto.png" /> 

      {#if animationIndex === 0}
        <image transition:fade={{ duration: 1200}} 
        width="257px" height="235px" opacity=".7"
        transform="translate(570 185)"
        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/smoke1.png" />
      {/if}

      {#if animationIndex === 1}
        <image transition:fade={{ duration: 1200}} 
        width="312px" height="273px"  opacity=".7"
        transform="translate(600 100)"
        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/smoke1.png" />
      {/if}

      {#if animationIndex === 2}
        <image transition:fade={{ duration: 1200}} 
        width="454px" height="267px"  opacity=".7"
        transform="translate(600 50)"
        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/smoke1.png" />
      {/if}


    </g>
  </g>
{/if}


{#if imageIndex === 3}
<image transition:fade={{ duration: 1500}}
href="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/lucy-hearth.jpg"
alt="svg house" 
width="100%" height="100%"></image>
{/if}

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