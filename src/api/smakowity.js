const API_ENDPOINT = 'https://api.smakowity.pl/graphql';

export function getRecommendedRecipes(limit, offset) {
  return doRequest(
      `
        {
            recipes(limit: `+limit+`, offset: `+offset+`) {
                id
                name
                slug
                thumb_url
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
                slug
                thumb_url
            }
        }
      `
  )
    .then(recipes => recipes.json())
    .then(recipes => {
        return recipes.data.recipes;
    });
}

export function getRecipesByCategory(categoryId, limit, offset) {
  return doRequest(
      `
        {
            recipes(category_id: `+categoryId+`, limit: `+limit+`, offset: `+offset+`) {
                id
                name
                slug
                thumb_url
            }
        }
      `
  )
    .then(recipes => recipes.json())
    .then(recipes => {
        return recipes.data.recipes;
    });
}

export function getRecipesByQuery(query, limit, offset) {
  return doRequest(
      `
        {
            recipes(search: "`+query+`", limit: `+limit+`, offset: `+offset+`) {
                id
                name
                slug
                thumb_url
            }
        }
      `
  )
    .then(recipes => recipes.json())
    .then(recipes => {
        return query.length ? recipes.data.recipes : [];
    });
}

export function getFullRecipe(recipeId) {
  return doRequest(
      `
        {
            recipes(ids: [`+recipeId+`]) {
                id
                name
                slug
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

export function getCategories() {
  return doRequest(
      `
        {
            categories {
                id
                name
                img_url
            }
        }
      `
  )
    .then(categories => categories.json())
    .then(categories => {
        return categories.data.categories;
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
