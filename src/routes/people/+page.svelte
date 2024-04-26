<script>
  import MainNav from "$lib/MainNav.svelte";
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Other Lives</h1>
  </header>

  <section class="wrapper">

  <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>

    <table class="feature-menu people">
      <tr>
        <th class="col-title">Name</th>
        <th class="col-date">Dates</th>
        <th>About</th>
      </tr>

      {#each data.people as person (person.slug)}
      <tr>
        <td>
          {#if person.prod_status > 1}
            <a href='/people/{person.slug}'>
              {person.first_name} {person.last_name}
            </a> 
          {:else}
            {person.first_name} {person.last_name}
          {/if}         
        </td>
        <td>{person.birth_year} - {person.death_year}</td>
        <td>{person.menu_blurb}</td>
      </tr>
      {/each}

    </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->

