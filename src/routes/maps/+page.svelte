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

    <table class="people-menu">
      <tr>
        <th class="col1">image</th>
        <th class="col2">Title</th>
        <th>About</th>
      </tr>

      {#each data.maps as map (map.slug)}
      <tr>

        <td>
          <img 
            src="https://lucy-proto.deerfield-ma.org/assets/maps/images/thumbpics/{map.slug}.jpg"
            alt="{map.title}" height="75" width="75"
          >
        </td>
        <td>
          <a href='/maps/{map.slug}'>
              {map.title}
          </a>          
        </td>
        <td>{map.menu_blurb}</td>
      </tr>
      {/each}

    </table>

    <ul class="menu">
      <li><a href="/maps/there">African Americans Living in Deerfield</a></li>
      <li>The Atlantic Slave Trade</li>
      <li>Slave Markets in New England</li>
    </ul>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->