const API_ENDPOINT = 'https://api.smakowity.pl/graphql';

export function getRecommendedRecipes() {
  return fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          query: `
            {
                recipes(limit: 5) {
                    id
                    name
                    img_url
                }
            }
          `
      })
        .then(recipes => recipes.json())
        .then(recipes => {
            console.log(recipes);
          return recipes;
      });
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
