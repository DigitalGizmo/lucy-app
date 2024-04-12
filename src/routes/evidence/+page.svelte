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
    <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>

    <table class="feature-menu evidence">
      <tr>
        <th>Image</th>
        <th class="col-title">Title</th>
        <th>Date</th>
        <th>Type</th>
        <th>About</th>
      </tr>

      {#each data.items as item (item.slug)}
      <tr>

        <td>
          <img 
            src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/thumbpics/{item.slug}.jpg"
            alt="{item.title}"
          >
        </td>
        <td>
          {#if item.prod_status > 1}
            <a href='/evidence/{item.slug}'>
              {item.title}
            </a> 
          {:else}
            {item.title}
          {/if}                   
        </td>
        <td>{item.year}</td>
        <td>{item.item_type}</td>
        <td>{item.menu_blurb}</td>
      </tr>
      {/each}

    </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->