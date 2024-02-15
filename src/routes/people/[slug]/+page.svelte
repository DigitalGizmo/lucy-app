<script>
  import { onMount } from 'svelte';
  import MainNav from "$lib/MainNav.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  const itemInfo = data.person;

</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Who Else?</h1>
  </header>

  <section class="wrapper detail">
        
    <h2>{itemInfo.first_name} {itemInfo.last_name}</h2>

    <p class="dates">{itemInfo.birth_year} - {itemInfo.death_year}</p>
    <h3>About this Person</h3>
    <div class="about">
      {@html itemInfo.bio.html}
    </div>

    <div>
      {#if itemInfo.relateds.length > 0}
        <h3>Related</h3>
        <ul style="margin:20px">
          {#each itemInfo.relateds as related (related.title)}
          <li><a href="{related.link}">{related.title}</a></li>
          {/each}
        </ul>
      {/if}
    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->