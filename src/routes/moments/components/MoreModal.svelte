<script>
  import { onMount } from 'svelte';
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();
  export let slug; // = 'abijah-prince';
  export let modalType; // = 'people';
  export let isModalShowing;

  import People from '../../people/components/People.svelte';
  import Evidence from '../../evidence/components/Evidence.svelte';
  import Topics from '../../topics/components/Topics.svelte';
  import Maps from '../../maps/components/Maps.svelte';
  import DeerfieldMap from '../../maps/components/DeerfieldMap.svelte';

  async function getItemInfo() {
    const response = await fetch(`https://lucy-proto.deerfield-ma.org/${modalType}/api/${slug}`);
    const values = await response.json();

    // console.log ('values: ' + values.full_text.plain);
    return values;
  }
  
  // NOTE await not used here! 
  let itemInfoPromise = getItemInfo();

  // For popup width for map
  let panelWidth = 1000;
  // should get width of element modal-basic
  // but for now, since that's70vw

  onMount(() => {
    panelWidth = (window.innerWidth * 0.7);
  })

  function switchModal(_type, _slug) {
    modalType = _type;
    slug = _slug
    itemInfoPromise = getItemInfo();
  }

  function onKeyDown(e) {
    // console.log('got to key down');
    if (e.keyCode === 27) {
      isModalShowing = false;
    }
  }

  function closeModal(e) {
    // console.log('target: ' + e.target.id)
    if (e.target.id === 'modal-overlay') {
      isModalShowing = false;
    }
  }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} 
on:click={(e) => { closeModal(e)}}/>

<div id="modal-overlay" class="">
	<div id="modal-container" class="modal-basic">
  <div id="modal-wrapper">

    <div class="modal-close">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/" on:click={(e) => { e.preventDefault(); isModalShowing = false;}}>
        <span  id="close-button" class="close"></span>
      </a>
    </div><!-- / -->
    
    {#await itemInfoPromise }
      <p>...waiting. There might not be {modalType} with a slug of {slug}</p>
      <p>Attempt a direct link: <a href="/{modalType}/{slug}"> /{modalType}/{slug}</a></p>
    {:then itemInfo}

    <article class="more-content">
      {#if modalType === 'people'}
        <h4>More: Other Lives</h4>
        <People
          {itemInfo}
        />
      {:else if modalType === 'evidence'}
        <h4>More: How Do We Know?</h4>
        <Evidence
          {itemInfo}
        />
      {:else if modalType === 'topics'}
        <h4>More: Topics and Ideas</h4>
        <Topics
          {itemInfo}
        />
      {:else if modalType === 'maps'}
        <h4>More: Where in the World?</h4>
        {#if itemInfo.slug === 'deerfield-african-americans'}
          <DeerfieldMap
            {itemInfo}
          />
        {:else}
          <Maps
            {itemInfo}
          />
        {/if}

      {/if}

      {#if itemInfo.relateds.length > 0}
        <div>
          <h3>Related</h3>
          <ul>
            {#each itemInfo.relateds as related (related.title)}
    
              <li><a href="/" 
                on:click={(e) => { e.preventDefault(); 
                  switchModal(related.content_type, related.slug);}}>
                {related.title}</a></li>            
    
            {/each}
          </ul>
        </div>
      {/if}

    </article><!-- /more-content -->

    {:catch error}
    <p>Error. There might not be {modalType} with a slug of {slug}</p>
    <p>Attempt a direct link: <a href="/{modalType}/{slug}"> /{modalType}/{slug}</a></p>
    <p style="color: red">{error.message}</p>
    {/await}
          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
</div>