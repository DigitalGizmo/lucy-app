<script>
  import { page } from '$app/stores';
  import moments from './moments.json';
  export let scrollToChosenIdx = () => {}; // no-operation function
</script>

<nav class="moment-nav">
  <ul>
    {#each moments as moment, i}
      <li class="{ moment.slug === $page.params.slug ? 'selected' : ''}">
        <a href="/"
          on:click={(e) => { 
            e.preventDefault();
            scrollToChosenIdx(i, moment.slug);
          }}>
          {moment.title}
        </a>
      </li>
    {/each}

  </ul>
</nav>