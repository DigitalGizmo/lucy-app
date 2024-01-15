<!-- From: 
	https://svelte.dev/repl/97366319dc7c477989fe744d01d81391?version=3.39.0 
-->

<script>
	// https://github.com/doomd
	import {onMount} from "svelte"
  let box
	// let xLeft = 0
	// let xScroll = 0
	// let xWidth = 0
	// let yTop = 0
	// let yScroll = 0
	// let yHeight = 0
	
	// function parseScroll() {
	// 	xLeft=box.scrollLeft
	// 	xScroll=box.scrollWidth
	// 	xWidth=box.clientWidth
	// 	yTop=box.scrollTop
	// 	yHeight=box.clientHeight
	// 	yScroll=box.scrollHeight
	// }
	
	// onMount(()=>parseScroll())
</script>
<h2>Binding scrollLeft (horizontal) & scrollTop (vertical) of scrollable elements to variables in Svelte</h2>
<div class="box-titles" 
	bind:this={box} 
	on:scroll={(e)=> console.log('left :' + e.target.scrollLeft)}  
>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas est justo, condimentum et velit ac, euismod euismod est. Praesent urna elit, tempus vulputate nunc eu, ornare aliquet nibh. Praesent nisl lectus, viverra eu ullamcorper eu, viverra eu risus. Nullam tincidunt egestas laoreet. Integer euismod eros vel scelerisque aliquam. Phasellus sit amet velit eu elit placerat sagittis. Vivamus magna orci, vestibulum vitae dignissim eget, laoreet a mi. Curabitur cursus arcu vel odio tincidunt, eget feugiat justo lacinia.</p>

	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas est justo, condimentum et velit ac, euismod euismod est. Praesent urna elit, tempus vulputate nunc eu, ornare aliquet nibh. Praesent nisl lectus, viverra eu ullamcorper eu, viverra eu risus. Nullam tincidunt egestas laoreet. Integer euismod eros vel scelerisque aliquam. Phasellus sit amet velit eu elit placerat sagittis. Vivamus magna orci, vestibulum vitae dignissim eget, laoreet a mi. Curabitur cursus arcu vel odio tincidunt, eget feugiat justo lacinia.</p>

	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas est justo, condimentum et velit ac, euismod euismod est. Praesent urna elit, tempus vulputate nunc eu, ornare aliquet nibh. Praesent nisl lectus, viverra eu ullamcorper eu, viverra eu risus. Nullam tincidunt egestas laoreet. Integer euismod eros vel scelerisque aliquam. Phasellus sit amet velit eu elit placerat sagittis. Vivamus magna orci, vestibulum vitae dignissim eget, laoreet a mi. Curabitur cursus arcu vel odio tincidunt, eget feugiat justo lacinia.</p>


</div>

<!-- <div class='report'>
	<div>horizontal: {xLeft} from left, box is {xWidth}px wide, ({xScroll} total scroll width)</div>
	<div>vertical: {yTop} from top, box is {yHeight}px high, ({yScroll} total scroll height)</div>
</div> -->

<style>
	.box-titles {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 200px;
		overflow: auto;
		resize: both;
		margin-bottom: 20px;
    white-space: nowrap;
	}
</style>