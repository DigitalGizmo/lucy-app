import moments from "../../../lib/moments.json";

export function load({ params }) {
    const moment = moments.find((moment) => moment.slug === params.slug); 

    if (!moment) throw error(404);

    return {
        moment
    };
}