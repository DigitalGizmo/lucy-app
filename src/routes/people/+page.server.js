/// @type {import('./$types').PageLoad} 
export async function load({ fetch }) {
    const res = await fetch('https://lucy-proto.deerfield-ma.org/people/api/');
    const people = await res.json();

    return { people  }
}