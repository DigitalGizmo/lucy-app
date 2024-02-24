import moments from "../components/moments.json";
/* This should go up a level and be called +layout.server.js
per https://learn.svelte.dev/tutorial/layout-data -- I think
*/
export function load({ params }) {
    // const moment = moments.find((moment) => moment.slug === params.slug); 

    // if (!moment) throw error(404);

    return {
        moments
    };
}