export async function load({ fetch }) {
    const res = await fetch('https://lucy-proto.deerfield-ma.org/maps/api/');
    const maps = await res.json();

    return { maps  }
}