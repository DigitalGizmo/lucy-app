export async function load({ fetch }) {
    const res = await fetch('https://lucy-proto.deerfield-ma.org/myths/api/');
    const myths = await res.json();

    return { myths  }
}