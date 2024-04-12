<script>
  import MainNav from "$lib/MainNav.svelte";
  import Evidence from "../components/Evidence.svelte";
  export let data;

  const itemInfo = data.item;

</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>How Do We Know?</h1>
  </header>

  <section class="wrapper detail">
    <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>
    
    <Evidence
      {itemInfo}
    />  


  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->