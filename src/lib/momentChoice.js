import moments from "$lib/moments.json";
// import { nextMoment } from '$lib/stores.js';
import { isScrollMode, nextMoment, 
  prevMoment, currMomentIdx } from '$lib/stores.js';
function setChoice(idx) {
  isScrollMode.set(false);
  console.log('next: ' + moments[idx+1].slug)
  nextMoment.set(moments[idx+1].slug);
  prevMoment.set(moments[idx-1].slug);
  currMomentIdx.set(idx)
}