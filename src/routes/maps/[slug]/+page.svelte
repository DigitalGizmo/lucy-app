<script>
  import MainNav from "$lib/MainNav.svelte";
  export let data;
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Where in the World?</h1>
  </header>


  <section class="wrapper detail">
        
    <h2>{data.map.title}</h2>

    <img 
      src="https://lucy-proto.deerfield-ma.org/assets/maps/images/fullpics/{data.map.slug}.jpg"
      alt="{data.map.title}"
    >

    <div class="about">
      {@html data.map.full_text.html}
    </div>

    <div>
      {#if data.map.relateds.length > 0}
        <h3>Related</h3>
        <ul style="margin:20px">
          {#each data.map.relateds as related (related.title)}
          <li><a href="{related.link}">{related.title}</a></li>
          {/each}
        </ul>
      {/if}
    </div>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->