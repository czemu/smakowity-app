const API_ENDPOINT = 'https://api.smakowity.pl/graphql';

export function getRecommendedRecipes() {
  return doRequest(
      `
        {
            recipes(limit: 15) {
                id
                name
                img_url
            }
        }
      `
  )
    .then(recipes => recipes.json())
    .then(recipes => {
        return recipes.data.recipes;
    });
}

function doRequest(query) {
    return fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query
        }),
    });
}
