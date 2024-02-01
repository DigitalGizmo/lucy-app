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

    <iframe 
    title="Deerfield Map"
    style="border: 1px solid rgba(0, 0, 0, 0.1);" 
    width="800" height="450" 
    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F7bwIePsG7aiaf0r9xJmHJO%2F1700-btn%3Ftype%3Ddesign%26node-id%3D1-2%26t%3DtF7KjoQslFeLupZo-1%26scaling%3Dcontain%26page-id%3D0%253A1%26starting-point-node-id%3D1%253A2%26mode%3Ddesign" 
    allowfullscreen></iframe>
    
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