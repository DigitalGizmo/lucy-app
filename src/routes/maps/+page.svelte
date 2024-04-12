<script>
    import MainNav from "$lib/MainNav.svelte";
    export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Where In the World?</h1>
  </header>

  <section class="wrapper">
    <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>

    <table class="feature-menu maps">
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>About</th>
      </tr>

      {#each data.maps as map (map.slug)}
      <tr>

        <td>
          <img 
            src="https://lucy-proto.deerfield-ma.org/assets/maps/images/thumbpics/{map.slug}.jpg"
            alt="{map.title}"
          >
        </td>
        <td>
          {#if map.prod_status > 1}
            <a href='/maps/{map.slug}'>
                {map.title}
            </a>          
          {:else}
            {map.title}
          {/if}                   
        </td>
        <td>{map.menu_blurb}</td>
      </tr>
      {/each}

    </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->