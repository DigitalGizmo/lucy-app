<script>
    // import { page } from '$app/stores';
    function toggleHamburger() {
        console.log("hamburger")
        const x = document.getElementById("mainNav");
        if (x.className === "global-nav") {
            x.className += " responsive";
        } else {
            x.className = "global-nav"
        }
    }

</script>

<h3><a href="/">Lucy Terry Prince</a></h3>

<nav class="global-nav" id="mainNav">
    <a href="/" 
        class="hamburger" 
        on:click={(e) => { e.preventDefault(); toggleHamburger();}}
        >
        <i class="fa fa-bars"></i>
    </a>
    <ul>
        <li><a data-sveltekit-reload href="/moments/">Lucy's Life</a></li>
        <li><a data-sveltekit-reload href="/people/">Other Lives</a></li>
        <li><a data-sveltekit-reload href="/evidence/">How Do We Know?</a></li>
        <li><a data-sveltekit-reload href="/topics/">Topics &amp; Ideas</a></li>
        <li><a data-sveltekit-reload href="/maps/">Where In the World?</a></li>
        <li><a data-sveltekit-reload href="/when/">When?</a></li>
    </ul>
</nav>
  