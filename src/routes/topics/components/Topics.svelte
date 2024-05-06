<script>
    export let itemInfo;
</script>


<!-- <article class="more-content">, or 
      <section class="wrapper detail"> -->
  <h4>More: <a href="/topics">Topics and Ideas</a></h4>

  <h2>
      {itemInfo.title}
  </h2>

  {#if itemInfo.has_video}
    <figure>
      <!-- svelte-ignore a11y-aria-attributes -->
      <video width="320" height="240" controls>
        <source src="https://lucy-proto.deerfield-ma.org/assets/topics/video/{itemInfo.slug}.mp4" 
        type="video/mp4">
        Your browser does not support the video tag.
        <track src="./dummy.vtt" kind="captions" 
        srclang="en" label="english_captions">
      </video>
    </figure>
  {/if}
  {#if itemInfo.has_image}
    <figure>
        <img 
        src="https://lucy-proto.deerfield-ma.org/assets/topics/images/{itemInfo.slug}.jpg"
        alt="{itemInfo.title}"
        >
        <figcaption>{itemInfo.caption}</figcaption>
    </figure>
  {/if}


  <div class="about">
    <h3>About</h3>
    {@html itemInfo.full_text.html}
  </div>

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