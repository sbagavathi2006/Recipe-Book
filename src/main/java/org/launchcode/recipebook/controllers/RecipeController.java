package org.launchcode.recipebook.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.launchcode.recipebook.models.Ingredient;
import org.launchcode.recipebook.models.Recipe;
import org.launchcode.recipebook.models.User;
import org.launchcode.recipebook.models.data.RecipeRepository;
import org.launchcode.recipebook.models.data.UserRepository;
import org.launchcode.recipebook.models.dto.IngredientDTO;
import org.launchcode.recipebook.models.dto.RecipeDTO;
import org.launchcode.recipebook.util.RecipeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("recipe")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationController authenticationController;


    @PostMapping("add")
    @Transactional  // Ensures entire method runs within a single transaction
    public ResponseEntity<String> processAddRecipe(@RequestBody @Valid RecipeDTO recipeDTO, Errors errors, HttpServletRequest request) {

        if (errors.hasErrors()) {
            System.out.println(errors);
            return ResponseEntity.badRequest().body("Validation errors found");
        }

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);
        Recipe existingRecipe = recipeRepository.findByName(recipeDTO.getName());

        if (existingRecipe != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Recipe with the same name already exists");
        }

        Recipe recipe = new Recipe(recipeDTO.getName(), recipeDTO.getDescription(), recipeDTO.getImage(), new ArrayList<>(), user, recipeDTO.getUserCreated());

        // Add Ingredients to the Recipe
        for (IngredientDTO ingredientDTO : recipeDTO.getIngredients()) {
            recipe.addIngredient(new Ingredient(ingredientDTO.getName(), ingredientDTO.getOriginalName(), recipe));
        }

        try {
            Recipe savedRecipe = recipeRepository.save(recipe);
            RecipeDTO savedRecipeDTO = RecipeMapper.convertToRecipeDTO(savedRecipe);

            ObjectMapper objectMapper = new ObjectMapper();
            String savedRecipeJson = objectMapper.writeValueAsString(savedRecipeDTO);

            return ResponseEntity.ok(savedRecipeJson);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting to JSON");
        }
    }

    @GetMapping("get")
    @Transactional
    public ResponseEntity<List<Recipe>> getRecipeList(HttpServletRequest request) {
        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);
        System.out.println("\n" + "Current User:" + user.getId() + "\n");
        List<Recipe> recipesByUserId = recipeRepository.findByUserId(user.getId());
        return ResponseEntity.ok().body(recipesByUserId);
    }

    @DeleteMapping("delete")
    public ResponseEntity<List<Recipe>> deleteRecipe(@RequestBody RecipeDTO recipeDTO, HttpServletRequest request) {

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);
        Recipe existingRecipe = recipeRepository.findByName(recipeDTO.getName());

        if (existingRecipe != null && existingRecipe.getUser().getId() == user.getId()) {
            recipeRepository.delete(existingRecipe);
            List<Recipe> recipesByUserId = recipeRepository.findByUserId(user.getId());
            return ResponseEntity.ok().body(recipesByUserId);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @Transactional
    @PutMapping("update")
    public ResponseEntity<List<Recipe>> updateRecipe(@RequestBody RecipeDTO recipeDTO, HttpServletRequest request) {
        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);
        Recipe existingRecipe = recipeRepository.findByName(recipeDTO.getName());

        if (existingRecipe != null && existingRecipe.getUser() != null && existingRecipe.getUser().equals(user)) {
            // Remove existing ingredients, image, and description
            existingRecipe.setImage(null); // Set to null if replacing with a new image
            existingRecipe.setDescription(null); // Set to null if replacing with a new description

            for (Ingredient ingredient : existingRecipe.getIngredients()) {
                ingredient.setRecipe(null);
            }

            // Use a temporary list for new ingredients
            List<Ingredient> newIngredients = new ArrayList<>();
            for (IngredientDTO ingredientDTO : recipeDTO.getIngredients()) {
                Ingredient ingredient = new Ingredient(ingredientDTO.getName(), ingredientDTO.getOriginalName(), existingRecipe);
                ingredient.setRecipe(existingRecipe);
                newIngredients.add(ingredient);
            }

            // Clear existing ingredients and set the new ones
            existingRecipe.getIngredients().clear();
            existingRecipe.setIngredients(newIngredients);

            // Set the new image and description in the Recipe
            existingRecipe.setImage(recipeDTO.getImage()); // Set to the new image
            existingRecipe.setDescription(recipeDTO.getDescription()); // Set to the new description

            recipeRepository.save(existingRecipe);
            List<Recipe> recipesByUserId = recipeRepository.findByUserId(user.getId());
            // Log recipes retrieved by user ID for debugging
            System.out.println("Recipes By User ID: " + recipesByUserId);

            return ResponseEntity.ok().body(recipesByUserId);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}