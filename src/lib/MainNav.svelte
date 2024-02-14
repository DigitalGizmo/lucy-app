<script>
    import { page } from '$app/stores';
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
        <li><a href="/moments/">Moments</a></li>
        <!-- <li class="{ $page.path === '/people/' ? 'selected' : ''}"> -->
        <li><a href="/people/">Who Else?</a></li>
        <li><a href="/evidence/">How Do We Know?</a></li>
        <li><a href="/topics/">Topics &amp; Ideas</a></li>
        <li><a href="/maps/">Where in the World?</a></li>
    </ul>
</nav>
  