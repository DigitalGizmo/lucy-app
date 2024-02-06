<script>
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();
  export let title = 'title from param';
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
      <h2>{title}</h2>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

      <!-- <slot name="named" />
      <p>
        <slot>No test text provided</slot>
      </p> -->
    </article><!-- /more-content -->

          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
