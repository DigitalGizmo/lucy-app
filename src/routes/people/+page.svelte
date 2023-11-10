<script>
  import MainNav from "$lib/MainNav.svelte";
</script>

<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Who Else?</h1>
  </header>

  <section class="wrapper">
    <p>Sort by gender | Sort by date | Sort by name</p>
    <ul>
      <li><a href="/people/lucy">Lucy Terry Prince</a></li>
      <li>Ebenezer Wells</li>
      <li>Abijah Prince</li>
      <li>Phillis Wheatley</li>
      <li>Elizabeth Freeman (Mum Bett)</li>
    </ul>

  </section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->