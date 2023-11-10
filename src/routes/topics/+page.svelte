<script>
    import MainNav from "$lib/MainNav.svelte";
</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Topics & Ideas</h1>
  </header>


  <section class="wrapper">
    <p class="breadcrumbs">    
    home
    </p>
        
    <p>Some Topics</p>
    <ul>
    <li>
        <a href="/topics/thought">a thought</a>
        </li>
    <li>a second thought</li>
    </ul>  
  </section>
</section>