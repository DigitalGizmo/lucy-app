<script>
  import { page } from '$app/stores';
  import moments from "$lib/moments.json";
  import { isScrollMode } from '$lib/stores.js';
  function setChoice(idx) {
    isScrollMode.set(false);
  }

</script>

<nav class="moment-nav">
  <ul>
    {#each moments as moment, i}
      <li class="{ moment.slug === $page.params.slug ? 'selected' : ''}">
        <a href="/moments/{moment.slug}"
          on:click={(e) => { setChoice(i);}}>
          {moment.title}
        </a>
      </li>
    {/each}

  </ul>
</nav>