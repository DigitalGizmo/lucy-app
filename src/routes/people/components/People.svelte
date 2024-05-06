<script>
  export let itemInfo;
  let isMoreShowing = false;
  const readMore = 'Read more..'
  let moreLinkText = readMore

  function showMore() {
    isMoreShowing = !isMoreShowing;
    moreLinkText = isMoreShowing ? 'Show less' : readMore

  };
</script>


<!-- <article class="more-content">, or 
      <section class="wrapper detail"> -->

  <h4>More: <a href="/people">Other Lives</a></h4>

  <h2>{itemInfo.first_name} {itemInfo.last_name}</h2>

  <p class="dates">{itemInfo.birth_year} - {itemInfo.death_year}</p>

  <h3>About This Person</h3>
  {@html itemInfo.bio.html}
  {#if itemInfo.has_more}
        <a href="/"
        on:click={(e) => { e.preventDefault(); showMore();}}>
        {moreLinkText}
    </a>
  {/if}
  {#if isMoreShowing}
    {@html itemInfo.more_text.html}
  {/if}

  <div>
    {#if itemInfo.relateds.length > 0}
      <h3>Related</h3>
      <ul>
        {#each itemInfo.relateds as related (related.title)}
        <li><a data-sveltekit-reload href="{related.link}">{related.title}</a></li>
        {/each}
      </ul>
    {/if}
  </div>

  <!-- / more-content or wrapper detail -->