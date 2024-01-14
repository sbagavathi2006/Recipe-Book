package org.launchcode.recipebook.util;

import org.launchcode.recipebook.models.dto.IngredientDTO;
import org.launchcode.recipebook.models.dto.RecipeDTO;
import org.launchcode.recipebook.models.Recipe;

import java.util.List;
import java.util.stream.Collectors;


public class RecipeMapper {

    public static RecipeDTO convertToRecipeDTO(Recipe recipe) {
        RecipeDTO recipeDTO = new RecipeDTO();
        recipeDTO.setName(recipe.getName());
        recipeDTO.setDescription(recipe.getDescription());
        recipeDTO.setImage(recipe.getImage());

        // Convert the list of ingredients to IngredientDTO
        List<IngredientDTO> ingredientDTOList = recipe.getIngredients().stream()
                .map(ingredient -> {
                    IngredientDTO ingredientDTO = new IngredientDTO();
                    ingredientDTO.setName(ingredient.getName());
                    ingredientDTO.setOriginalName(ingredient.getOriginalName());
                    return ingredientDTO;
                })
                .collect(Collectors.toList());

        recipeDTO.setIngredients(ingredientDTOList);


        return recipeDTO;
    }
}
