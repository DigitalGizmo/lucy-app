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
          <a href='/topics/{topic.slug}'>
              {topic.title}
          </a>          
        </td>
        <td>{topic.menu_blurb}</td>
      </tr>
      {/each}

    </table>


    <ul class="menu">
      <li><a href="/topics/thought">Control and Resistance</a>Despite coercive efforts, enslaved people found a variety of ways to exercise a degree of personal control over their lives.</li>

      <li><a href="">The Economics of the Slave Trade</a>The continuing significance of the African slave trade in the rise of New England agriculture, commerce, and industry.</li>

      <li><a href="">The Fruits of Enslaved Labor</a>A variety of household items that were brought into Deerfield, and New England, were produced by enslaved people outside the region (e.g., sugar, tea) or were obtained in exchanges associated with the slave trade.</li>

      <li><a href="">Torn Assunder</a>The uncertainty and instability of relations in slavery.</li>

      <li><a href="">An Uncertain Future</a>The variety of circumstances in which enslaved people found themselves.</li>

      <li><a href="">Women's Work</a>The contrast between the work enslavers expected of women and the work they expected of men.</li>
       
      <li><a href="">Enslaved in the Wilderness</a>The difference between enslavement in rural circumstances and urban ones.</li>

      <li><a href="">Side by Side</a>Slaveowners in New England generally worked alongside their enslaved workers, doing household chores as well as agricultural work outside.</li>

      <li><a href="">Enslavement in New EnglandAlthough oppressive everywhere, enslavement in New England provided a wide range of social and psychological environments in which enslaved people labored, from fairly supportive and even friendly to abusive.</a>

      <li><a href="">Reading the Good Book</a>The role of the Bible and religion, including Bible reading, in domestic life for enslaved people.</li>

      <li><a href="">Authorship While Enslaved</a>Many enslaved African Americans were exceptionally creative, and once they became literate began writing literary works that gained them great acclaim.</li>

      <li><a href="">The Necessity of Community</a>Free and enslaved African Americans interacted with each other and formed bonds of community outside of the confines of their enslavers.</li>
    </ul>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->
