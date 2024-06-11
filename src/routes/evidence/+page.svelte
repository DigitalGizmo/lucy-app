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

    <div class="feature-menu evidence">
      <ul class="col-heads">
        <li class="feature-thumb">Image</li>
        <li class="feature-title">Title</li>
        <li class="feature-date">Date</li>
        <li class="feature-type">Type</li>
        <li class="feature-blurb">About</li>
      </ul>

      {#each data.items as item (item.slug)}
      <ul class="col-content">
        <li class="feature-thumb">
          <a href='/evidence/{item.slug}'>
            <img 
              src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/thumbpics/{item.slug}.jpg"
              alt="{item.title}"
            >
          </a>
        </li>
        <li class="feature-title">
          {#if item.prod_status > 1}
            <a href='/evidence/{item.slug}'>
              {item.title}
            </a> 
          {:else}
            {item.title}
          {/if}                   
        </li>
        <li class="feature-date">{item.year}</li>
        <li class="feature-type">{item.item_type}</li>
        <li class="feature-blurb">{item.menu_blurb}</li>
      </ul>
      {/each}

    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->