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

  <section class="wrapper detail">
        
    <h2>{data.person.first_name} {data.person.last_name}</h2>

    <p class="dates">{data.person.birth_year} - {data.person.death_year}</p>
    <h3>About this Person</h3>
    <div class="about">
      {@html data.person.bio.html}
    </div>

    <div>
      {#if data.person.relateds.length > 0}
        <h3>Related</h3>
        <ul style="margin:20px">
          {#each data.person.relateds as related (related.title)}
          <li><a href="{related.link}">{related.title}</a></li>
          {/each}
        </ul>
      {/if}
    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->