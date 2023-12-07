export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/evidence/api/${params.slug}`);
    const item = await res.json();

    return { item  }
}