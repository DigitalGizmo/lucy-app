<script>
  import moments from './components/moments.json';
  import MainNav from "$lib/MainNav.svelte";
  import { isScrollMode } from '$lib/stores.js';
  function setScrollMode(idx) {
    isScrollMode.set(false);
  }
</script>
    
<section class="wireframe-wrapper">
	<header id="header">
        <MainNav />
		<h1>Lucy's Life</h1>
	</header>

	<section class="wrapper">
  <p class="wireframe-note">WIREFRAME ONLY - NOT YET DESIGNED</p>

    <ul class="menu">
      {#each moments as moment, i}
        <li>
          {moment.date}: <a href="/moments/{moment.slug}"
            on:click={(e) => { setScrollMode(i);}}>
            {moment.title}
          </a>
        </li>
      {/each}
    </ul>  

	</section><!-- /wrapper -->
</section><!-- /wireframe-wrapper -->

