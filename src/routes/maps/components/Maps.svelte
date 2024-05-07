<script>
//   import DeerfieldMap from './DeerfieldMap.svelte';
  // From the generic moments/components/MoreModal "shell"
  export let itemInfo;

//   let panelWidth = 1000;

</script>


<!-- <article class="more-content">, or 
     <section class="wrapper detail"> -->

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

<!-- / more-content or wrapper detail -->