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
    <p class="menu-tools">Sort by gender | Sort by date | Sort by name</p>
    <ul class="menu">
      {#each data.people as person (person.first_name)}
        <li>
          <a href='/people/{person.slug}'>
            {person.first_name} {person.last_name}
          </a> -- 
          {person.birth_year} {person.death_year} {person.menu_blurb} 
        </li>
      {/each}

      <li>Elizabeth Freeman (Mum Bett)</li>
      <li>Peter Wells</li>
      <li>Susan Wells</li>
      <li>Ishmael Turner</li>
      <li>Quash Gomer</li>
      <li>Caleb Sharp</li>
      <li>Heber Honest Man</li>
      <li>Crispus Attucks</li>
      <li>Chloe Silliman</li>
      <li>Caesar Freeman</li>
      <li>Peter Green</li>
      <li>Valentine Harris</li>
      <li>Agrippa Hull</li>
      <li>Amos Hull</li>
      <li>Moses Sash</li>
      <li>Ishmael Turner</li>
      <li>Jeffrey Brace</li>
      <li>Jin (Jenny) Cole</li>
      <li>Cato Cole</li>
    </ul>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->

