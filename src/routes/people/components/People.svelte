<script>
    export let itemInfo;
</script>


<!-- <article class="more-content"> -->

  <h4>More: <a href="/people">Who Else?</a> </h4>

  <h2>{itemInfo.first_name} {itemInfo.last_name}</h2>

  <p class="dates">{itemInfo.birth_year} - {itemInfo.death_year}</p>

  <h3>About This Person</h3>
  {@html itemInfo.bio.html}

  <div>
    {#if itemInfo.relateds.length > 0}
      <h3>Related</h3>
      <ul style="margin:20px">
        {#each itemInfo.relateds as related (related.title)}
        <li><a href="{related.link}">{related.title}</a></li>
        {/each}
      </ul>
    {/if}
  </div>

  <!-- </article> -->
  <!-- /more-content -->