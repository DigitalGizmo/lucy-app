<script>
    import MainNav from "$lib/MainNav.svelte";
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Where in the World?</h1>
  </header>


  <section class="wrapper">
    <p class="breadcrumbs">    
    home
    </p>
        
    <p>Some Maps</p>
    <ul>
    <li>
        <a href="/maps/there">a map</a>
        </li>
    <li>somewhere else instead</li>
    </ul>  
  </section>
</section>