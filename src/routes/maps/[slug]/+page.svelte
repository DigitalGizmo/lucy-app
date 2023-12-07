<script>
  import MainNav from "$lib/MainNav.svelte";
  export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Where in the World?</h1>
  </header>


  <section class="wrapper">
        
    <h2>{data.map.title}</h2>

    <img 
      src="https://lucy-proto.deerfield-ma.org/assets/maps/images/fullpics/{data.map.slug}.jpg"
      alt="{data.map.title}" height="200" width="300"
    >

    <div class="person-about">
      {@html data.map.full_text.html}
    </div>


  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->