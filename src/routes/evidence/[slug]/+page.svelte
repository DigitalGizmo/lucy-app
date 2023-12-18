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

  <section class="wrapper detail">
    
    <h2>{data.item.title}</h2>
    <p>{ data.item.year} { data.item.item_type}</p>

    <img 
      src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/fullpics/{data.item.slug}.jpg"
      alt="{data.item.title}"
    >

    <div class="about">
      {@html data.item.full_text.html}
    </div>

    <div>
      {#if data.item.relateds.length > 0}
        <h3>Related</h3>
        <ul style="margin:20px">
          {#each data.item.relateds as related (related.title)}
          <li><a href="{related.link}">{related.title}</a></li>
          {/each}
        </ul>
      {/if}
    </div>


  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->