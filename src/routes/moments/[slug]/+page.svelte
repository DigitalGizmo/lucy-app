<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { isScrollMode } from '$lib/stores.js';
  import MainNav from "$lib/MainNav.svelte";
  import MomentNav from '../components/MomentNav.svelte';
  import Moment from '../components/Moment.svelte';
  export let data;

  let panelHeight = 800;
  let panelWidth = 1200;
  let currScrollY = 0;

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
  // Horizontal scrolling
  let horizontalTitles;
  let scrolledXIndex = 0;
  let currScrollX = 0;
  let horizScrollClass = ''; // smooth-scroll

  async function explore() {
    isScrollMode.set(true);
  }

  // ----- Titles-----
  async function scrollToChosen(chosenIndex) {
    // console.log('scroll to chosen: ' + chosenIndex)
    // Jump, don't smooth scroll
    isScrollMode.set(false);


    // stopAudio();


    horizScrollClass = '';
    await tick();
    horizontalTitles.scrollLeft = 0;
    horizontalTitles.scrollLeft += (panelWidth * chosenIndex);
  }

  async function scrollToChosenSlug(chosenIndex, slug) {
    // console.log('scrollToChosenSlug, idx: ' + chosenIndex + ' slug: ' + slug) 
    isScrollMode.set(false);
    // Wait for horizontalTitle to resolve (it wasn't present in scrollMode)
    await tick();
    // Not sure if there might be a better sequence
    currMomentIndex = chosenIndex;
    goto(`/moments/${slug}`)    
    horizScrollClass = '';
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

  $: scrolledXIndex = Math.trunc((currScrollX + (panelWidth/2.5))/panelWidth)
  // update which moment we're looking at
  $: moment = data.moments.find((moment) => moment.slug === momentSlugs[currMomentIndex]);
  
  $: if (currMomentIndex != scrolledXIndex) {
    currMomentIndex = scrolledXIndex;
    // console.log('scrolledX ' + scrolledXIndex + ' currMomentIndex: ' + currMomentIndex);
    goto(`/moments/${momentSlugs[currMomentIndex]}`)
  }
</script>

<svelte:window bind:scrollY={currScrollY} />
<section class="style-wrapper-tbd">
  
  <header id="header" class="moment-header">
    <MainNav />
    <MomentNav  
      scrollToChosenIdx={scrollToChosenSlug}
    />
  </header>
  
  {#if $isScrollMode }

    <Moment 
      {currMomentIndex}
      {currScrollY}
      {panelHeight}
      {moment}
      {scrollToChosenSlug}

    />

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

          <div class="content-container">
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
          </div> <!-- /content-container -->

        </div> <!-- /horizontal titles -->
      </div><!-- /title-container -->
    
      <nav class="moment-options">
        <ul>
          {#if getPrevSlugIdx(moment.slug) >= 0 }
            <li class="prev-moment">
              <a href="/moments/{momentSlugs[getPrevSlugIdx(moment.slug)]}"
              on:click={() => { scrollToPrev(getNextSlugIdx(moment.slug));}}>
                
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8666 3.8147e-06L21.0156 3.149L8.55361 15.6333H35.7333V20.1H8.55361L21.0379 32.562L17.8666 35.7333L-5.72205e-05 17.8667L17.8666 3.8147e-06Z"/>
                </svg>
                <!-- <i class="fa-solid fa-chevron-left"></i> {data.moments[getPrevSlugIdx(moment.slug)].title} -->
              </a>
            </li>
          {/if}
          {#if (currMomentIndex == 7)}
            <li class="this-moment">
              <a href="/" on:click={(e) => { e.preventDefault(); explore();}}>
                Explore this moment
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.3666 18.0111L33.2176 14.8621L20.7333 27.3241V0.14444H16.2666V27.3241L3.80463 14.8398L0.633301 18.0111L18.5 35.8778L36.3666 18.0111Z"/>
                </svg>

              </a>
            </li>
          {/if}
          
          {#if getNextSlugIdx(moment.slug) <= 12 }
            <li class="next-moment">
              <a href="/moments/{momentSlugs[getNextSlugIdx(moment.slug)]}"
              on:click={() => { scrollToNext(getNextSlugIdx(moment.slug));}}>
                <!-- X: { currScrollX } Idx: { scrolledXIndex }  -->
                <!-- {data.moments[getNextSlugIdx(moment.slug)].title} <i class="fa-solid fa-chevron-right"></i> -->

                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8667 3.8147e-06L14.7177 3.149L27.1797 15.6333H0V20.1H27.1797L14.6953 32.562L17.8667 35.7333L35.7333 17.8667L17.8667 3.8147e-06Z"/>
                </svg>
              </a>
            </li>
          {/if}
        </ul>
      </nav>
    </section><!--/moment-title-->

  {/if} <!-- end if isScrollMode -->
</section> <!--/style wrapper-->
