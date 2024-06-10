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

  <h2>{itemInfo.first_name} {itemInfo.last_name}</h2>

  <p class="dates">
    {#if itemInfo.birth_year}
      {itemInfo.birth_year} 
    {:else}
      {itemInfo.birth_text}
    {/if}
    - 
    {#if itemInfo.death_year}
      {itemInfo.death_year} 
    {:else}
      {itemInfo.death_text}
    {/if}

  </p>

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

  <!-- / more-content or wrapper detail -->