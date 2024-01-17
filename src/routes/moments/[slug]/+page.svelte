<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';

  import { isScrollMode } from '$lib/stores.js';
  import Modal from '../../../temp-modal.svelte';
  import MainNav from "$lib/MainNav.svelte";
  import MomentNav from "$lib/MomentNav.svelte";
  import frames from "$lib/frames.json";

  // import { page } from '$app/stores';
  // import moments from "$lib/moments.json";

  export let data;

  let panelHeight = 800;
  let panelWidth = 1200;

  const momentSlugs = ["sold", "forsale", "newlife", "wells", "church",
    "singer", "engaging", "community", "union", "revolution",
    "frontier", "court", "returning"
  ]

  // Mount is triggered 
  onMount(() => {
    panelHeight = window.innerHeight - 138;
    panelWidth = window.innerWidth;
    console.log('mount - slug: ' + data.moment.slug + ' currMomIdx: ' + currMomentIndex);
    const getIndexOfSlug = (element) => element === data.moment.slug;
    currMomentIndex = momentSlugs.findIndex(getIndexOfSlug);
    // set index
    scrolledXIndex = currMomentIndex;
    // scroll to text 
    scrollToChosen(currMomentIndex);

    // console.log('scrolledX ' + scrolledXIndex + ' currMomentIndex: ' + currMomentIndex);
    // goto(`/moments/${momentSlugs[currMomentIndex]}`)    

  })

  let currMomentIndex = 0;

  // Temporarily let this function set currMomentIndex -- 
  // should be more global/automatic
  function getPrevSlugIdx(currSlug) {
    const foundCurrIndex = (element) => element === currSlug;
    // console.log('currSlug: ' + currSlug);
    currMomentIndex = momentSlugs.findIndex(foundCurrIndex)
    // console.log('currIndex: ' + currMomentIndex)
    // Set scroll x
    // window.scrollTo(400, 0);
    return currMomentIndex - 1
  }
  function getNextSlugIdx(currSlug) {
    return currMomentIndex + 1
  }

  let imageIndex = 0;
  let currScrollY = 0;

  // Horizontal scrolling
  let horizontalTitles;
  let scrolledXIndex = 0;
  let currScrollX = 0;

  // For house parallax
  let isCaptured = false;
  let houseScrollStartY = 800;
  let houseTransY = 0;
  let houseScale = 1;
  let houseBgTransY = 0;
  let houseBgTransX = 0;
  let houseBgScale = 1;
  const zoomDelay = 130;

  // Leaves
  let leavesTransX = 0;
  let leavesTransY = 0;    
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

  function explore() {
    isScrollMode.set(true);
  }

  function tryScroll() {
    horizontalTitles.scrollLeft += panelWidth;
  }

  function scrollToChosen(chosenIndex) {
    console.log('scroll to chosen: ' + chosenIndex)

    horizontalTitles.scrollLeft = 0;
    horizontalTitles.scrollLeft += (panelWidth * chosenIndex);
  }

  function scrollToNext(chosenIndex) {
    console.log('go to index: ' + chosenIndex)
    horizontalTitles.scrollLeft += panelWidth;
  }

  function scrollToPrev(chosenIndex) {
    console.log('go to index: ' + chosenIndex)
    horizontalTitles.scrollLeft -= panelWidth;
  }

  $: imageIndex = Math.trunc((currScrollY + panelHeight - 125)/(panelHeight))

  $: scrolledXIndex = Math.trunc((currScrollX + (panelWidth/2.5))/panelWidth)
  
  $: if (currMomentIndex != scrolledXIndex) {
    currMomentIndex = scrolledXIndex;
    console.log('scrolledX ' + scrolledXIndex + ' currMomentIndex: ' + currMomentIndex);
    goto(`/moments/${momentSlugs[currMomentIndex]}`)
    // window.location.href = "/moments/forsale"
    // set next & prev links? maybe auto on loae
  }

  $: if (isModalShowing) {
      console.log("modal is now showing")
  }
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
  // Leaves
  $: if (imageIndex < 4 ) {
      leavesTransX = currScrollY/4
      leavesTransY = -currScrollY/7    
  }
  // Smoke
  $: if (imageIndex === 2) {
      animationInterval = setInterval(advance, 1200);
  } else {
    clearInterval(animationInterval);
  }

  function beenClicked(event) {
    console.log("target clicked: " + event.target.className)
  }

</script>
<svelte:window bind:scrollY={currScrollY} />

<section class="style-wrapper-tbd">
  
  <header id="header" class="moment-header">
    <MainNav />
    <MomentNav  
    scrollToChosenIdx={scrollToChosen}
    />
  </header>
  
  {#if $isScrollMode }

    <section class="moment-scroll" 
    >
    <!-- transition:slide={{ axis: 'y'}} -->
      <div class="image-panel"> 
        <div class="image-panel-fixed">

          <div class="image-panel-image">
            <svg viewBox="0 0 2000 1286" preserveAspectRatio="xMidYMid slice">

              {#if imageIndex === 0}
                  <image transition:fade={{ duration: 1500}}
                  href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/02-dawn-house-color.jpg"
                  alt="svg house" 
                  width="100%" height="100%"></image>
              {/if}
              {#if imageIndex === 1}
                  <image transition:fade={{ duration: 1500}}
                  href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/03-candle-color.jpg"
                  alt="svg house" 
                  width="100%" height="100%"></image>
              {/if}
              {#if imageIndex === 2}
                  <g transition:fade={{ duration: 1000}}>
                      <image 
                      transform="translate({houseBgTransX} {houseBgTransY}) scale({houseBgScale})"
                      href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/04-house-cutaway-color-nochim.jpg"
                      alt="svg house" 
                      width="100%" height="100%"></image>

                      <g transform="translate(0 {houseTransY}) scale({houseScale})">
                        <image 
                        class="image-layer" width="100%" height="100%" 
                        href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/1-dark-house-proto.png" /> 

                        {#if animationIndex === 0}
                          <image transition:fade={{ duration: 1200}} 
                          width="257px" height="235px" opacity=".7"
                          transform="translate(570 185)"
                          href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/smoke1.png" />
                        {/if}
            
                        {#if animationIndex === 1}
                          <image transition:fade={{ duration: 1200}} 
                          width="312px" height="273px"  opacity=".7"
                          transform="translate(600 100)"
                          href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/smoke1.png" />
                        {/if}

                        {#if animationIndex === 2}
                          <image transition:fade={{ duration: 1200}} 
                          width="454px" height="267px"  opacity=".7"
                          transform="translate(600 50)"
                          href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/smoke1.png" />
                        {/if}


                      </g>
                  </g>
              {/if}

              <!-- leaves -->
              {#if imageIndex < 4}
                  <image transition:fade={{ duration: 500}} 
                  class="image-layer" width="100%" height="100%" 
                  transform="translate({leavesTransX} {leavesTransY})"
                  href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/leaves-only.png" />
              {/if}


              {#if imageIndex === 3}
                  <image transition:fade={{ duration: 1500}}
                  href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/lucy-hearth.jpg"
                  alt="svg house" 
                  width="100%" height="100%"></image>
              {/if}

              <!-- Begin hotspots - needs to be after (on top of) animation full frame pngs -->


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
        

            </svg>
          </div> <!-- end image panel image -->

          <!-- Single dynamic more box -->
          <div class="more-container">
            <h4 class="more-tab">More</h4>
            <h4>More</h4>
            <p>scrollmode: {$isScrollMode}</p>
            <!-- {#if (frames.community[imageIndex].moreWhoLinks === undefined)} -->
            {#if imageIndex > 3}
              <script>console.log('Past where Mores are defined')</script>
            {:else}
              {#if (frames.community[imageIndex].moreWhoLinks.length > 0)}
              <h5>Who Else?</h5>
              <ul>
                {#each frames.community[imageIndex].moreWhoLinks as link }
                  <li><a href="/" 
                      on:click={(e) => { e.preventDefault(); showModal(link.title, "who");}}>
                      {link.title}</a></li>
                {/each}
              </ul>     
              {/if}

              {#if (frames.community[imageIndex].moreTopicLinks.length > 0)}
                <h5>Topics &amp; Ideas</h5>
                <ul>
                  {#each frames.community[imageIndex].moreTopicLinks as link }
                  <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.title, "topic");}}>
                    {link.title}</a></li>
                  {/each}
                </ul>            
              {/if}

              {#if (frames.community[imageIndex].moreHowLinks.length > 0)}
                <h5>How Do We Know?</h5>
                <ul>
                  {#each frames.community[imageIndex].moreHowLinks as link }
                  <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.title, "how");}}>
                    {link.title}</a></li>
                  {/each}
                </ul>            
              {/if}

            {/if}

          </div> <!-- /more-container -->
        </div> <!-- /image-panel-fixed -->
      </div><!-- /image-panel -->

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="story-frames"
        on:click={beenClicked}
      >

        <article class="story center">
            <p>In colonial New England, work days for enslaved people began long before daybreak — long before their enslavers got up to begin their own work days.</p>      
        </article><!-- Frame1 : END -->

        <article class="story left">
            <p>While Ebenezer and Abigail Wells continue to sleep in their comfortable bed downstairs, Lucy arises from her straw-filled mattress in the garret and lights a candle so that she can see to dress for the day.</p>
        </article><!-- Frame2 : END -->

        <article class="story right">
            <p>Cesar, sleeping on another garret mattress, also awakens and dresses. Lucy and Cesar slip quietly down the stairs to the kitchen.</p>
        </article><!-- Frame3 : END -->

        <article class="story left">
            <p>There, Cesar builds a new fire on the embers remaining from the night before, while Lucy begins to prepare breakfast for the Wells. She and Cesar will eat later.</p>
        </article><!-- Frame4 : END -->

        
      </div><!--/story-frames-->

      <article class="total-more">
        <h2>The Necessity for Community</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>

        <h3>Who Else?</h3>
        <ul >
          {#each {length: 4} as _, i}
            {#if (frames.community[i].moreWhoLinks.length > 0)}
              {#each frames.community[i].moreWhoLinks as link }
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
            {#if (frames.community[i].moreTopicLinks.length > 0)}
              {#each frames.community[i].moreTopicLinks as link }
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
            {#if (frames.community[i].moreHowLinks.length > 0)}
              {#each frames.community[i].moreHowLinks as link }
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
        <div class="image-panel-image">
          <img
            src="https://lucy-proto.deerfield-ma.org/assets/moments/images/titlescreens/{data.moment.slug}.jpg"
            alt="intro sketch"
          />
        </div>

  
      </div><!-- end image-panel-fixed -->   
    
      <div class="title-container">
        <div id="horizontal-titles"
          bind:this={horizontalTitles}
          
          on:scroll={()=>currScrollX=horizontalTitles.scrollLeft}  
      >
        <section>

          <div class="moment-title-block">
            <h1>Sold Out of Africa</h1>
            <p class="story-intro">
              Three-year old Lucy is among a group of captured Africans for sale in
              Bristol, Rhode Island.
            </p>
            <p class="history-intro">
              Three-year old Lucy is among a group of captured Africans for sale in
              Bristol, Rhode Island.
            </p>
          </div>

          <div class="moment-title-block">
            <h1>Sold Again</h1>
            <p class="story-intro">
              Africans who survive capture and the horrors of the Middle Passage
              encounter a new world where the loss of autonomy and the arbitrary
              power of their enslavers are the only constants.
            </p>
            <p class="history-intro">
              Three-year old Lucy is among a group of captured Africans for sale in
              Bristol, Rhode Island.
            </p>
          </div>

          <div class="moment-title-block">
            <h1>Strange New Life</h1>
            <p class="story-intro">
              Eight-year-old Lucy arrives in Deerfield and meets the couple who are
              purchasing her from Samuel Terry. Once again, her life is about to
              change but her status as an enslaved child does not.
            </p>
            <p class="history-intro">
              Three-year old Lucy is among a group of captured Africans for sale in
              Bristol, Rhode Island.
            </p>
          </div>

          <div class="moment-title-block">
            <h1>Another Title</h1>
            <p class="story-intro">
              Enslaved people often experienced multiple captivities. They could be
              sold at a moment’s notice to new captors anytime, anywhere, upending
              in the process any relationships they may have been able to establish,
              including marriage, children and siblings. Dealing with the loss of
              old connections and forging new ones required resilience, courage, and
              persistence by young and old alike.
            </p>
            <p class="history-intro">
              Three-year old Lucy is among a group of captured Africans for sale in
              Bristol, Rhode Island.
            </p>
          </div>


        </section>

      </div><!-- /title-container -->
    
      <nav class="moment-options">
        <ul>
          {#if getPrevSlugIdx(data.moment.slug) >= 0 }
            <li class="prev-moment">
              <a href="/moments/{momentSlugs[getPrevSlugIdx(data.moment.slug)]}"
              on:click={() => { scrollToPrev(getNextSlugIdx(data.moment.slug));}}
              >
                &larr; Previous moment 
              </a>
            </li>
          {/if}
          {#if (data.moment.slug === "community")}
            <li class="this-moment">
              <a href="/"
                on:click={(e) => { e.preventDefault(); explore();}}>
                Explore this moment &darr;
              </a>
            </li>
          {/if}
          
          {#if getNextSlugIdx(data.moment.slug) <= 12 }
            <li class="next-moment">
              <button on:click={tryScroll}>set x</button>
              <a href="/moments/{momentSlugs[getNextSlugIdx(data.moment.slug)]}"
              on:click={() => { scrollToNext(getNextSlugIdx(data.moment.slug));}}
              >
                currScrollX: { currScrollX } scrolledXIndex: { scrolledXIndex } Next moment &rarr;
              </a>
            </li>
          {/if}
        </ul>
      </nav>

    </section><!--/moment-title-->

  {/if}
</section> <!--/style wrapper-->
