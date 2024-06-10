<script>
  import { onMount } from 'svelte';
  // import { browser } from '$app/environment';
  import MainNav from "$lib/MainNav.svelte";
  import DeerfieldMap from '../components/DeerfieldMap.svelte';
  import Maps from '../components/Maps.svelte';
  export let data;

  const itemInfo = data.map;
  // const mapInfo = data.deerfield;

  let panelWidth = 1200;

  onMount(() => {
    panelWidth = window.innerWidth;
  })

  // function resetWidth() {
  //   console.log('width' +  window.innerWidth);
  //   panelWidth = window.innerWidth;
  // }
  // document.window.onresize = resetWidth;

 </script>
  
<section class="wireframe-wrapper">

  <header id="header">
    <MainNav />
    <h1>Where in the World?</h1>
  </header>

  <section class="wrapper detail">
    <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>
    <h4><a href="/maps">Where in the World?</a></h4>
        
    {#if itemInfo.slug == 'deerfield-african-americans'}
        <DeerfieldMap
        {itemInfo}
        {panelWidth}
        />
    {:else}
        <Maps
            {itemInfo}
        />
    {/if}

    {#if itemInfo.relateds.length > 0}
      <div>
        <h3>Related</h3>
        <ul>
          {#each itemInfo.relateds as related (related.title)}
          <li><a data-sveltekit-reload 
            href="/{related.content_type}/{related.slug}">{related.title}</a></li>
          {/each}
        </ul>
      </div>
    {/if}
        
  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->