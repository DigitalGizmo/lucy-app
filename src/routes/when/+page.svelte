<script>
    import MainNav from "$lib/MainNav.svelte";
    export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>When?</h1>
  </header>

  <section class="wrapper">
  <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>
    
  <div class="feature-menu maps">
      <ul class="col-heads">
        <li class="feature-title">Title</li>
        <li class="feature-blurb">About</li>
      </ul>

      <ul class="col-content">
        <li class="feature-title">Title 1</li>
        <li class="feature-blurb">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</li>
      </ul>

      <ul class="col-content">
        <li class="feature-title">Title X</li>
        <li class="feature-blurb">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</li>
      </ul>

    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->
