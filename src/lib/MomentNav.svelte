<script>
  import moments from "$lib/moments.json";
  import { isScrollMode } from '$lib/stores.js';
  function clearScroll() {
    isScrollMode.set(false);
  }

</script>

<nav class="moment-nav">
  <ul>
    {#each moments as moment}
      <li>
        <a href="/moments/{moment.slug}"
        on:click={clearScroll}>{moment.title}</a>
      </li>
    {/each}

  </ul>
</nav>