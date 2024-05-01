<script>
  import { fade } from 'svelte/transition';
  export let showModal;
  export let imageIndex, imageDecimal, prevImageIndex;
  export let currScrollY, frameHeight, moment, isSoundFx;

  let fxAudio;


  // Clouds
  let cloudsTransX = 0;
  $: if (imageIndex < 10 ) {
      cloudsTransX = (currScrollY/8) - (frameHeight * 2) + 100;
      // frame height compenstion because we start on the 3rd frame    
  }
  // Jim & Lucy thinking
  let cloudThinkTransX = 0;
  let isCloudThinkCaptured = false;
  let cloudThinkScrollStartY = 8000;
  $: if (imageIndex === 10 && !isCloudThinkCaptured) {
    cloudThinkScrollStartY = currScrollY;
    isCloudThinkCaptured = true;
  }
  $: if (imageIndex > 9 ) {
      cloudThinkTransX = (-(cloudThinkScrollStartY - (currScrollY ))/8) - 200;
      // frame height compenstion because we start on the 3rd frame    
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
  // let lucAbiIndex = 0;
  // const zoomDelay = 130;  
  // let lucyAbiHorseBgTransY = 0;
  // let lucyAbiHorseBgTransX = 0;

  $: if (imageIndex === 3 && !islucyAbiHorseCaptured) {
    lucyAbiHorseScrollStartY = currScrollY;
    islucyAbiHorseCaptured = true;
  }
  // Allow time for fade before starting zoom, hence the - ~ 150
  $: if ((lucyAbiHorseScrollStartY) - (currScrollY ) < 0) { //- zoomDelay
      lucyAbiScale = 1 + ((lucyAbiHorseScrollStartY - (currScrollY ))/6000); // - zoomDelay
  }

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
    OxTransX = ((OxScrollStartY - (currScrollY ))/2.5); 
    OxTransY = ((OxScrollStartY - (currScrollY ))/12); 
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
    // Play the audio for imageIndex
    fxAudio = new Audio(`https://lucy-proto.deerfield-ma.org/assets/moments/audio/community/sound-fx/${ moment.frames[imageIndex].soundFx}.mp3`);
    fxAudio.play();      
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
    /* .Rrrrr {
      font: italic 40px serif;
      fill: red;
    }     */
</style>

<!-- ---- BACKGROUND ---- -->
<!-- ---- CLOUDS ---- -->
{#if (imageIndex > 1 && imageIndex < 10)}
    <image transition:fade={{ duration: 500}} 
    width="100%" 
    transform="translate({cloudsTransX} 0), scale(2.8)"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-clouds.jpg" />
{/if}

<!--  -->
{#if (imageIndex > 9 && imageIndex < 12)}
    <image transition:fade={{ duration: 500}} 
    width="100%" 
    transform="translate({cloudThinkTransX} 0), scale(7.5)"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-clouds.jpg" />
{/if}


<!-- Images (frames) one index at a time -->
<!-- --- lucy abijah in front of store ---- -->
{#if imageIndex === 0}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
    alt="{moment.frames[imageIndex].alt}"></image>

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
    <!-- <text transform="translate(800 240)"
    class="Rrrrr"> imageIndex: {imageIndex} imageDecimal: {imageDecimal}</text> -->
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

      <!-- <text transform="translate(800 240)"class="Rrrrr"> 
        imageIndex: {imageIndex} imageDecimal: {imageDecimal}
      </text> -->
    </g>

{/if}
<!-- --- L & A + kids ---- -->
{#if imageIndex === 2}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}" width="100%" height="100%"></image>

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-small.png" />

    {#if imageDecimal > 2.3}
      <image in:fade={{ duration: 1000}}  out:fade={{duration: 800}}
      class="moment-image"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-kids.png" />

      <g transition:fade={{ duration: 1000}}>
        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("hoop", "evidence");}}>
          <path class="hotspot" d="m1749.05,756.08c-12.15,20.92-43.55,27.89-70.14,12.45s-42.31-45.99-26.15-68.36c13.87-19.2,43.99-25.51,70.5-9.93,23.8,13.99,37.94,44.92,25.79,65.84Z"/>
        </a>
      </g>

    {/if}
{/if}
<!-- --- Horse comes in ---- -->
{#if imageIndex === 3}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png" alt="{moment.frames[imageIndex].alt}"></image>


    {#if imageDecimal <= 3.5}
      <g transform="translate(75 -20) scale(0.9)" transition:fade={{ duration: 700}}>
          <image transition:fade={{ duration: 700}}  
          class="moment-image"
          href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-med.png" />
      </g>
    {/if}

    {#if imageDecimal > 3.5}
      <g transform="translate(0 0) scale(0.9)" transition:fade={{ duration: 700}}>
        <image transition:fade={{ duration: 700}} 
        class="moment-image"
        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-lucy-abijah-med-no-hat.png" />
      </g>
      {/if}
    <!-- horse -->
    {#if imageDecimal > 3.3}
      <g transform="translate(-100 20) scale(1.1)">
        <image in:fade={{ duration: 1000}}  out:fade={{duration: 1000}} 
        class="moment-image"
        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-horse.png" />  

        <a href="/"
          on:click={(e) => { e.preventDefault(); showModal("great-coat", "evidence");}}>
            <path class="hotspot" d="m454.73,262.86c-29.24,18.61-43.73,24.64-49.05,38.82s-14.82,72.99-7.73,79.19,21.19,11.19,20.38,15.06c-11.52,54.94-79.75,118.74-78.86,129.37.82,9.87-24.34,19.51-14.34,24,8.54,3.83,41.81,26.11,65.13,24.98,21.41-4.67,34.78-80.26,38.82-90.18,13.51-33.17,43.31-65.87,39.76-75.76-2.11-5.9,22.15-.89,28.35-11.52,4.12-7.06,3.54-24.81,0-30.13s-.53-47.44-8.16-54.07c-12.22-10.61-34.3-49.77-34.3-49.77Z"/>
        </a>
      </g>
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
    <g transform="translate({300 + OxTransX} {200 + OxTransY}) scale({OxScale})">
      <image transition:fade={{ duration: 500}}  class="moment-image"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/main-street-ox-cart.png" 
      />  
      <g transition:fade={{ duration: 1000}} transform="translate(-8 22) scale(0.67)">
        <a href="/" 
        on:click={(e) => { e.preventDefault(); showModal("heber-honestman", "people");}}>
          <path class="hotspot" d="m2301.63,563.41c12.91-16.69.39-32.33,6.12-49.62,5.92-17.88,20.46-6.93,25.78-18.53s-93.26-321.73-123.39-334.13-96.78-35.06-114.5-31.51l-10.22-25.2c19.49-14.18,64.65-52.45,49.62-65.96s-64.68-30.63-108.1-26.19c-76.2-40.32-140.86,43.87-171.15,74.43-15.37,15.51,44.44,46.08,80.91,51.86,11.74,1.86,3.41,26.11,6.95,36.74s26.69,48.21,55.05,49.98,45.97-10.99,45.97-10.99c0,0-19.49,15.95-23.04,38.99s-.05,102.36-14.18,118.74c-19.49,22.6,0,30.13-14.18,33.67s-23.92,10.19-17.72,20.6c8.56,14.36-14.18,7.75-28.35,20.16s-9.17,54.94-9.17,54.94c0,0-72.25,188.78-84.78,181.93-24.8-13.57-86.79-21.81-95.68-6.48-12.85,22.15,83.29,79.75,109.87,69.11s121.84-108.1,157.72-164.81c0,0,31.54,5.58,85.59-9.93,38.92-11.17,155.9,37.41,190.87-7.79Z"/>
        </a>

        <a href="/"
        on:click={(e) => { e.preventDefault(); showModal("crutch", "evidence");}}>
          <path class="hotspot" d="m2253.5,646.8s119.6-165.51,161.13-218.66c-7.54-20.05-27.03-51.95-8.91-89.4,0,0,23.69-11.81,40.64,1.72,1.64,15.2-17.08,102.78,65.67,88.89,9.66-6.04,22.22,13.57,13.76,23.24-8.46,9.66-44.23,29.22-87.72-3.4-9.66,18.12-154.37,206.07-162.82,207.28s-21.75-9.66-21.75-9.66Z"/>
        </a>
      </g>
    </g>

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

<!-- --- Jin approaches "Heber and Susanna.. ---- -->
{#if imageIndex === 8}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    {#if imageDecimal > 8.6}
      <image in:fade={{ duration: 1000}}  out:fade={{duration: 1000}}  class="moment-image"
      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-jin.png" />
    {/if}

    <!-- <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-foreground.png" /> -->

    <image transition:fade={{ duration: 1000}}  class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/jin-approaches-lucy-abijah.png" />
{/if}
<!-- ---  lucy, abijah greet jin ---- -->
{#if imageIndex === 9}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/greeting-jin-jin.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/greeting-jin-lucy-abijah.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/greeting-jin-plow.png"
    alt="{moment.frames[imageIndex].alt}"></image>

    <g transition:fade={{ duration: 1000}}>
      <a href="/"
      on:click={(e) => { e.preventDefault(); showModal("jin-cole", "people");}}>
        <path class="hotspot" d="m1039.72,1285c36.03-66.55,97.82-131.4,116.94-183.51,39.02-106.33,8.89-171.9,15.98-194.94s7.68-41.16,0-46.08c-10.55-6.76-15.92-15.95-15.92-15.95.56-28.35,14.64-60.25,21.92-60.25,23.54,0,26.85,78.41,51.89,77.38,43.14-1.77,50.23-222.61,48.45-247.42s-31.94-52.81-35.49-29.77-2.22,60.38-2.22,60.38c0,0-17.25-4.8-19.02-1.26s23.04,30.82,23.04,46.77-7.09,96.42-12.41,71.61-25.23-80.47-25.23-80.47c-14.18-12.41-59.74-33.92-65.51-45.46-21.8-43.6,20.49-14.13,29.35-33.63s-4.54-27.25-1-48.51,16.81-42.53-1.8-67.34c-11.89-15.85-35.06-24.81-49.23-28.35s-24.81-12.41-24.81-12.41c0,0-46.08,5.32-54.94,21.27s-6.45,23.31-15.31,25.09-13.22,13.75-20.45,28.88c-5.27,11.04,7.18,42.62,14.85,59.45,12.93,28.35,24.4,40.09,24.4,40.09,0,0-10.58-.21-24.71,13.08-28.41-3.54-147.15,89.03-193.22,113.42,0,0-8.86,35.44-19.49,46.08s-50.51,21.27-42.53,40.76c3.36,8.2-1.05,11.52,16.84,15.95-6.2,15.56,2.35,24.99,20.19,22.42,43.85-6.32,48.26-3.69,62.64,6.68-1.77,12.41,16.72-40.92,78.77-26.67,58.25,13.37,50.18,45.41,39.55,66.68.89,30.13,5.32,37.22-14.18,40.76s-8.71-7.24-19.49,3.54c-12.41,12.41,29.13,0,30.9,17.72s-4.97,35.39-5.5,54.05c-.86,30.17-6.11,47.58-14.77,55.82-16.44,15.65-43.38-13.87-52.24-3.24s51.85,49.66,39.25,77.08c-8.95,19.47-15.85,62.72-46.7,82.1-7.36,4.62,5.35,29.34-1.74,38.2h142.95Z"/>
      </a>
      <a href="/"
      on:click={(e) => { e.preventDefault(); showModal("plow", "evidence");}}>
        <path class="hotspot" d="m1768.92,618.27c4.17-6.86,13-15.95,38.4-12.87,27.17-3.38,40.76-2.49,47.85-.72s11.21,1.67,15.06.3c6.15-2.2,6.79-3.54,5.61-11.52,8.86,2.36,5.94,11.42,5.94,11.42,0,0,5.58-6.4,7.64-14.51,9.16,14.02-10.93,22.59-9.16,26.72s6.2,3.54,19.49-5.02c1.49-.96-5.02,10.93-11.62,13.09,3.54,4.14,16.05,20.88,7.19,25.31-12.53,6.27-20.24-8.64-21.31-6.55-1.77,3.45-16.6,6.53-18.86,11.04-8.27,16.48-17.62,14.05-18.8,17.59s.24,13.94-6.6,11.89c-5.91-1.77-2.07-19.79-7.09-18.9-17.29,3.05-35.67,2.98-35.67,2.98-2.36,8.57,12.12,16.57,5.55,16.32-10.93-.4-16.54-9.85-16.54-13.99s1.18-6.28,1.18-6.28c0,0-3.25-6.72-6.2-4.36s-8.57,7.68-8.57,9.45.59,13.88-5.32,12.41-3.12-11.72,0-21.27c1.43-4.39-1.31-13.59-1.31-13.59,0,0,1.31,13.59-3.1,18.19-6.36,6.64-4.04,17.88-5.92,17.25-2.88-.96-2.07-13,2.95-20.97,4.57-7.26-1.48-17.43-1.48-17.43,0,0-14.47,18.9-16.84,20.68s10.63-4.43,9.45,2.07c-7.38,1.18-16.84,5.61-20.38,9.16s-17.59.17-70.46-9.58c0,0-.65,3.38-.01,7.37s2.57,8.6,1.98,11.06c-1.18,4.93-7.55,4.91-10.5,2.58-2.25-1.78,3.08-10.25,3.08-10.25,0-13.59,1.86-25.28.3-26.58-7.09-5.91-10.63-9.76-13.59-13.14-1.18,3.09-3.03,16.98-15.06,24.66-5.57,3.56-7.38,13.88-6.2,15.65s5.02,7.42,1.48,6.97-12.7-4.02-12.11-6.38,7.68-26.58,13.59-39c-13.62-2.05,7.68-12.39,2.1-17.11-4.43-.89,18.57-22.74,28.32-24.51,4.44-.81-2.54-9.01,6.33-10.13,10.51-1.33,6.37,12.19,2.83,16.33s-5.45.46-5.45.46c-8.27,15.36-5.48,26.42-5.48,26.42,2.36,3.54,16.77,24.46,25.99,28.95,2.63,1.28,18.61.89,49.33,5.61,9.16-11.81,21.71-20.18,25.98-26.51,15.18-22.52,22.92-15.66,26.01-20.75Z"/>
      </a>
    </g>
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
    <g>
      <a href="/"
      on:click={(e) => { e.preventDefault(); showModal("abigail-wells", "people");}}>
        <path class="hotspot" d="m321.99,221.96l1.44,213.35s-66.65-5.84-84.37-1.8c3.54-17.33-13.79-5.23-6.7-81.44,1.78-19.09,13.43-34.42,17.72-46.82,2.59-7.49,34.7-23.04,34.7-23.04,0,0-22.51-3.51-26.05-15.91-1.44-5.04-3.26-7.45-4.91-8.54s-2.35-3.33-1.36-5.13c1.71-3.11,3.66-7.57,4.56-12.95,1.77-10.63-4.97-37.03,5.81-36.91,14.23.16,20.19-5.65,20.19-5.65,11.22-1.8,20.68-5.52,31.9,4.68,9.36,8.51,7.09,20.16,7.09,20.16Z"/>
      </a>
    </g>
{/if}

<!-- --- abijah-wells-exterior ---- -->
{#if imageIndex === 13}
    <image transition:fade={{ duration: 1500}} class="moment-image"
    href="https://lucy-proto.deerfield-ma.org/assets/moments/images/{moment.slug}/{moment.frames[imageIndex].imageName}.jpg"
    alt="{moment.frames[imageIndex].alt}"></image>
{/if}


