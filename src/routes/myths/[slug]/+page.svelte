<script>
  import MainNav from "$lib/MainNav.svelte";
  export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Myths &amp; Assumptions</h1>
  </header>

  <section class="wrapper detail">

    <h2>{data.myth.title}</h2>

    <div class="about">
      {@html data.myth.full_text.html}
    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->