<script>
  import MainNav from "$lib/MainNav.svelte";
  export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>How Do We Know?</h1>
  </header>

  <section class="wrapper">
    
    <h2>{data.item.title}</h2>
    <p>{ data.item.year} { data.item.item_type}</p>

    <img 
      src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/fullpics/{data.item.slug}.jpg"
      alt="{data.item.title}" height="200" width="300"
    >

    <div class="person-about">
      {@html data.item.full_text.html}
    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->