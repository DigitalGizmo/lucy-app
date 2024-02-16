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

    <Evidence
      {itemInfo}
    />  


  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->