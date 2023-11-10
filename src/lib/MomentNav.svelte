<script>
  import { page } from '$app/stores';
  import moments from "$lib/moments.json";
  import { isScrollMode, nextMoment, 
    prevMoment, currMomentIdx } from '$lib/stores.js';
  function setChoice(idx) {
    isScrollMode.set(false);
    console.log('next: ' + moments[idx+1].slug)
    nextMoment.set(moments[idx+1].slug);
    if( idx > 0) {
      prevMoment.set(moments[idx-1].slug);
    } else {
      prevMoment.set( undefined );
    }

    currMomentIdx.set(idx)
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