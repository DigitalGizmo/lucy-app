<script>
  import MainNav from "$lib/MainNav.svelte";
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Who Else?</h1>
  </header>

  <section class="wrapper">
    <p class="menu-tools">Sort by: <a href="#">name</a> | <a href="#">date</a> | <a href="#">gender</a></p>

    <table class="people-menu">
      <tr>
        <th class="col1">Name</th>
        <th class="col2">Dates</th>
        <th>About</th>
      </tr>

      {#each data.people as person (person.slug)}
      <tr>

        <td>
          <a href='/people/{person.slug}'>
              {person.first_name} {person.last_name}
          </a>          
        </td>
        <td>{person.birth_year} - {person.death_year}</td>
        <td>{person.menu_blurb}</td>
      </tr>
      {/each}

    </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->

