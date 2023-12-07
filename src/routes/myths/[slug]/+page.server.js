export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/myths/api/${params.slug}`);
    const myth = await res.json();

    return { myth  }
}