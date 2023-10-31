<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Modal from '../../../temp-modal.svelte';

  import MainNav from "../../../lib/MainNav.svelte";
  import MomentNav from "../../../lib/MomentNav.svelte";
  import frames from "../../../lib/frames.json";

  let panelHeight = 800;

  onMount(() => {
      panelHeight = window.innerHeight - 138;
  })

  let link01 = 'Carol Shelby';
  const images = [
    '02-dawn-house-color',
    '03-candle-color',
    '04-house-cutaway-color-nochim',
    'lucy-hearth'
  ];
  let imageIndex = 0;
  let currScrollY = 0;

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

  let isModalShowing = false;
  let modalTitle = "title tbd";
  const modalTypes = {"who": "Who Else?",
    "topic": "Topics & Ideas"
    }
  let modalType = "type tbd";

  function showModal(title, type) {
      // event.preventDefault();
      modalTitle = title;
      modalType = modalTypes[type];
      // console.log('modal type: ' + modalType)
      isModalShowing = true;
  };

  $: imageIndex = Math.trunc((currScrollY + panelHeight - 125)/(panelHeight))

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
    

</script>

<!--
    <div class="title-panel">
    <h1>Community Within Community</h1>
    <p>Scroll down to begin...</p>
    </div>
-->
<header id="header" class="moment-header">
    <MainNav />
    <MomentNav />
</header>

<svelte:window bind:scrollY={currScrollY} />

<section class="moment-scroll" >
    <div class="image-panel"> 
    <div class="image-panel-fixed" hx-target="#modal-container" hx-swap="outerHTML">

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

                <image 
                class="image-layer" width="100%" height="100%" 
                transform="translate(0 {houseTransY}) scale({houseScale})"
                href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/1-dark-house-proto.png" /> 
            </g>
        {/if}

        <!-- leaves -->
        {#if imageIndex < 4}
            <image transition:fade={{ duration: 500}} 
            class="image-layer" width="100%" height="100%" 
            transform="translate({leavesTransX} {leavesTransY})"
            href="http://lucy-proto.deerfield-ma.org/assets/moments/images/community/leaves-only.png" />
        {/if}


        {#if imageIndex === 3}
            <image transition:fade={{ duration: 1500}}
            href="https://lucy-proto.deerfield-ma.org/assets/moments/images/community/lucy-hearth.jpg"
            alt="svg house" 
            width="100%" height="100%"></image>
        {/if}

        <!-- Begin hotspots - needs to be after (on top of) animation full frame pngs -->

        {#if imageIndex === 0}
            <g transition:fade={{ duration: 1500}}>
                <!-- <a hx-get="/moments/more"> -->
                <a on:click={showModal} href="/">
                    <rect x="925" y="810" width="175px" height="160px" 
                    fill="#FEDA00" opacity=".3"></rect>
                </a>
            </g>
        {/if}
        {#if imageIndex === 1}
            <g transition:fade={{ duration: 1500}}>
                <!-- <a hx-get="/moments/more"> -->
                <a on:click={showModal} href="/">
                    <rect x="620" y="700" width="50px" height="120px" 
                    fill="#FEDA00" opacity=".3"></rect>
                </a>
            </g>
        {/if}

   

        </svg>
    </div> <!-- end image panel image -->

    <!-- Single dynamic more box -->
    <div class="more-container">
      <h4 class="more-tab">More</h4>
      <p>the y is at: {currScrollY} </p>
      
      <h4>More</h4>

      <!-- {#if (frames.community[imageIndex].moreWhoLinks === undefined)} -->
      {#if imageIndex > 3}
        <script>console.log('Past where Mores are defined')</script>
      {:else}
        {#if (frames.community[imageIndex].moreWhoLinks.length > 0)}
        <p>Who Else?</p>
        <ul >
          {#each frames.community[imageIndex].moreWhoLinks as link }
            <li><a href="/" 
                on:click={(e) => { e.preventDefault(); showModal(link.title, "who");}}>
                {link.title}</a></li>
          {/each}
        </ul>     
        {/if}

        {#if (frames.community[imageIndex].moreTopicLinks.length > 0)}
          <p>Topics and Ideas</p>
          <ul >
            {#each frames.community[imageIndex].moreTopicLinks as link }
            <li><a href="/" 
              on:click={(e) => { e.preventDefault(); showModal(link.title, "topic");}}>
              {link.title}</a></li>
            {/each}
          </ul>            
        {/if}

      {/if}

    </div>

    </div> <!-- /image-panel-fixed -->
    </div><!-- /image-panel -->

    <div class="story-frames">

    <article class="story" hx-target="#modal-container" hx-swap="outerHTML">
        <p>In colonial New England, work days for enslaved people began long before daybreak — long before their enslavers
        got up to begin their own work days.</p>      
    </article><!-- Frame1 : END -->

    <article class="story">
        <p>While Ebenezer and Abigail Wells continue to sleep in their comfortable bed downstairs, Lucy arises from her straw-filled mattress in the garret and lights a candle so that she can see to dress for the day.</p>
    </article><!-- Frame2 : END -->

    <article class="story">
        <p>Cesar, sleeping on another garret mattress, also awakens and dresses. Lucy and Cesar slip quietly down the stairs to the kitchen.</p>
    </article><!-- Frame3 : END -->

    <article class="story">
        <p>There, Cesar builds a new fire on the embers remaining from the night before, while Lucy begins to prepare breakfast for the Wells. She and Cesar will eat later.</p>
    </article><!-- Frame4 : END -->

    
    </div><!--/story-frames-->

    <article class="total-more">
      <h2>The Necessity for Community</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
      <h3>Who Else?</h3>
      <ul>
          <li>This person</li>
          <li>That person</li>
          <li>Another person</li>
          <li>A fourth person</li>
      </ul>
      <h3>How Do We Know?</h3>
      <ul>
          <li>an artifact</li>
          <li>a document</li>
          <li>an artifact</li>
          <li>a document</li>
      </ul>
      <h3>Topics and Ideas</h3>
      <ul>
          <li>an idea</li>
          <li>a topic</li>
          <li>an artifact</li>
          <li>a document</li>
      </ul>
      <h3>Where in the World</h3>
      <ul>
          <li>an idea</li>
          <li>a topic</li>
          <li>an artifact</li>
          <li>a document</li>
      </ul>
      <h3>Myths and Assumptions</h3>
      <ul>
          <li>an idea</li>
          <li>a topic</li>
          <li>an artifact</li>
          <li>a document</li>
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

