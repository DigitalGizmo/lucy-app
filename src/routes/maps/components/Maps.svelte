<script>
//   import DeerfieldMap from './DeerfieldMap.svelte';
  // From the generic moments/components/MoreModal "shell"
  export let itemInfo;

//   let panelWidth = 1000;

</script>


<!-- <article class="more-content">, or 
     <section class="wrapper detail"> -->

<h4>More: <a href="/maps">Where in the World?</a></h4>

<h2>
    {itemInfo.title}
</h2>

<figure>
    <img 
        src="https://lucy-proto.deerfield-ma.org/assets/maps/images/fullpics/{itemInfo.slug}.jpg"
        alt="{itemInfo.title}"
    >
    <!-- <figcaption>{itemInfo.caption}</figcaption> -->
</figure>

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