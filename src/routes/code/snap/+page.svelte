<!-- svelted version of https://codepen.io/chriscoyier/pen/pMRgwW 
	   TODO:  experiment using svelte transitions instead of the CSS

	From: https://svelte.dev/repl/2f5ca1b9da90406cbe6678791193f0d4?version=3.20.1
-->
<script>
	let sections = [
		'Section 1',
		'Section 2',
		'Section 3',
		'Section 4',
		'Section 5',
	]
</script>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	.slider {
		font-family: sans-serif;
		scroll-snap-type: x mandatory;	
		display: flex;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
	}
	section {
		border-right: 1px solid white;
		padding: 1rem;
		min-width: 100vw;
		height: 100vh;
		scroll-snap-align: start;
		text-align: center;
		position: relative;
	}
	h1	{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		color: black;
		width: 100%;
		left: 0;
		font-size: calc(1rem + 3vw);
	}
	img	{
		position: absolute;
		top: 5%;
		/* transform: translateY(-50%); */
		/* text-align: center; */
		color: black;
		width: 100%;
		left: 0;
		/* font-size: calc(1rem + 3vw); */
	}
</style>

<div class="slider">
	{#each sections as section}
		<section>
            <!-- <img 
            src="https://lucy-proto.deerfield-ma.org/assets/moments/images/titlescreens/sold.jpg" 
            alt="intro sketch" width="800px" > -->
			<h1>{section}</h1>

		</section>
	{/each}
</div>