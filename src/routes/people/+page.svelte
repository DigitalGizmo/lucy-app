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

    <div class="feature-menu people">
      <ul class="col-heads">
        <li class="feature-title">Name</li>
        <li class="feature-date">Dates</li>
        <li class="feature-blurb">About</li>
      </ul>

      {#each data.people as person (person.slug)}
      <ul class="col-content">
        <li class="feature-title">
          {#if person.prod_status > 1}
            <a href='/people/{person.slug}'>
              {person.first_name} {person.last_name}
            </a> 
          {:else}
            {person.first_name} {person.last_name}
          {/if}         
        </li>
        <li class="feature-date">
          {#if person.birth_year}
            {person.birth_year} 
          {:else}
            {person.birth_text}
          {/if}
          - 
          {#if person.death_year}
            {person.death_year} 
          {:else}
            {person.death_text}
          {/if}
        </li>
        <li class="feature-blurb">{person.menu_blurb}</li>
      </ul>
      {/each}

    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->

