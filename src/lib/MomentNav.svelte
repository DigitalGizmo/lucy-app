<script>
  import { page } from '$app/stores';
  import moments from "$lib/moments.json";
  import { isScrollMode } from '$lib/stores.js';
  export let scrollToChosenIdx = () => {}; // no-operation function
  function goToChosen(idx, slug) {
    isScrollMode.set(false);
    scrollToChosenIdx(idx, slug);
  }

</script>

<nav class="moment-nav">
  <ul>
    {#each moments as moment, i}
      <li class="{ moment.slug === $page.params.slug ? 'selected' : ''}">
        <a href="/"
          on:click={(e) => { 
            e.preventDefault();
            goToChosen(i, moment.slug);
          }}>
          {moment.title}
        </a>
      </li>
    {/each}

  </ul>
</nav>