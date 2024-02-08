<script>
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();
  export let popItem;
  export let isModalShowing;
  // Send function to parent;
</script>

<div class="map-modal" style="left: {popItem.pLeft}%; top: {popItem.pTop}vh;">
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
    </article><!-- /more-content -->
          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
