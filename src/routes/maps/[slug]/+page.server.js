// This pulls on the api coming from Django
// import deerfield from "../components/deerfieldMapPops.json";

export async function load({ fetch, params }) {
    const res = await fetch(`https://lucy-proto.deerfield-ma.org/maps/api/${params.slug}`);
    const map = await res.json();

    // return { "map": map, "deerfield": deerfield  }
    return { "map": map  }
}

