<script>
    export let itemInfo;
</script>


<!-- <article class="more-content">, or 
      <section class="wrapper detail"> -->
  <h4>More: <a href="/people">How Do We Know?</a> </h4>

  <h2>
      {itemInfo.title}
  </h2>
  <p> { itemInfo.year ? itemInfo.year : ''} 
    { itemInfo.item_type}</p>
  <figure>
    <img 
      src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/fullpics/{itemInfo.slug}.jpg"
      alt="{itemInfo.title}"

      width="600px" height="400px"

    >

    <figcaption>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</figcaption>
  </figure>

  <div class="about">
    {@html itemInfo.full_text.html}
  </div>

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
  <!-- / more-content or wrapper detail -->