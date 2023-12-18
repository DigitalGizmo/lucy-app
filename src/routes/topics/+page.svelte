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

    <table class="people-menu">
      <tr>
        <th class="col1">Topic</th>
        <th>About</th>
      </tr>

      {#each data.topics as topic (topic.slug)}
      <tr>
        <td>
          {#if topic.prod_status > 1}
            <a href='/topics/{topic.slug}'>
                {topic.title}
            </a>          
          {:else}
            {topic.title}
          {/if}                   

        </td>
        <td>{topic.menu_blurb}</td>
      </tr>
      {/each}

    </table>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->
