// @type {import('./$types').PageLoad} 

export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/people/api/${params.slug}`);
    const person = await res.json();

    return { person  }
}
