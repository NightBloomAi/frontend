/**
Constructs a search endpoint URL based on the specified page number and query.

@param {number} page - The page number to retrieve results from. Defaults to 1 if not provided.

@param {string} query - The search query string. Defaults to an empty string if not provided.

@returns {string} The constructed search endpoint URL.
*/
function searchEndpoint(
    page: number,
    query: string,
    category: string,
) {
    page = page || 1;
    query = query || '';
    category = category || '' ;

    const protocol = 'http';
    const host = '49.13.9.134';
    const path = 'search/assets';

    console.log(`${protocol}://${host}/${path}?page=${page}&query=${query}&category=${category}`)

    return `${protocol}://${host}/${path}?page=${page}&query=${query}&category=${category}`;
}




/**
Constructs an image endpoint URL based on the specified ID.
@param {string} id - The ID of the image.
@returns {string} The constructed image endpoint URL.
*/
function imageEndpoint(
    reference_job_id: string
) {
    return `https://cdn.midjourney.com/${reference_job_id}/0_0.png`
}

function alternateImages (reference_job_id:string, ref:number) {
    return `https://cdn.midjourney.com/${reference_job_id}/0_${ref}.png`
}

function gridImage (reference_job_id:string) {
    return `https://cdn.midjourney.com/${reference_job_id}/grid_0.webp`
}

export { searchEndpoint, imageEndpoint, alternateImages, gridImage };