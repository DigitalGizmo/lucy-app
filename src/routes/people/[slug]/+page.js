/** @type {import('./$types').PageLoad} */

export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/people/persons/${params.slug}`);
    const person = await res.json();

    return { person  }
}
