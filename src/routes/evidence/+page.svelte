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
    <p class="menu-tools">Sort by date | Sort by type</p>

    <table class="people-menu">
      <tr>
        <th class="col1">image</th>
        <th class="col2">Title</th>
        <th class="col1">Year</th>
        <th class="col1">Type</th>
        <th>About</th>
      </tr>

      {#each data.items as item (item.slug)}
      <tr>

        <td>
          <img 
            src="https://lucy-proto.deerfield-ma.org/assets/evidence/images/thumbpics/{item.slug}.jpg"
            alt="{item.title}" height="75" width="75"
          >
        </td>
        <td>
          <a href='/evidence/{item.slug}'>
              {item.title}
          </a>          
        </td>
        <td>{item.year}</td>
        <td>{item.item_type}</td>
        <td>{item.menu_blurb}</td>
      </tr>
      {/each}

    </table>

    <ul class="menu">
      <li><a href="/evidence/thing1">Lidded Hanging Pot</a></li>
      <li>Candlestick</li>
      <li>Bill of Sale for Kate</li>
      <li>Canopied Bed</li>
      <li>Butter Churn</li>
      <li>“A Narrative of the Life and Adventures of Venture Smith, A Native of Africa: But Resident above Sixty Years in the United States of America”</li>
      <li>“The Interesting Narrative of the Life of Olaudah Equiano, or Gustavus Vassa, the African”</li>
      <li>Petition of Belinda Sutton to the Massachusetts General Court, 1783.</li>
      <li>Abigail Mott, Biographical Sketches and Interesting Anecdotes of Persons of Color, 1826</li>
      <li>"Memoir of Mrs. Chloe Spear, a Native of Africa, Who was Enslaved in Childhood, and Died in Boston, January 3, 1815...Aged 65 Years"</li>
      <li>Records of the First Church in Deerfield June 15, 1731-1810</li>
      <li>Account book of Elijah Williams Store, 1745</li>
      <li>Account books of Dr. Thomas Williams, 1749,1751, 1754, 1756</li>
      <li>Wethersfield Justice of the Peace Files 1740-1900</li>
    </ul>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->