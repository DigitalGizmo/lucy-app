<script>
    // import { createEventDispatcher } from "svelte";
    // const dispatch = createEventDispatcher();
    export let slug; // = 'abijah-prince';
    export let modalType; // = 'people';
    export let isModalShowing;

    import People from '../../people/components/People.svelte';
    import Evidence from '../../evidence/components/Evidence.svelte';
    import Topics from '../../topics/components/Topics.svelte';
    import Maps from '../../maps/components/Maps.svelte';

    async function getItemInfo() {
      const response = await fetch(`https://lucy-proto.deerfield-ma.org/${modalType}/api/${slug}`);
      const values = await response.json();

      // console.log ('values: ' + values.full_text.plain);
      return values;
    }
  
  // NOTE await not used here! 
  let itemInfoPromise = getItemInfo();

</script>

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

    {#if modalType === 'people'}
      <People
        {itemInfo}
      />
    {:else if modalType === 'evidence'}
      <Evidence
      {itemInfo}
      />
    {:else if modalType === 'topics'}
      <Topics
      {itemInfo}
      />
    {:else if modalType === 'maps'}
      <Maps
      {itemInfo}
      />
    {/if}

    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
      
          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
</div>