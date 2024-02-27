<script>
  import { fade } from 'svelte/transition';
  export let showModal;
  export let imageIndex, prevImageIndex;
  export let currScrollY, frameHeight, moment, isSoundFx;

  let fxAudio;


  // Clouds
  let cloudsTransX = 0;
  $: if (imageIndex < 4 ) {
      cloudsTransX = (currScrollY/4) - (frameHeight * 2) + 100;
      // cloudsTransY = -currScrollY/7    
  }

  // ---- For lucy zoom ----
  let isLucyCaptured = false;
  let lucyScrollStartY = 800;
  let lucyTransY = 0;
  let lucyTransX = 0;
  let lucyScale = 1;
  let lucyBgScale = 1;
  let lucyBgOpacity = 1;
  // const zoomDelay = 130;  
  // let lucyBgTransY = 0;
  // let lucyBgTransX = 0;
  $: if (imageIndex === 1 && !isLucyCaptured) {
    lucyScrollStartY = currScrollY;
    isLucyCaptured = true;
  }
  // Allow time for fade before starting zoom, hence the - ~ 150
  $: if ((lucyScrollStartY) - (currScrollY ) < 0) { //- zoomDelay
      lucyTransY = ((lucyScrollStartY - (currScrollY ))/8); //- zoomDelay
      lucyTransX = ((lucyScrollStartY - (currScrollY ))/2); //- zoomDelay
      lucyScale = 1 - ((lucyScrollStartY - (currScrollY ))/4000); // - zoomDelay
      // lucyBgTransY = ((lucyScrollStartY - (currScrollY - zoomDelay))/6);
      lucyBgScale = 1 - ((lucyScrollStartY - (currScrollY ))/10000); // - zoomDelay
      lucyBgOpacity = 1 + ((lucyScrollStartY - (currScrollY ))/frameHeight); // - zoomDelay
      lucyBgOpacity = lucyBgOpacity < 0 ? 0 : lucyBgOpacity;
  }

  // ---- Lucy, Abijah & horse -----
  let islucyAbiHorseCaptured = false;
  let lucyAbiHorseScrollStartY = 800;
  let lucyAbiTransY = 0;
  let lucyAbiTransX = 0;
  let lucyAbiScale = 1;
  let lucyAbiHorseBgScale = 1;
  let lucAbiIndex = 0;
  // const zoomDelay = 130;  
  // let lucyAbiHorseBgTransY = 0;
  // let lucyAbiHorseBgTransX = 0;

  $: if (imageIndex === 3 && !islucyAbiHorseCaptured) {
    lucyAbiHorseScrollStartY = currScrollY;
    islucyAbiHorseCaptured = true;
  }
  // Allow time for fade before starting zoom, hence the - ~ 150
  $: if ((lucyAbiHorseScrollStartY) - (currScrollY ) < 0) { //- zoomDelay
      // lucyAbiTransY = ((lucyAbiHorseScrollStartY - (currScrollY ))/8); //- zoomDelay
      // lucyAbiTransX = ((lucyAbiHorseScrollStartY - (currScrollY ))/2); //- zoomDelay
      lucyAbiScale = 1 + ((lucyAbiHorseScrollStartY - (currScrollY ))/6000); // - zoomDelay

      // lucyAbiHorseBgTransY = ((lucyAbiHorseScrollStartY - (currScrollY - zoomDelay))/6);
      // lucyAbiHorseBgScale = 1 - ((lucyAbiHorseScrollStartY - (currScrollY ))/10000); // - zoomDelay
  }
  // Luc-Abi image change
  $: if ((currScrollY - lucyAbiHorseScrollStartY) < (frameHeight/2.2)) {
    lucAbiIndex = 0;
  } else {
    lucAbiIndex = 1;
  }  
  // lucAbiIndex = Math.trunc((((currScrollY - lucyAbiHorseScrollStartY) )/(frameHeight/2)) - 0);

  // ---- Ox cart ----
  let isOxCaptured = false;
  let OxScrollStartY = 800;
  let OxTransY = 0;
  let OxTransX = 0;
  let OxScale = 1.4;
  // let OxBgScale = 1;

  $: if (imageIndex === 5 && !isOxCaptured) {
    OxScrollStartY = currScrollY;
    isOxCaptured = true;
  }
  $: if ((OxScrollStartY) - (currScrollY ) < 0) { 
      OxTransY = ((OxScrollStartY - (currScrollY ))/10); 
      OxTransX = ((OxScrollStartY - (currScrollY ))/2.5); 
      // OxScale = 1 - ((OxScrollStartY - (currScrollY ))/4000); 
      // lucyBgTransY = ((lucyScrollStartY - (currScrollY - zoomDelay))/6);
  }

  // ---- Sound effects ---
  $: if (isSoundFx) {
    // console.log('is readAloud')
    if (imageIndex != prevImageIndex) {
      // console.log('curr indx not = prev')
      if (fxAudio) {
        // console.log('pausing bcz not equal')
        fxAudio.pause();
      }
      prevImageIndex = imageIndex;
    }
    // console.log('should play, imageIndex: ' + imageIndex)
    if (imageIndex < 13) {
      // fxAudio = new Audio(`https://lucy-proto.deerfield-ma.org/assets/moments/audio/community/${moment.frames[imageIndex].fxAudio}.mp3`);
      fxAudio = new Audio(`https://lucy-proto.deerfield-ma.org/assets/moments/audio/community/crickets.mp3`);
      fxAudio.play();      
    }
  } else {
    // console.log('not read aloud')
    if (fxAudio) {
      fxAudio.pause();
    }
  }

</script>

<style>
    .moment-image {
        width: 100%;
        height: 100%;
    }
    .Rrrrr {
      font: italic 40px serif;
      fill: red;
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
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}
<!-- --- lucy thinking ---- -->
{#if imageIndex === 1}
    <g transform="translate(0 0) scale({lucyBgScale})">
      <image transition:fade={{ duration: 1500}} class="moment-image"
      opacity="{lucyBgOpacity}"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
      alt="{moment.frames[imageIndex].alt}"></image>
    </g>
    <!-- X compenstion for scale per: https://stackoverflow.com/questions/11671100/scale-path-from-center -->
    <g transform="translate({-300 +(1-lucyScale)* 1000} {lucyTransY}) scale({lucyScale})">
      <image transition:fade={{ duration: 200}}  class="moment-image"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/lucy-thinking-open.png" />
  
      <image in:fade={{ duration: 200, delay: 1500}}  out:fade={{duration: 1000}} class="moment-image"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/lucy-thinking-closed.png" />

      <!-- <text transform="translate(800 240)"
      class="Rrrrr"> lucyBgOpacity: {lucyBgOpacity}</text> -->
    </g>

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


    {#if lucAbiIndex === 0}
      <g transform="translate(75 -20) scale(0.9)" transition:fade={{ duration: 700}}>
          <image transition:fade={{ duration: 700}}  
          class="moment-image"
          href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-med.png" />
      </g>
    {/if}

    {#if lucAbiIndex === 1}
      <g transform="translate(0 0) scale(0.9)" transition:fade={{ duration: 700}}>
        <image transition:fade={{ duration: 700}} 

        class="moment-image"
        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-med-no-hat.png" />
      </g>
      {/if}
    <!-- horse -->
    {#if lucAbiIndex === 1}
      <image in:fade={{ duration: 1000}}  out:fade={{duration: 1000}} 
      transform="translate(-100 20) scale(1.1)"
      class="moment-image"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-horse.png" />  
    {/if}  

{/if}
<!-- --- L & A closer ---- -->
{#if imageIndex === 4}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-large.png" />   
{/if}
<!-- --- 5, 6 ox cart comes in ---- -->
{#if imageIndex > 4 && imageIndex < 7}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[5].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-large.png" 
     />  
     <!-- transform= "translate(200 100) scale(0.7)" -->

    <image transition:fade={{ duration: 500}}  class="moment-image"
    transform="translate({300 + OxTransX} {200 + OxTransY}) scale({OxScale})"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-ox-cart.png" 
    />  
{/if}
{#if imageIndex === 7}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[5].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-close.png" 
    />  
    <!-- transform= "translate(-700 -2) scale(1.6)"  -->

    <image transition:fade={{ duration: 500}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-honestmans-close.png" 
    />
    <!-- transform="translate(-3500 300) scale(4)"    -->
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

    <!-- <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-foreground.png" /> -->

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-lucy-abijah.png" />


{/if}
<!-- ---  lucy, abijah greet jin ---- -->
{#if imageIndex === 9}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/greeting-jin-lucy-abijah.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/greeting-jin-jin.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/greeting-jin-plow.png"
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
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}
{#if imageIndex === 13}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
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
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("cake-of-chocolate", "evidence");}}>
          <path class="hotspot" d="M1133.7,1244.6c-30.1-54.1-21-60-2.9-69.8c-21.3-16.8-10.5-16.4,16.7-27.3c-14.1-3.2-1.2-15.4,4.2-18.4
          c-6.2-9.7-23.2-25.5,35.4-53.2c20.1-9.5,50.5,3.9,77.1,1.5c26.6-2.4,46.2-12.1,53.2-5.9c5.1,14.1,0.6,30.9-9.1,41
          c9.6,4.3,9.9,13.4,3.7,16.6c14.5-2.1,18.6,23.9,26.6,36.9c26.3-0.5,47,5.4,31,28.7c-7.4,10.9-1.8-13.9-41.6,14.2
          c-3,2.1-17.7-1.8-17.7-1.8C1275.2,1268.1,1206.9,1266.1,1133.7,1244.6z"/>
        </a>
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("basket", "evidence");}}>
          <path class="hotspot" d="M962.1,1286h371c6.5-4.9,4.7-72.7-1.8-76.7c0,0-12,2.1-19.9-1.2c-43.3,77.9-143.2,46.7-178.5,37.7
          c-9.9-21.6-37-55.1-5.2-71.4c-17.3-14.9-9.9-17.6,15.6-27c-8.4-5.4,1.1-14.5,6.7-18.8c-10.6-10-7.4-21-4.4-25.2
          c-13.7-3.6-57-13.6-80.9-15.1c23-99,66.1-170.5,88-201.2c-57.3,23-111.1,162.2-109.5,194c-11.9,1.5-27.2,5.4-33,17
          C1002.2,1113.8,935.5,1209.7,962.1,1286z"/>
        </a>
    </g>
{/if}
{#if imageIndex === 2}
    <g transition:fade={{ duration: 1500}}>
        <!-- <a hx-get="/moments/more"> -->
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("hoop", "evidence");}}>
            <rect x="1650" y="650" width="110px" height="150px" 
            class="hotspot"></rect>
        </a>
    </g>
{/if}