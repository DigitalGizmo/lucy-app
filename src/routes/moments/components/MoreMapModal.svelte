<script>
    // import { createEventDispatcher } from "svelte";
    // const dispatch = createEventDispatcher();
    export let slug; // = 'abijah-prince';
    export let modalType; // = 'people';
    export let isModalShowing;

    async function getMoreInfo() {
      const response = await fetch(`https://lucy-proto.deerfield-ma.org/${modalType}/api/${slug}`);
      const values = await response.json();

      // console.log ('values: ' + values.full_text.plain);
      return values;
    }
  
  // NOTE await not used here! 
  let moreInfoPromise = getMoreInfo();

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
            
    <article class="more-content">
      <h4>More: <a href="/{modalType}">{modalType} </a> </h4>
      {#await moreInfoPromise }
        <p>...waiting. There might not be {modalType} with a slug of {slug}</p>
        <p>Attempt a direct link: <a href="/{modalType}/{slug}"> /{modalType}/{slug}</a></p>
      {:then moreInfo}
        <h2>
          
          {#if modalType === 'people'}
            {moreInfo.first_name} {moreInfo.last_name}
          {:else}
            {moreInfo.title}
          {/if}          
        </h2>
        <figure>
          <img src="https://placehold.co/600x400"
              alt="placehoder showing 600 x 400"/>
          <figcaption>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</figcaption>
        </figure>
        {#if modalType === 'people'}
          {@html moreInfo.bio.html}
        {:else}
          {@html moreInfo.full_text.html}
        {/if}
      {:catch error}
          <p style="color: red">{error.message}</p>
      {/await}




      <!-- <slot name="named" />
      <p>
        <slot>No test text provided</slot>
      </p> -->
    </article><!-- /more-content -->

          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
</div>