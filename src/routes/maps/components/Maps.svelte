<script>
  import DeerfieldMap from './DeerfieldMap.svelte';
  // From the generic moments/components/MoreModal "shell"
  export let itemInfo;

  let panelWidth = 1000;

</script>


<!-- <article class="more-content">, or 
     <section class="wrapper detail"> -->
      
  <DeerfieldMap
    {itemInfo}
    {panelWidth}
  />
  <!-- Could be another map here in the future -->

<!-- / more-content or wrapper detail -->