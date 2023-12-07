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
    <p class="menu-tools">Sort by: <a href="/">topic</a> | <a href="/">type</a></p>

    <table class="people-menu">
      <tr>
        <th class="col1">Image</th>
        <th class="col2">Title</th>
        <th class="col1">Topic</th>
        <th class="col1">Type</th>
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
          <a href='/evidence/{item.slug}'>
              {item.title}
          </a>          
        </td>
        <td>{item.year}</td>
        <td>{item.item_type}</td>
        <td>{item.menu_blurb}</td>
      </tr>
      {/each}

    </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->