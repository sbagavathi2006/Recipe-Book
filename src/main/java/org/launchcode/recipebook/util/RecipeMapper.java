package org.launchcode.recipebook.util;

import org.launchcode.recipebook.models.dto.RecipeDTO;
import org.launchcode.recipebook.models.Recipe;


public class RecipeMapper {

    public static RecipeDTO convertToRecipeDTO(Recipe recipe) {
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setName(recipe.getName());
        recipeDTO.setDescription(recipe.getDescription());
        recipeDTO.setImage(recipe.getImage());
        recipeDTO.setIngredients(recipe.getIngredients());

        return recipeDTO;
    }
}
