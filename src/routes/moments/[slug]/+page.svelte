<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { isScrollMode } from '$lib/stores.js';
  import Modal from '../../../temp-modal.svelte';
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

  let moment = data.moments.find((moment) => moment.slug === $page.params.slug); 

  const momentSlugs = ["sold", "forsale", "newlife", "wells", "church",
    "singer", "engaging", "community", "union", "revolution",
    "frontier", "court", "returning"
  ]

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

  let imageIndex = 0; // calculation will subtract 1
  let currScrollY = 0;

  // Horizontal scrolling
  let horizontalTitles;
  let scrolledXIndex = 0;
  let currScrollX = 0;
  let horizScrollClass = ''; // smooth-scroll

  let isModalShowing = false;
  let modalTitle = "title tbd";
  const modalTypes = {
    "who": "Who Else?",
    "topic": "Topics & Ideas",
    "how": "How Do We Know?"
    }
  let modalType = "type tbd";

  function showModal(title, type) {
      // event.preventDefault();
      modalTitle = title;
      modalType = modalTypes[type];
      // console.log('modal type: ' + modalType)
      isModalShowing = true;
  };

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
</style>

<svelte:window bind:scrollY={currScrollY} />
<section class="style-wrapper-tbd">
  
  <header id="header" class="moment-header">
    <MainNav />
    <MomentNav  
    scrollToChosenIdx={scrollToChosenSlug}
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
          <p>height: {momentScrollHeight}</p>
          <!-- {#if (frames.community[imageIndex].moreWhoLinks === undefined)} -->
          {#if imageIndex > 12}
            <script>console.log('Past where Mores are defined')</script>
          {:else}
            {#if (moment.frames[imageIndex].moreWhoLinks.length > 0)}
            <h5>Who Else?</h5>
            <ul>
              {#each moment.frames[imageIndex].moreWhoLinks as link }
                <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.title, "who");}}>
                    {link.title}</a></li>
              {/each}
            </ul>     
            {/if}

            {#if (moment.frames[imageIndex].moreTopicLinks.length > 0)}
              <h5>Topics &amp; Ideas</h5>
              <ul>
                {#each moment.frames[imageIndex].moreTopicLinks as link }
                <li><a href="/" 
                  on:click={(e) => { e.preventDefault(); showModal(link.title, "topic");}}>
                  {link.title}</a></li>
                {/each}
              </ul>            
            {/if}

            {#if (moment.frames[imageIndex].moreHowLinks.length > 0)}
              <h5>How Do We Know?</h5>
              <ul>
                {#each moment.frames[imageIndex].moreHowLinks as link }
                <li><a href="/" 
                  on:click={(e) => { e.preventDefault(); showModal(link.title, "how");}}>
                  {link.title}</a></li>
                {/each}
              </ul>            
            {/if}

          {/if}

        </div> <!-- /more-container -->

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

        <h3>Who Else?</h3>
        <ul >
          {#each {length: 4} as _, i}
            {#if (moment.frames[i].moreWhoLinks.length > 0)}
              {#each moment.frames[i].moreWhoLinks as link }
                <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.title, "who");}}>
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
                    on:click={(e) => { e.preventDefault(); showModal(link.title, "topic");}}>
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
                    on:click={(e) => { e.preventDefault(); showModal(link.title, "topic");}}>
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
      </article> <!--/total-more -->

    </section> <!--/moment-scroll-->
    {#if isModalShowing}
      <Modal 
        title={modalTitle}
        modalType={modalType}
        bind:isModalShowing
      />
    {/if}

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
              <a href="/"
                on:click={(e) => { e.preventDefault(); explore();}}>
                Explore this moment <i class="fa-solid fa-chevron-down"></i>
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
