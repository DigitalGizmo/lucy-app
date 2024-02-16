<script>
  // import { onMount } from 'svelte';
  import MainNav from "$lib/MainNav.svelte";
  import People from '../../people/components/People.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const itemInfo = data.person;

</script>
  
<section class="wireframe-wrapper">
  <header id="header">

    <MainNav />

    <!-- Can this be outside of header -->
    <h1>Who Else?</h1>
  </header>

  <section class="wrapper detail">
    <People
      {itemInfo}
    />        

  </section><!-- /wrapper -->

</section><!-- /wireframe-wrapper -->