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
      <p>Community building was vital for Black Americans living in colonial and revolutionary America. Most African Americans living at that time were enslaved; many, particularly in the North, lived in the homes of their enslavers. Developing a web of relationships with other people of color beyond the boundaries of the household was essential to enslaved Black people’s emotional, mental and physical health.</p>

      <p>Creating such a community occurred both intentionally and organically. Carrying out errands for enslavers, for example, provided opportunities to interact with others beyond the household. A person running errands could stop and talk to another servant or enslaved person, asking about one another’s day, sharing news, and asking after friends and family.  Such day-to-day human interactions among people living in bondage were essential to their retaining a sense of self and building community.</p>

      <h2>Questions to Consider</h2>
      <ul class="questions">
        <li>What options, if any did an enslaved woman have if she wanted to ensure her children would be born free?</li>
        <li>What challenges did enslaved people face in their attempts to sustain family and community ties?</li>
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
