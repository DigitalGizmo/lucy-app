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

    <div class="feature-menu maps">
      <ul class="col-heads">
        <li class="feature-thumb">Image</li>
        <li class="feature-title">Title</li>
        <li class="feature-blurb">About</li>
      </ul>

      {#each data.maps as map (map.slug)}
      <ul class="col-content">

        <li class="feature-thumb">
          <a href='/maps/{map.slug}'>
            <img 
              src="https://lucy-proto.deerfield-ma.org/assets/maps/images/thumbpics/{map.slug}.jpg"
              alt="{map.title}"
            >
          </a>
        </li>
        <li class="feature-title">
          {#if map.prod_status > 1}
            <a href='/maps/{map.slug}'>
                {map.title}
            </a>          
          {:else}
            {map.title}
          {/if}                   
        </li>
        <li class="feature-blurb">{map.menu_blurb}</li>
      </ul>
      {/each}

    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->