// Hard-wiring to African Americans in Deerfield for now
import deerfield from "../../../lib/deerfield.json";
/* This should go up a level and be called +layout.server.js
per https://learn.svelte.dev/tutorial/layout-data -- I think
*/
export function load() {
    // const moment = moments.find((moment) => moment.slug === params.slug); 

    // if (!moment) throw error(404);

    return {
        deerfield
    };
}

// This pulls on the api coming from Django
// export async function load({ fetch, params }) {
//     const res = await fetch(`https://lucy-proto.deerfield-ma.org/maps/api/${params.slug}`);
//     const map = await res.json();

//     return { map  }
// }