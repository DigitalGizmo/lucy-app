<script>
  import { onMount } from 'svelte';
  // import { browser } from '$app/environment';
  import MainNav from "$lib/MainNav.svelte";
  import DeerfieldMap from '../components/DeerfieldMap.svelte';
  export let data;

  const itemInfo = data.map;
  const mapInfo = data.deerfield;

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
        
    <DeerfieldMap
      {itemInfo}
      {panelWidth}
      {mapInfo}
    />

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->