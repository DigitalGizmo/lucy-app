<script>
  // import { onMount } from 'svelte';
  import MainNav from "$lib/MainNav.svelte";
  import People from '../../people/components/People.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const itemInfo = data.person;

</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Other Lives</h1>
  </header>

  <section class="wrapper detail">
    <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>
    <h4><a href="/people">Other Lives</a></h4>

    <People
      {itemInfo}
    />        

    {#if itemInfo.relateds.length > 0}
      <div>
        <h3>Related</h3>
        <ul>
          {#each itemInfo.relateds as related (related.title)}
          <li><a data-sveltekit-reload 
            href="/{related.content_type}/{related.slug}">{related.title}</a></li>
          {/each}
        </ul>
      </div>
    {/if}
    
  </section><!-- /wrapper -->

</section><!-- /wireframe-wrapper -->