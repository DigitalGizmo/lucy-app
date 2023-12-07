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

  <section class="wrapper">
    
    <table class="people-menu">
      <tr>
        <th class="col1">Myth</th>
        <th>About</th>
      </tr>

      {#each data.myths as myth (myth.slug)}
      <tr>

        <td>
          <a href='/myths/{myth.slug}'>
              {myth.title}
          </a>          
        </td>
        <td>{myth.menu_blurb}</td>
      </tr>
      {/each}

    </table>       

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->