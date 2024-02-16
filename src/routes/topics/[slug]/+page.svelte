<script>
  import MainNav from "$lib/MainNav.svelte";
  import Topics from "../components/Topics.svelte";

  export let data;
  const itemInfo = data.topic;

</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Topics &amp; Ideas</h1>
  </header>

  <section class="wrapper detail">
    <Topics
      {itemInfo}
    />        
    
  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->