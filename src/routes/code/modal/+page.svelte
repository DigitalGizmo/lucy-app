<script>
    import { onMount } from 'svelte';

    let testBind;
    let yTop = 0;

  function parseScroll() {
		yTop=testBind.scrollTop;
    console.log('scrollY: ' + testBind.scrollTop);

	}
	
	onMount(()=>parseScroll())
  console.log('just mounted')


</script>

<div id="modal-overlay" class="">
	<div id="modal-container" class="modal-basic">
  <div id="modal-wrapper">
         
    <article class="more-content"
      bind:this={testBind}
      on:scroll={(e)=> console.log('top:' + e.target.scrollLeft)}   
    >
      <h4>More: testing</h4>
      <h2>title yTop: {yTop}</h2>
      <figure>
        <img src="https://placehold.co/600x400"
            alt="placehoder showing 600 x 400"/>
        <figcaption>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</figcaption>
      </figure>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
        yTop: {yTop}
      </p>

      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

    </article><!-- /more-content -->

          
  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
</div>