/** @type {import('./$types').PageLoad} */

export function load({ params }) {
    return {
        post: {
            title: `title for ${params.slug} goes here`
        }
    }
}