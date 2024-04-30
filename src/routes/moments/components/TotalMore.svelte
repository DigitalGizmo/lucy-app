<script>
  export let moment;
  export let showModal = () => {}; // no-operation function
//   export let scrollToChosen = () => {}; // no-operation function
  export let scrollToChosenSlug = () => {}; // no-operation function

  // Create lists with unique values
  // credit to https://www.tutorialspoint.com/extract-unique-objects-by-attribute-from-an-array-of-objects-in-javascript
  const moreWhosAll = [];
  const moreHowsAll = [];
  const moreTopicsAll = [];
  const moreWheresAll = [];
  for (let frame of moment.frames) {
    for (let record of frame.moreWhoLinks) {
        moreWhosAll.push(record)
    }
    for (let record of frame.moreHowLinks) {
        moreHowsAll.push(record)
    }
    for (let record of frame.moreTopicLinks) {
        moreTopicsAll.push(record)
    }
    for (let record of frame.moreWhereLinks) {
        moreWheresAll.push(record)
    }
  }

  function getUnique(fullArray) {
    var itemMap = new Map();
    for (let moreItem of fullArray) {
        itemMap.set(moreItem["slug"], moreItem);
    }
    var interatorItemValues = itemMap.values();
    return [...interatorItemValues];
  }

  const uniqueWhos = getUnique(moreWhosAll);
  const uniqueHows = getUnique(moreHowsAll);
  const uniqueTopics = getUnique(moreTopicsAll);
  const uniqueWheres = getUnique(moreWheresAll);

</script>


<article class="total-more">
    <header>
      <h1>Community Within Community</h1>
    </header>
    <div class="total-more-essay">
      <h2>The Necessity for Community</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>

      <h2>Questions to Consider</h2>
      <ul class="questions">
        <li>If you were enslaved, would you choose to have children?</li>
        <li>What risks might you be willing to take to maintain friendships?</li>
        <li>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consecteture?</li>
      </ul>

      <p>Follow Lucy's story&hellip;</p>
      <h3>Next: 
        <a href="/moments/union"
          on:click={() => { scrollToChosenSlug(8, 'union');}}>
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
          {#each uniqueWhos as link}
            <li><a href="/" 
                on:click={(e) => { e.preventDefault(); showModal(link.slug, "people");}}>
                {link.title}</a></li>
          {/each}
        </ul>        

        <h3>How Do We Know?</h3>
        <ul >
          {#each uniqueHows as link}
            <li><a href="/" 
              on:click={(e) => { e.preventDefault(); showModal(link.slug, "evidence");}}>
              {link.title}</a></li>
          {/each}
        </ul>        
        
        <h3>Topics &amp; Ideas</h3>
        <ul >
          {#each uniqueTopics as link}
          <li><a href="/" 
            on:click={(e) => { e.preventDefault(); showModal(link.slug, "topics");}}>
            {link.title}</a></li>
          {/each}
        </ul>        
          
        <h3>Where in the world?</h3>
        <ul >
          {#each uniqueWheres as link}
          <li><a href="/" 
            on:click={(e) => { e.preventDefault(); showModal(link.slug, "maps");}}>
            {link.title}</a></li>
          {/each}
        </ul>        
          
      {/if}
    </div>

  </article> <!--/total-more -->
