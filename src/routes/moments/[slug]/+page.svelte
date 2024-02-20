<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { isScrollMode } from '$lib/stores.js';
  import MoreModal from '../components/MoreModal.svelte';
  import MainNav from "$lib/MainNav.svelte";
  import MomentNav from "$lib/MomentNav.svelte";
  import Wells from '../components/Wells.svelte'
  import Community from '../components/Community.svelte';
  // import CommunityBG from '../components/CommunityBG.svelte';
  // import frames from "$lib/frames.json";

  // import { page } from '$app/stores';
  // import moments from "$lib/moments.json";

  export let data;

  let panelHeight = 800;
  let panelWidth = 1200;
  let momentScrollHeight = 10000;
  let frameHeight = 900;
  const totalHeightFudgeFactor = 1.3;
  let numberOfFrames = 13;

  let imageIndex = 0; // calculation will subtract 1
  let prevImageIndex = 0;
  let currScrollY = 0;

  let moment = data.moments.find((moment) => moment.slug === $page.params.slug); 

  const momentSlugs = ["sold", "forsale", "newlife", "wells", "church",
    "singer", "engaging", "community", "union", "revolution",
    "frontier", "court", "returning"
  ]

  let isReadAloud = false;
  let storyAudio;
  // Mount is triggered 
  onMount(() => {
    panelHeight = window.innerHeight - 138;
    panelWidth = window.innerWidth;
    // Base frame interval on total element height

    // console.log('mount - slug: ' + data.moment.slug + ' currMomIdx: ' + currMomentIndex);
    // console.log('mount page param slug: ' + $page.params.slug);
    const getIndexOfSlug = (element) => element === $page.params.slug;
    currMomentIndex = momentSlugs.findIndex(getIndexOfSlug);
    // console.log('mount currMomentIndex: ' + currMomentIndex)
    // set index
    scrolledXIndex = currMomentIndex;
    // scroll to text 
    scrollToChosen(currMomentIndex);
    
    // console.log('audio: ' + moment.frames[0].storyAudio);

    // storyAudio = new Audio(`https://lucy-proto.deerfield-ma.org/assets/moments/audio/community/${moment.frames[1].storyAudio}.mp3`);



    // console.log('scrolledX ' + scrolledXIndex + ' currMomentIndex: ' + currMomentIndex);
    // goto(`/moments/${momentSlugs[currMomentIndex]}`)    
    // console.log('data.moment.frames[0].imageName: ' +
    //  data.moment.frames[0].moreWhoLinks[0].title);

  })

  let currMomentIndex = 0;

  // Temporarily let this function set currMomentIndex -- 
  // should be more global/automatic
  function getPrevSlugIdx(_currSlug) {
    const foundCurrIndex = (element) => element === _currSlug;
    // console.log('currSlug: ' + currSlug);
    // Temp to make sure this is updated
    currMomentIndex = momentSlugs.findIndex(foundCurrIndex)
    // console.log('currIndex: ' + currMomentIndex)
    // Set scroll x
    // window.scrollTo(400, 0);
    return currMomentIndex - 1
  }
  function getNextSlugIdx(currSlug) {
    return currMomentIndex + 1
  }


  // Horizontal scrolling
  let horizontalTitles;
  let scrolledXIndex = 0;
  let currScrollX = 0;
  let horizScrollClass = ''; // smooth-scroll

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
  // function showMapModal() {
  //     // console.log('modal type: ' + modalType)
  //     isMapShowing = true;
  //     isModalShowing = true;
  // };
  // --- End Modal Window ---

  function calcMomentHeight () {
    console.log(" got to calc");
    momentScrollHeight = document.getElementsByClassName("moment-scroll")[0].offsetHeight;
    frameHeight = (momentScrollHeight - (panelHeight * totalHeightFudgeFactor))/numberOfFrames;
  }

  async function explore() {
    isScrollMode.set(true);
    console.log("got to explore");
    await(tick);
    calcMomentHeight();
    console.log("moment height: " + momentScrollHeight);
  }

  // --- Audio ---- 
  function toggleReadAloud() {
    console.log('Read aloud is on');
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
    console.log('is readAloud')
    if (imageIndex != prevImageIndex) {
      console.log('curr indx not = prev')
      if (storyAudio) {
        console.log('pausing bcz not equal')

        storyAudio.pause();
      }
      prevImageIndex = imageIndex;
    }
    console.log('should play')

    storyAudio = new Audio(`https://lucy-proto.deerfield-ma.org/assets/moments/audio/community/${moment.frames[imageIndex].storyAudio}.mp3`);
    storyAudio.play();      
  } else {
    console.log('not read aloud')

    if (storyAudio) {
      storyAudio.pause();
    }
  }



  // ----- Titles-----
  async function scrollToChosen(chosenIndex) {
    console.log('scroll to chosen: ' + chosenIndex)
    // Jump, don't smooth scroll
    horizScrollClass = '';
    await tick();
    horizontalTitles.scrollLeft = 0;
    horizontalTitles.scrollLeft += (panelWidth * chosenIndex);
  }

  async function scrollToChosenSlug(chosenIndex, slug) {
    // console.log('scrollToChosenSlug, idx: ' + chosenIndex + ' slug: ' + slug) 
    // Prevent $: if not equal from duplicating
    currMomentIndex = chosenIndex;
    goto(`/moments/${slug}`)    

    horizScrollClass = '';

    // Wait for horizontalTitle to resolve (it wasn't present in scrollMode)
    await tick();
    horizontalTitles.scrollLeft = 0;
    horizontalTitles.scrollLeft += (panelWidth * chosenIndex);

  }

  async function scrollToNext(chosenIndex) {
    console.log('go to index: ' + chosenIndex)
    horizScrollClass = 'smooth-scroll';
    await tick();
    horizontalTitles.scrollLeft += panelWidth;
  }

  async function scrollToPrev(chosenIndex) {
    console.log('go to index: ' + chosenIndex)
    horizScrollClass = 'smooth-scroll';
    await tick();
    horizontalTitles.scrollLeft -= panelWidth;
  }

  // $: if (currScrollY < (panelHeight/2)) {
  //   imageIndex = 0;
  // } else {
  //   imageIndex = (Math.trunc(((currScrollY + panelHeight)/(panelHeight)) - 0.4));
  // }
  // $: scrolledXIndex = Math.trunc((currScrollX + (panelWidth/2.5))/panelWidth)

  $: if (currScrollY < (frameHeight/2)) {
    imageIndex = 0;
  } else {
    imageIndex = (Math.trunc(((currScrollY + frameHeight)/(frameHeight)) - 0.4));
  }
  $: scrolledXIndex = Math.trunc((currScrollX + (panelWidth/2.5))/panelWidth)

  // update which moment we're looking at
  $: moment = data.moments.find((moment) => moment.slug === momentSlugs[currMomentIndex]);
  
  $: if (currMomentIndex != scrolledXIndex) {
    currMomentIndex = scrolledXIndex;
    // console.log('scrolledX ' + scrolledXIndex + ' currMomentIndex: ' + currMomentIndex);
    goto(`/moments/${momentSlugs[currMomentIndex]}`)
  }

  $: if (isModalShowing) {
      console.log("modal is now showing")
  }

  function beenClicked(event) {
    console.log("target clicked: " + event.target.className)
  }
</script>

<style>
  	.more-panel-fixed {
		height: 60vh;
		width: 100%;
		position: fixed;
    z-index: 30;
	}
  .story p {
    min-height: 10em;
  }
  /* SVG icons */
  /* Read Aloud */
  .audio-icons {
    width: 50px;
    height: 50px;
    bottom: 0;
    right: 0;
  }
  .read-cls-1 {
    stroke-width: 3px;
  }

  .read-cls-1, .read-cls-2 {
    fill: none;
    stroke: #e5b921;
    stroke-miterlimit: 10;
  }

  .read-cls-2 {
    stroke-width: 7px;
  }

  .read-cls-3 {
    fill: #e5b921;
    stroke-width: 0px;
  }
  /* Sound effects */
  .effects-1 {
    fill: none;
    stroke: #e5b921;
    stroke-miterlimit: 10;
    stroke-width: 3px;
  }

  .effects-2 {
    fill: #e5b921;
    stroke-width: 0px;
  }
  /* Explore */
  .explore-1 {
    fill: none;
    stroke: #e6ba21;
    stroke-miterlimit: 10;
    stroke-width: 3px;
  }

  .explore-2 {
    font-family: FiraSansCondensed-Regular, 'Fira Sans Condensed';
    font-size: 12px;
  }

  .explore-2, .explore-3 {
    fill: #e6ba21;
  }

  .explore-3 {
    stroke-width: 0px;
  }

</style>

<svelte:window bind:scrollY={currScrollY} />
<section class="style-wrapper-tbd">
  
  <header id="header" class="moment-header">
    <MainNav />
    <MomentNav  
      scrollToChosenIdx={scrollToChosenSlug}
      {stopAudio}
    />
  </header>
  
  {#if $isScrollMode }
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
                  showModal = {showModal}
                  imageIndex = {imageIndex}
                  currScrollY = {currScrollY}
                  {moment}/>
              {/if}
              {#if currMomentIndex === 7}
                  <Community 
                  {showModal}
                  {imageIndex}
                  {currScrollY}
                  {panelHeight}
                  {moment}
                />
              {/if}
        
            </svg>
          </div> <!-- end image panel image -->

          <!-- More container was here -->

        </div> <!-- /image-panel-fixed -->
      </div><!-- /image-panel -->

      <!-- Experiment by Don -->
      <div class="more-panel-fixed">
        <!-- ---- Single dynamic more box ---- -->
        <div class="more-container">
          <h4 class="more-tab">More</h4>
          <h4>More</h4>
          {#if moment.frames[imageIndex]}

            <p>{ moment.frames[imageIndex].moreBlurb}</p>
            <!-- {#if (frames.community[imageIndex].moreWhoLinks === undefined)} -->
            {#if imageIndex > 12}
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

        <div class="audio-icons"><!-- icons -->

          <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 127 127">
            <g id="read-aloud" class="icon">
              <a href="/" 
                on:click={(e) => { e.preventDefault(); toggleReadAloud();}}>
                <g>
                  <circle class="read-cls-1" cx="63.5" cy="63.5" r="62"/>
                  <circle class="read-cls-3" cx="13.01" cy="69.05" r="3.66"/>
                  <circle class="read-cls-3" cx="81.15" cy="69.05" r="3.66"/>
                  <path class="read-cls-2" d="m21.43,54.87c10.63,8.63,10.63,20.68,0,27.91"/>
                  <path class="read-cls-2" d="m32.95,43.8c16.1,11.08,15.95,38.99,0,49.92"/>
                  <path class="read-cls-3" d="m96.74,20.91v31.9h-25.11c-2.22.15-2.68,1.27-2.68,2.81v8.78c-5.1.3-5.46,8.94,1.94,8.32.59,4.47,4.73,14.51,17.28,20.04l8.57.08v7.83h-7.53c-8.06-1.18-21.11-10.34-24.07-20.97-5.46-.59-12.26-12.26-4.22-18.8-.89-21.07,5.66-26.55,9.68-31.24,4.56-5.32,13.44-9.62,26.14-8.73Z"/>
                </g>
              </a>

            </g>
          </svg>

          <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65">
            <g id="sound-fx" class="icon">
              <g>
                <circle class="effects-1" cx="32.5" cy="32.5" r="31"/>
                <g>
                  <line class="effects-1" x1="31.12" y1="16.12" x2="31.12" y2="27.63"/>
                  <line class="effects-1" x1="44.03" y1="13.4" x2="35.78" y2="28.17"/>
                  <path class="effects-2" d="m8.18,31.24l4.32,7.88c17.54,2.92,16.44,11.76,24.31,11.76,6.51,0,8.25-5.36,8.25-5.36,2.77,2.65,6.79.47,6.73-2.35-.06-3.07-2.33-5.21-5.89-3.8.03-5.81-2.6-8.16-12.16-8.14l-3.33,6.72v-6.74l-22.22.02Z"/>
                </g>
              </g>
            </g>
          </svg>          

            <!-- <img src="https://lucy-proto.deerfield-ma.org/assets/moments/images/wells/smoke1.png" alt=""> -->

        </div>

    </div>  <!-- /more-panel-fixed -->




      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="story-frames"
        on:click={beenClicked}>
        {#each moment.frames as frame}
          <article class="story {frame.textAlign}">
              <p>{ frame.storyText}</p>      
          </article>
        {/each}  
      </div><!--/story-frames-->




      <article class="total-more">
        <h2>The Necessity for Community</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>


        {#if moment.frames[0]}

          <h3>Who Else?</h3>
          <ul >
            {#each {length: 4} as _, i}
              {#if (moment.frames[i].moreWhoLinks.length > 0)}
                {#each moment.frames[i].moreWhoLinks as link }
                  <li><a href="/" 
                      on:click={(e) => { e.preventDefault(); showModal(link.slug, "people");}}>
                      {link.title}</a></li>
                {/each}
              {/if}
            {/each}
          </ul>   

          <h3>Topics &amp; Ideas</h3>
          <ul>
            {#each {length: 4} as _, i}
              {#if (moment.frames[i].moreTopicLinks.length > 0)}
                {#each moment.frames[i].moreTopicLinks as link }
                  <li><a href="/" 
                      on:click={(e) => { e.preventDefault(); showModal(link.slug, "topics");}}>
                      {link.title}</a></li>
                {/each}
              {/if}
            {/each}
          </ul>     

          <h3>How Do We Know?</h3>
          <ul>
            {#each {length: 4} as _, i}
              {#if (moment.frames[i].moreHowLinks.length > 0)}
                {#each moment.frames[i].moreHowLinks as link }
                  <li><a href="/" 
                      on:click={(e) => { e.preventDefault(); showModal(link.slug, "evidence");}}>
                      {link.title}</a></li>
                {/each}
              {/if}
            {/each}
          </ul>     

          <h3>Where in the world?</h3>
          <ul>
            {#each {length: 4} as _, i}
              {#if (moment.frames[i].moreWhereLinks.length > 0)}
                {#each moment.frames[i].moreWhereLinks as link }
                  <li><a href="/" 
                      on:click={(e) => { e.preventDefault(); showModal(link.slug, "maps");}}>
                      {link.title}</a></li>
                {/each}
              {/if}
            {/each}
          </ul>     

          <h3>Where in the World</h3>
          <ul>
              <li>Map of Deefield</li>
              <li>Another map</li>
          </ul>
          <h3>Myths and Assumptions</h3>
          <ul>
              <li>This is a myth</li>
              <li>Another Myth</li>

          </ul>
        {/if}
      </article> <!--/total-more -->

    </section> <!--/moment-scroll-->
    {#if isModalShowing}
      <MoreModal 
        slug={modalSlug}
        modalType={modalType}
        bind:isModalShowing
      />
    {/if}
  <!-- End scroll mode -->

  {:else}  <!-- title mode -->
    <section class="moment-title">

      <div class="image-panel-fixed">
        {#each data.moments as moment, i}
          {#if currMomentIndex == i}
            <div class="image-panel-image">
                <img transition:fade={{ duration: 700}}
                  src="https://lucy-proto.deerfield-ma.org/assets/moments/images/titlescreens/{moment.slug}.jpg"
                  alt="intro sketch"
                />
            </div>
          {/if}
        {/each}
      </div><!-- end image-panel-fixed -->   
    
      <div class="title-container">
        <div id="horizontal-titles"
          class="{ horizScrollClass }"
          bind:this={horizontalTitles}
          on:scroll={()=>currScrollX=horizontalTitles.scrollLeft} >
          <section>
            {#each data.moments as moment, i}
              <div class="moment-title-block">
                <div>
                  <h1>{moment.title}</h1>
                  <p class="story-intro">{moment.storyIntro}</p>
                  <p class="history-intro">{moment.historyIntro}</p>
                </div>
              </div>
            {/each}
          </section>
        </div>
      </div><!-- /title-container -->
    
      <nav class="moment-options">
        <ul>
          {#if getPrevSlugIdx(moment.slug) >= 0 }
            <li class="prev-moment">
              <a href="/moments/{momentSlugs[getPrevSlugIdx(moment.slug)]}"
              on:click={() => { scrollToPrev(getNextSlugIdx(moment.slug));}}>
                <i class="fa-solid fa-chevron-left"></i> {data.moments[getPrevSlugIdx(moment.slug)].title}
              </a>
            </li>
          {/if}
          {#if (currMomentIndex == 7 || currMomentIndex == 3)}
            <li class="this-moment">
              <a href="/" on:click={(e) => { e.preventDefault(); explore();}}>

                Explore this moment <i class="fa-solid fa-chevron-down"></i>

            <!-- <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.12 79">
                <g id="explore" class="icon">
                  <g>
                    <circle class="explore-1" cx="44.9" cy="44.9" r="31"/>
                    <path class="explore-3" d="m62.76,44.9l-3.15-3.15-12.48,12.46v-27.18h-4.47v27.18l-12.46-12.48-3.17,3.17,17.87,17.87,17.87-17.87Z"/>
                    <text class="explore-2" transform="translate(10.68 44.74) rotate(-85.09)"><tspan x="0" y="0">E</tspan></text>
                    <text class="explore-2" transform="translate(11.1 39.45) rotate(-75.97)"><tspan x="0" y="0">X</tspan></text>
                    <text class="explore-2" transform="translate(12.4 34.06) rotate(-66.25)"><tspan x="0" y="0">P</tspan></text>
                    <text class="explore-2" transform="translate(14.81 28.61) rotate(-57.06)"><tspan x="0" y="0">L</tspan></text>
                    <text class="explore-2" transform="translate(17.11 24.77) rotate(-47.77)"><tspan x="0" y="0">O</tspan></text>
                    <text class="explore-2" transform="translate(21.94 19.47) rotate(-36.65)"><tspan x="0" y="0">R</tspan></text>
                    <text class="explore-2" transform="translate(26.94 15.76) rotate(-26.97)"><tspan x="0" y="0">E</tspan></text>
                    <text class="explore-2" transform="translate(31.79 13.37) rotate(-20.21)"><tspan x="0" y="0"> </tspan></text>
                    <text class="explore-2" transform="translate(34.18 12.39) rotate(-13.53)"><tspan x="0" y="0">T</tspan></text>
                    <text class="explore-2" transform="translate(39.26 11.07) rotate(-3.34)"><tspan x="0" y="0">H</tspan></text>
                    <text class="explore-2" transform="translate(46.23 10.79) rotate(4.82)"><tspan x="0" y="0">I</tspan></text>
                    <text class="explore-2" transform="translate(49.12 10.93) rotate(12.02)"><tspan x="0" y="0">S</tspan></text>
                    <text class="explore-2" transform="translate(54.69 12.2) rotate(19.04)"><tspan x="0" y="0"> </tspan></text>
                    <text class="explore-2" transform="translate(57.17 12.79) rotate(28.1)"><tspan x="0" y="0">M</tspan></text>
                    <text class="explore-2" transform="translate(64.22 16.55) rotate(40.61)"><tspan x="0" y="0">O</tspan></text>
                    <text class="explore-2" transform="translate(69.65 21.07) rotate(53.18)"><tspan x="0" y="0">M</tspan></text>
                    <text class="explore-2" transform="translate(74.46 27.66) rotate(64.43)"><tspan x="0" y="0">E</tspan></text>
                    <text class="explore-2" transform="translate(76.83 32.38) rotate(74.73)"><tspan x="0" y="0">N</tspan></text>
                    <text class="explore-2" transform="translate(78.62 39.09) rotate(84.94)"><tspan x="0" y="0">T</tspan></text>
                  </g>
                </g>
              </svg> -->

              </a>
            </li>
          {/if}
          
          {#if getNextSlugIdx(moment.slug) <= 12 }
            <li class="next-moment">
              <a href="/moments/{momentSlugs[getNextSlugIdx(moment.slug)]}"
              on:click={() => { scrollToNext(getNextSlugIdx(moment.slug));}}>
                <!-- X: { currScrollX } Idx: { scrolledXIndex }  -->
                {data.moments[getNextSlugIdx(moment.slug)].title} <i class="fa-solid fa-chevron-right"></i>
              </a>
            </li>
          {/if}
        </ul>
      </nav>
    </section><!--/moment-title-->

  {/if} <!-- end if isScrollMode -->
</section> <!--/style wrapper-->
