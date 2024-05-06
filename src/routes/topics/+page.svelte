<script>
    import MainNav from "$lib/MainNav.svelte";
    export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Topics &amp; Ideas</h1>
  </header>

  <section class="wrapper">
    <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>
    
    <div class="feature-menu topics">
      <ul class="col-heads">
        <li class="feature-title">Topic</li>
        <li class="feature-blurb">About</li>
      </ul>

      {#each data.topics as topic (topic.slug)}
      <ul class="col-content">
        <li class="feature-title">
          {#if topic.prod_status > 1}
            <a href='/topics/{topic.slug}'>
                {topic.title}
            </a>          
          {:else}
            {topic.title}
          {/if}                   

        </li>
        <li class="feature-blurb">{topic.menu_blurb}</li>
      </ul>
      {/each}

    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->
