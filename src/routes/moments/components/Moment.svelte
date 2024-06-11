<script>
  import { onMount, tick } from 'svelte';
  
  import Wells from './Wells.svelte'
  import Community from './Community.svelte';
  import TotalMore from './TotalMore.svelte';
  import MoreModal from './MoreModal.svelte';
  export let currMomentIndex, currScrollY,panelHeight,
  moment;
  export let scrollToChosenSlug = () => {};

  let imageIndex = 0; // calculation will subtract 1
  let imageDecimal = 0.1;
  let prevImageIndex = 0;
  let frameHeight = 900;
  let momentScrollHeight = 10000;
  const totalHeightFudgeFactor = 1.8; // Larger number makes image appear sooner
  // 1.3 when it was 13
  // Need to refactor this into per-moment -- right now this also applies to Wells
  // let numberOfFrames = moment.frames.length;
  // console.log('frames length: ' + numberOfFrames)
  let numberOfFrames = 14;

  let isReadAloud = false;
  let storyAudio;
  let isSoundFx = false;

  onMount(() => {
    // console.log('moment just mounted')
    calcMomentHeight();
    window.scrollTo({ top: 0, left: 0 }); // , behavior: "smooth"
  })

  function calcMomentHeight () {
    // console.log(" got to calc");
    momentScrollHeight = document.getElementsByClassName("moment-scroll")[0].offsetHeight;
    frameHeight = (momentScrollHeight - (panelHeight * totalHeightFudgeFactor))/numberOfFrames;
  }

  $: imageDecimal = (Math.trunc((((currScrollY + frameHeight)/(frameHeight) - 0.4)*10) )/10);

  $: if (currScrollY < (frameHeight/2)) {
    imageIndex = 0;
  } else {
    imageIndex = Math.trunc(((currScrollY + frameHeight)/(frameHeight)) - 0.4);
  }  

  $: if (isModalShowing) {
      console.log("modal is now showing")
  }

  // I think this was for troubleshooting z-index, clicking hotspot
  // function beenClicked(event) {
  //   console.log("target clicked: " + event.target.className)
  // }
  // --- Modal Window ---
  let isModalShowing = false;
  let modalSlug = "tbd";
  // let isMapShowing = false;
  let modalType = "type tbd";

  function showModal(slug, type) {
      // event.preventDefault();
      modalSlug = slug;
      // modalType = modalTypes[type];
      modalType = type;
      // console.log('modal type: ' + modalType)
      // isMapShowing = false;
      isModalShowing = true;
  };
  // --- End Modal Window ---


  // --- Audio ---- 
  // ---- Read Aloud ----
  function toggleReadAloud() {
    // console.log('Read aloud is on');
    // storyAudio.play();
    isReadAloud = !isReadAloud;
  }

  function stopAudio(){
    isReadAloud = false;
    if (storyAudio) {
        console.log('pausing bcz not equal')
        storyAudio.pause();
      }
  }

  $: if (isReadAloud) {
    // console.log('is readAloud')
    if (imageIndex != prevImageIndex) {
      // console.log('curr indx not = prev')
      if (storyAudio) {
        // console.log('pausing bcz not equal')
        storyAudio.pause();
      }
      prevImageIndex = imageIndex;
    }
    // console.log('should play, imageIndex: ' + imageIndex)
    if (imageIndex < 13) {
      storyAudio = new Audio(`https://lucy-proto.deerfield-ma.org/assets/moments/audio/community/${moment.frames[imageIndex].storyAudio}.mp3`);
      storyAudio.play();      
    }
  } else {
    // console.log('not read aloud')
    if (storyAudio) {
      storyAudio.pause();
    }
  }

  // ---- Sound effects ----
  // Fx handling is in moment components
  function toggleSoundFx() {
    isSoundFx = !isSoundFx;
    console.log('Sound effects on? ' + isSoundFx);
  }
  function stopSoundFx(){
    isSoundFx = false;
    // if (storyAudio) {
    //     console.log('pausing bcz not equal')
    //     storyAudio.pause();
    //   }
  }
</script>

<style>
  /* .Rrrrr {
    font: italic 40px serif;
    fill: red;
  }     */
</style>

<section class="moment-scroll" >
  <!-- transition:slide={{ axis: 'y'}} -->
  <div class="image-panel"> 
    <div class="image-panel-fixed">

      <div class="image-panel-image">
        <svg viewBox="0 0 2000 1286" preserveAspectRatio="xMidYMid slice">

          <!-- Begin hotspots and overlay animation
            needs to be after (on top of) animation full frame pngs -->
          {#if currMomentIndex === 3}
            <Wells 
              {showModal}
              {imageIndex}
              {imageDecimal}
              {currScrollY}
              {frameHeight}
              {moment}
              {isSoundFx}
              {prevImageIndex}
              />
          {/if}
          {#if currMomentIndex === 7}
              <Community 
              {showModal}
              {imageIndex}
              {imageDecimal}
              {currScrollY}
              {frameHeight}
              {moment}
              {isSoundFx}
              {prevImageIndex}
            />
          {/if}

          <!-- <text transform="translate(800 240)"class="Rrrrr"> 
            imageIndex: {imageIndex} imageDecimal: {imageDecimal}
          </text>     -->
        </svg>
      </div> <!-- end image panel image -->

      <!-- More container was here -->

    </div> <!-- /image-panel-fixed -->
  </div><!-- /image-panel -->

  <div class="more-panel-fixed">

    <div class="audio-icons">

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 190">

        <!-- class = "icon" was not being used -->
        <g id="sound-fx" class={isSoundFx ? 'audio-active' : ''}>
          <a href="/" 
            on:click={(e) => { e.preventDefault(); toggleSoundFx();}}>
            <g>
              <circle class="circle-stroke" cx="45" cy="45" r="43.5"/>
              <circle class="circle" cx="45" cy="45" r="43.5"/>
              <g>
                <path class="lines lines-thin" d="m14,64L47.57,26h11.14l-3.29,3h3.58l-3.9,2.93c2.79,22.3-8.36,24.25-26.61,23.41l-6.69,7.66h-7.8v1Z"/>
                <circle class="dot" cx="48.79" cy="29.85" r="1.26"/>
                <path class="lines lines-thin" d="m39,36h8.81s.42,14.45-14.87,14.45"/>
                <line class="lines lines-thin" x1="33" y1="56" x2="33" y2="64"/>
                <line class="lines lines-thin" x1="37" y1="56" x2="37" y2="64"/>
              </g>
              <g>
                <line class="lines lines-thin" x1="67.31" y1="17.22" x2="62.68" y2="23.25"/>
                <line class="lines lines-thin" x1="75.03" y1="21" x2="63.38" y2="25.92"/>
                <line class="lines lines-thin" x1="72.36" y1="28.3" x2="64.65" y2="28.16"/>
              </g>
            </g>
          </a>
        </g>

        <g id="read-aloud" class={isReadAloud ? 'audio-active' : ''} 
            transform="translate(0,10)" >
          <a href="/" 
            on:click={(e) => { e.preventDefault(); toggleReadAloud();}}>
            <g>
              <circle class="circle-stroke" cx="45" cy="135" r="43.5"/>
              <circle class="circle" cx="45" cy="135" r="43.5"/>
              <circle class="dot" cx="48.5" cy="140.5" r="2.5"/>
              <path class="lines lines-thick" d="m54.3,130.72c7.46,6.05,7.46,14.51,0,19.58"/>
              <path class="lines lines-thick" d="m62.39,122.94c11.29,7.77,11.19,27.35,0,35.02"/>
              <polyline class="lines lines-thick" points="25.81 113.81 40.6 130.1 31.92 132.58 32.34 140.21 23.96 145.16 32.52 149.05 30.82 154.57"/>
              <circle class="dot" cx="19.5" cy="116.5" r="2.5"/>
            </g>
          </a>
        </g>

      </svg>          

    </div>

    <!-- ---- Single dynamic more panel ---- -->
    <div class="more-container">
      <h4 class="more-tab">More</h4>
      <h3>More</h3>
      {#if moment.frames[imageIndex]}

        <p>{ moment.frames[imageIndex].moreBlurb}</p>
        <!-- {#if (frames.community[imageIndex].moreWhoLinks === undefined)} -->
        {#if imageIndex > 13}
          <script>console.log('Past where Mores are defined')</script>
        {:else}
          {#if (moment.frames[imageIndex].moreWhoLinks.length > 0)}
          <h5>Who Else?</h5>
          <ul>
            {#each moment.frames[imageIndex].moreWhoLinks as link }
              <li><a href="/" 
                  on:click={(e) => { e.preventDefault(); showModal(link.slug, "people");}}>
                  {link.title}</a></li>
            {/each}
          </ul>     
          {/if}

          {#if (moment.frames[imageIndex].moreHowLinks.length > 0)}
            <h5>How Do We Know?</h5>
            <ul>
              {#each moment.frames[imageIndex].moreHowLinks as link }
              <li><a href="/" 
                on:click={(e) => { e.preventDefault(); showModal(link.slug, "evidence");}}>
                {link.title}</a></li>
              {/each}
            </ul>            
          {/if}

          {#if (moment.frames[imageIndex].moreTopicLinks.length > 0)}
            <h5>Topics &amp; Ideas</h5>
            <ul>
              {#each moment.frames[imageIndex].moreTopicLinks as link }
              <li><a href="/" 
                on:click={(e) => { e.preventDefault(); showModal(link.slug, "topics");}}>
                {link.title}</a></li>
              {/each}
            </ul>            
          {/if}

          {#if (moment.frames[imageIndex].moreWhereLinks.length > 0)}
            <h5>Where in the World?</h5>
            <ul>
              {#each moment.frames[imageIndex].moreWhereLinks as link }
              <li><a href="/" 
                on:click={(e) => { e.preventDefault(); showModal(link.slug, "maps");}}>
                {link.title}</a></li>
              {/each}
            </ul>            
          {/if}

        {/if} 

      {/if}

    </div> <!-- /more-container -->

  </div>  <!-- /more-panel-fixed -->

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="story-frames">
    <!-- on:click={beenClicked} -->
    {#each moment.frames as frame}
      <article class="story {frame.textAlign}">
          <p>{ frame.storyText}</p>      
      </article>
    {/each}  
  </div><!--/story-frames-->

  <TotalMore
    {moment}
    {showModal}
    {scrollToChosenSlug}
    />
    <!-- scrollToChosen -->

</section> <!--/moment-scroll-->
{#if isModalShowing}
  <MoreModal 
    slug={modalSlug}
    modalType={modalType}
    bind:isModalShowing
  />
{/if}
<!-- End scroll mode -->
