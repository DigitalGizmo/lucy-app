<script>
  import MainNav from "../../lib/MainNav.svelte";
</script>

<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Who Else?</h1>
  </header>


  <section class="wrapper">
    <p class="breadcrumbs">    
        People
    </p>
        
    <p><a href="/people/person-model">Model Person</a></p>
    <p>list from database:</p>
    <ul>
      <li>
      Lucy Terry
      </li>
      <li>
      Ebenezer Wells
      </li>
    </ul>  
  </section>
</section>