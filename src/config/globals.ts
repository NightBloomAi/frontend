/**
Constructs a search endpoint URL based on the specified page number and query.

@param {number} page - The page number to retrieve results from. Defaults to 1 if not provided.

@param {string} query - The search query string. Defaults to an empty string if not provided.

@returns {string} The constructed search endpoint URL.
*/
function searchEndpoint(
    page: number,
    query: string
) {
    page = page || 1;
    query = query || '';

    const protocol = 'http';
    const host = 'nightbloom.ai';
    const path = 'api/search';

    return `${protocol}://${host}/${path}?page=${page}&query=${query}`;
}


/**
Constructs an image endpoint URL based on the specified ID.
@param {string} id - The ID of the image.
@returns {string} The constructed image endpoint URL.
*/
function imageEndpoint(
    id: string
) {
    return `https://cdn.midjourney.com/${id}/0_0.png`
}

export { searchEndpoint, imageEndpoint };