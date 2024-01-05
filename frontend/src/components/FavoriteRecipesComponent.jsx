import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function FavoriteRecipesComponent({
  setRecipe,
  setShowAddRecipeForm,
  recipe,
  showAddRecipeForm,
}) {
  const [recipeList, setRecipeList] = useState(null);
  const [sortOrder, setSortOrder] = useState(0);

  const handleSortAlpha = () => {
    setSortOrder(sortOrder + 1);
    sortRecipesAlpha(recipeList, sortOrder + 1);
  };

  const handleSortUser = () => {
    sortRecipesUser(recipeList);
  };

  const handleDeleteRecipe = (recipeToDelete) => {
    console.log(recipeToDelete.name);
    console.log(recipeToDelete.description);
    console.log(recipeToDelete.image);
    console.log(recipeToDelete.ingredients);
    console.log(recipeToDelete.user);
    console.log(recipeToDelete.userCreated);

    fetch('http://localhost:8080/recipe/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeToDelete),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipeList(data);
      })
      .catch((error) => {
        console.error('There was a problem deleting the recipe: ', error);
      });
  };

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:8080/recipe/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setRecipeList(data);
        })
        .catch((error) => {
          console.error('There was a problem fetching the data: ', error);
        });
    }

    fetchData(); // Initial call when the component mounts
  }, [recipe, showAddRecipeForm]);

  function sortRecipesAlpha(recipeList, order) {
    const sortedRecipeList = recipeList.slice().sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (order % 2 === 0) {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
    });
    setRecipeList(sortedRecipeList);
  }

  function sortRecipesUser(recipeList) {
    const sortedRecipeList = recipeList.slice().sort((a, b) => {
      if (a.userCreated === true) {
        return 1;
      } else {
        return -1;
      }
    });
    setRecipeList(sortedRecipeList);
  }

  return (
    <div className="favoriteRecipes">
      {recipeList && recipeList.length > 0 ? (
        <div>
          <h2>Favorite Recipes</h2>
          <ul className="favoritesList">
            {recipeList.map((recipe, index) => (
              <li key={index} className="favoriteItem">
                <img src={recipe.image} alt={recipe.name} />
                <span
                  onClick={() => {
                    setShowAddRecipeForm(false);
                    setRecipe(recipe);
                  }}
                >
                  {recipe.name}
                </span>
                <div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    alt="Delete"
                    onClick={() => {
                      handleDeleteRecipe(recipe);
                      console.log('Just clicked: ' + recipe);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {recipeList.length > 1 && (
            <>
              <button className="sort-button" onClick={handleSortAlpha}>
                Sort Alphabetically
              </button>
              <button className="sort-button" onClick={handleSortUser}>
                Sort By User
              </button>
            </>
          )}
        </div>
      ) : (
        <p>No favorite recipes yet...</p>
      )}
    </div>
  );
}

// const recipeListTest = [
//   {
//     id: 1,
//     name: 'Potato Leek Soup',
//     description:
//       'Prepare all vegetables. Leeks need extra attention when cleaning as they contain a lot of sand. To properly clean a leek remove the roots and the dark green ends, so just the white and light green part remains. Slice the leek length wise, halfway through, so all of its layers are visible. Rinse under cold water carefully pulling back layers to remove the sand. Shake off excess water and slice into thin discs.In a large pot or dutch oven, melt butter over medium high heat. Saut leeks, onions and garlic for roughly 3-5 minutes until tender. Do not brown the leeks as it will give your soup a burnt flavour.Add potatoes, carrots, and celery. Cook for an additional 5 minutes stirring frequently. Sprinkle with parsley, thyme, red pepper flakes, and rosemary, stir to combine. Pour in chicken broth and season with Worcestershire sauce.Bring soup to a boil and cook for about 5 minutes. Reduce heat',
//     image: 'https://spoonacular.com/recipeImages/656971-556x370.jpg',
//     ingredients: [
//       '1 carrot, chopped',
//       '2 stalks of celery, chopped',
//       '3 1/2 cups chicken broth (or enough to barely cover potatoes)',
//       '1 Tsp. dried rosemary',
//       '¼ cup fresh parsley',
//       '1 Tbsp. fresh thyme',
//       '1 clove garlic, minced',
//       '3 leeks, thinly sliced',
//       'dash red pepper flakes',
//       'salt and pepper to taste',
//       '2 Tbsp. salted butter',
//       '1 Tbsp. Worcestershire sauce',
//       '1 yellow onion, diced',
//       '8-10 yukon gold potatoes, peeled and cubed',
//     ],
//     user: {
//       id: 1,
//       username: 'asdfasdf',
//       pwHash: '$2a$10$IwuQMDcPPFax8MOziGT8IeAExYOI7tgPbpr8ddhPfxwVXiQ00qxVS',
//     },
//     userCreated: false,
//   },
//   {
//     id: 2,
//     name: 'Apple Cake',
//     description:
//       'Preheat oven to 350F degrees.In a large bowl, mix together apples, oil, sugar, eggs and walnuts by hand. Mix well then set aside.In a separate bowl, mix flour, baking soda, salt, vanilla and cinnamonMix well then add to the apple mixture. The batter will be thick.Pour into ungreased 13x9 baking pan, and bake for one hour or until done.',
//     image: 'https://spoonacular.com/recipeImages/632485-556x370.jpg',
//     ingredients: [
//       '3 cups sliced apples preferably Jonathan',
//       '1 1/2 teaspoons baking soda',
//       '1 teaspoon of cinnamon',
//       '2 eggs',
//       '2 1/2 cups flour',
//       '1 1/2 cups oil',
//       '1 teaspoon salt',
//       '2 cups of sugar',
//       '3 teaspoons vanilla (I increased this from 2 tsps. in original recipe)',
//       '1 cup chopped walnuts',
//     ],
//     user: {
//       id: 1,
//       username: 'asdfasdf',
//       pwHash: '$2a$10$IwuQMDcPPFax8MOziGT8IeAExYOI7tgPbpr8ddhPfxwVXiQ00qxVS',
//     },
//     userCreated: false,
//   },
//   {
//     id: 52,
//     name: 'Potato-Cheese Pie',
//     description:
//       'Make the crust: Pulse the flour, sugar and salt in a food processor. Add 1 stick butter and pulse until combined. Add the remaining 2 sticks butter and pulse three times, or until the mixture resembles coarse meal. Add the vinegar, then gradually add 1/3 cup ice water through the feed tube, pulsing four times, until evenly combined. Squeeze the dough between your fingers. If it doesnt hold its shape, add up to 2 tablespoons ice water and pulse two more times (the dough should still be crumbly). Turn out onto a clean surface and press into a ball; divide in half, wrap in plastic wrap and flatten into two 1-inch-thick rectangles. Refrigerate at least 1 hour or up to 2 days.Make the filling: Heat 2 tablespoons olive oil in a skillet over medium heat. Add the onion and cook until slightly brown, 5 to 7 minutes; season with salt and let cool. Slice the potatoes and apples very thinly; toss in',
//     image: 'https://spoonacular.com/recipeImages/657011-556x370.jpg',
//     ingredients: [
//       '1 tablespoon white or apple cider vinegar',
//       '3 tablespoons breadcrumbs',
//       '3 1/2 cups all-purpose flour, plus more for dusting',
//       '2 sprigs fresh thyme, leaves stripped',
//       '2 gala apples, unpeeled',
//       '2 tablespoons heavy cream, for brushing',
//       'Kosher salt',
//       '5 ounces mortadella or ham, thinly sliced',
//       '4 tablespoons extra-virgin olive oil',
//       '1 large onion, thinly sliced',
//       'Freshly ground pepper',
//       '4 large red-skinned potatoes (1 1/2 pounds), unpeeled',
//       '1 teaspoon fine salt',
//       '1 tablespoon sugar',
//       '1 1/2 cups unsalted butter, cubed (keep cold in the freezer)',
//       '10 ounces white cheddar cheese, shredded',
//     ],
//     user: {
//       id: 1,
//       username: 'asdfasdf',
//       pwHash: '$2a$10$IwuQMDcPPFax8MOziGT8IeAExYOI7tgPbpr8ddhPfxwVXiQ00qxVS',
//     },
//     userCreated: false,
//   },
// ];
