<script>
  import { isScrollMode } from '$lib/stores.js';

  function clearScroll() {
    isScrollMode.set(false);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav class="moment-nav"
  on:click={clearScroll}
>
    <ul>
      <li><a href="/">Sold Out of Africa</a></li>
      <li><a href="/">For Sale Again</a></li>
      <li><a href="/">A Strange New Life</a></li>
      <li><a href="/">Enslaved at the Wells’ House</a></li>
      <li><a href="/">Joining the Church</a></li>
      <li><a href="/">Singer of History</a></li>
      <li><a 
        href="/moments/engaging" 
        >Engaging With the Community</a></li>
      <li><a 
        href="/moments/community"  
        >Community Within Community</a></li>
      <li><a href="/moments/union">A Fruitful Union</a></li>
      <li><a href="/">Sons of the Revolution</a></li>
      <li><a href="/">Living on the Frontier</a></li>
      <li><a href="/">Fighting in Court</a></li>
      <li><a href="/">Returning to Deerfield</a></li>
    </ul>
</nav>