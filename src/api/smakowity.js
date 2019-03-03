const API_ENDPOINT = 'https://api.smakowity.pl/graphql';

export function getRecommendedRecipes(limit, offset) {
  return doRequest(
      `
        {
            recipes(limit: `+limit+`, offset: `+offset+`) {
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

export function getRecipesById(recipeIds, limit, offset) {
  return doRequest(
      `
        {
            recipes(ids: [`+recipeIds.join(',')+`], limit: `+limit+`, offset: `+offset+`) {
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

export function getFullRecipe(recipeId) {
  return doRequest(
      `
        {
            recipes(ids: [`+recipeId+`]) {
                id
                name
                img_url
                img_desc
                ingredients
                preparation_description
                preparation_time
                difficulty_degree
                servings
            }
        }
      `
  )
    .then(recipes => recipes.json())
    .then(recipes => {
        return recipes.data.recipes[0];
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
