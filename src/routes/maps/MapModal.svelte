<script>
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();
  export let title = 'title from param';
  export let popItem;
  export let isModalShowing;
  // Send function to parent;
</script>

<style>
.map-modal {
  bottom: 0;
  display: block;
  left: 0;
  margin: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;/* this positions the modal window relative to viewport, it won't scroll with the page */  
  right: 0;
  top: 10vh;
  z-index: 100;
  max-height: 25vh;
  width: 25vw;
}
</style>

<div id="modal-container" class="map-modal">
  <div id="modal-wrapper">

    <div class="modal-close">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/" on:click={(e) => { e.preventDefault(); isModalShowing = false;}}>
        <span  id="close-button" class="close"></span>
      </a>
    </div><!-- / -->
            
    <article class="more-content">
      <h2>{popItem.title}</h2>
      <p>{popItem.blurb}</p>

      <!-- <slot name="named" />
      <p>
        <slot>No test text provided</slot>
      </p> -->
    </article><!-- /more-content -->

          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
