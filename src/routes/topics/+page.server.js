export async function load({ fetch }) {
    const res = await fetch('https://lucy-proto.deerfield-ma.org/topics/api/');
    const topics = await res.json();

    return { topics  }
}