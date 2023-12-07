export async function load({ fetch }) {
    const res = await fetch('https://lucy-proto.deerfield-ma.org/evidence/api/');
    const items = await res.json();

    return { items  }
}