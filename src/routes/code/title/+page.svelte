<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { isScrollMode } from '$lib/stores.js';
  import Modal from '../../../temp-modal.svelte';
  import MainNav from "$lib/MainNav.svelte";
  import MomentNav from "$lib/MomentNav.svelte";
  import frames from "$lib/frames.json";

  // import { page } from '$app/stores';
  // import moments from "$lib/moments.json";
  //   export let data;

  let panelHeight = 800;
  // let isScrollModeValue;

  const momentSlugs = ["sold", "forsale", "newlife", "wells", "church",
    "singer", "engaging", "community", "union", "revolution",
    "frontier", "court", "returning"
  ]

  onMount(() => {
    panelHeight = window.innerHeight - 138;
  })

  let horizontalTitles, sLeft;

</script>
<!-- svelte:window bind:scrollY={currScrollY}  -->

<section class="style-wrapper-tbd">
  
  <header id="header" class="moment-header">
    <MainNav />
    <MomentNav  />
  </header>
  
  <!-- if $isScrollMode removed -->
  <!-- title mode -->
    <section class="moment-title">

      <div class="image-panel-fixed">
        <div class="image-panel-image">
          <img
            src="https://lucy-proto.deerfield-ma.org/assets/moments/images/titlescreens/sold.jpg"
            alt="intro sketch"
          />
        </div>

        <nav class="moment-options">
          <ul>
              <li class="prev-moment">
                <a href="/code/title">&larr; Previous moment</a>
              </li>
              <li class="this-moment">
                <a href="/code/title">Inactive &darr;</a>
              </li>
              <li class="next-moment">
                <a href="/code/title">Next moment &rarr;</a>
              </li>
          </ul>
        </nav>

      </div><!-- end image-panel-fixed -->   
    
      <div class="title-container">
        <div id="horizontal-titles"
          bind:this={horizontalTitles}
          on:scroll={(e)=> console.log('left :' + e.target.scrollLeft)} >
           
           <section>
            <div>
              <h2>Sold Out of Africa</h2>
              <p>
                Three-year old Lucy is among a group of captured Africans for sale in
                Bristol, Rhode Island.
              </p>
            </div>

            <div>
              <h2>Sold Again</h2>
              <p>
                Africans who survive capture and the horrors of the Middle Passage
                encounter a new world where the loss of autonomy and the arbitrary
                power of their enslavers are the only constants.
              </p>
            </div>

            <div>
              <h2>Strange New Life</h2>
              <p>
                Eight-year-old Lucy arrives in Deerfield and meets the couple who are
                purchasing her from Samuel Terry. Once again, her life is about to
                change but her status as an enslaved child does not.
              </p>
            </div>

            <div>
              <h2>Another Title</h2>
              <p>
                Enslaved people often experienced multiple captivities. They could be
                sold at a moment’s notice to new captors anytime, anywhere, upending
                in the process any relationships they may have been able to establish,
                including marriage, children and siblings. Dealing with the loss of
                old connections and forging new ones required resilience, courage, and
                persistence by young and old alike.
              </p>
            </div>
          </section>
    
        </div><!-- /horizontal-titles -->
      </div><!-- /title-container -->
    </section><!--/moment-title-->
</section> <!--/style wrapper-->
