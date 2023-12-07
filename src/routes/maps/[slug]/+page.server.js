export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/maps/api/${params.slug}`);
    const map = await res.json();

    return { map  }
}