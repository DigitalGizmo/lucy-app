export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/topics/api/${params.slug}`);
    const topic = await res.json();

    return { topic  }
}