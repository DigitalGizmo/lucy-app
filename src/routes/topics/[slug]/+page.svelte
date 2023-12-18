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

  <section class="wrapper detail">

    <h2>{data.topic.title}</h2>

    <div class="about">
      {@html data.topic.full_text.html}
    </div>

    <div>
      {#if data.topic.relateds.length > 0}
        <h3>Related</h3>
        <ul style="margin:20px">
          {#each data.topic.relateds as related (related.title)}
          <li><a href="{related.link}">{related.title}</a></li>
          {/each}
        </ul>
      {/if}
    </div>
    
  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->