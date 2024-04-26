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
    
  <table class="feature-menu maps">
    <tr>
      <th>Image</th>
      <th>Title</th>
      <th>About</th>
    </tr>

    <tr>
      <td>
        <img 
          src="https://lucy-proto.deerfield-ma.org/assets/maps/images/thumbpics/slave-trade.jpg"
          alt="title 1}"
        >
      </td>
      <td>
          Title 1
      </td>
      <td>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</td>
    </tr>
    <tr>
      <td>
        <img 
          src="https://lucy-proto.deerfield-ma.org/assets/maps/images/thumbpics/slave-trade.jpg"
          alt="title 2}"
        >
      </td>
      <td>
          Title IX
      </td>
      <td>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
    </tr>


  </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->
