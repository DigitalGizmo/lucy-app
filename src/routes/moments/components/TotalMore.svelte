<script>
  export let moment;
  export let showModal = () => {}; // no-operation function
  export let scrollToChosen = () => {}; // no-operation function
</script>


<article class="total-more">
    <div class="total-more-essay">
      <h2>The Necessity for Community</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
      <p>Follow Lucy's story&hellip;</p>
      <h3>Next: 
        <a href="/moments/fruitful-union"
          on:click={() => { scrollToChosen(8);}}>
          Fruitful Union
        </a>

        <!-- The dynamic next for future reference -->
        <!-- <a href="/moments/{momentSlugs[getNextSlugIdx(moment.slug)]}"
          on:click={() => { scrollToChosen(getNextSlugIdx(moment.slug, moment.slug));}}>
          {data.moments[getNextSlugIdx(moment.slug)].title}
        </a>         -->
      </h3>

    </div>

    <div class="total-more-list">
      {#if moment.frames[0]}

        <h3>Who Else?</h3>
        <ul >
          {#each moment.frames as frame}
            {#if (frame.moreWhoLinks.length > 0)}
              {#each frame.moreWhoLinks as link }
                <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.slug, "people");}}>
                    {link.title}</a></li>
              {/each}
            {/if}
          {/each}
        </ul>

        <h3>How Do We Know?</h3>
        <ul>
          {#each moment.frames as frame}
            {#if (frame.moreHowLinks.length > 0)}
              {#each frame.moreHowLinks as link }
                <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.slug, "evidence");}}>
                    {link.title}</a></li>
              {/each}
            {/if}
          {/each}
        </ul>

        <h3>Topics &amp; Ideas</h3>
        <ul>
          {#each moment.frames as frame}
            {#if (frame.moreTopicLinks.length > 0)}
              {#each frame.moreTopicLinks as link }
                <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.slug, "topics");}}>
                    {link.title}</a></li>
              {/each}
            {/if}
          {/each}
        </ul> 

        <h3>Where in the world?</h3>
        <ul>
          {#each moment.frames as frame}
            {#if (frame.moreWhereLinks.length > 0)}
              {#each frame.moreWhereLinks as link }
                <li><a href="/" 
                    on:click={(e) => { e.preventDefault(); showModal(link.slug, "maps");}}>
                    {link.title}</a></li>
              {/each}
            {/if}
          {/each}
        </ul>
      {/if}
    </div>

  </article> <!--/total-more -->
