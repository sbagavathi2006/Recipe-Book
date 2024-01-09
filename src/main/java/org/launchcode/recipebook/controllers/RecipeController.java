package org.launchcode.recipebook.controllers;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.validation.Valid;
import org.launchcode.recipebook.models.Recipe;
import org.launchcode.recipebook.models.User;
import org.launchcode.recipebook.models.data.RecipeRepository;
import org.launchcode.recipebook.models.data.UserRepository;
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


import java.util.List;

@Controller
@RequestMapping("recipe")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    // @Autowired
    // private UserRepository userRepository;

    @Autowired
    private AuthenticationController authenticationController;


    @PostMapping("add")
    public ResponseEntity<String> processAddRecipe(@RequestBody @Valid RecipeDTO recipeDTO, Errors errors, HttpServletRequest request) {

        if (errors.hasErrors()) {
            System.out.println(errors);
            return ResponseEntity.badRequest().body("Validation errors found");
        }

        List<String> ingredients = recipeDTO.getIngredients();
        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);


        Recipe recipe = new Recipe(recipeDTO.getName(), recipeDTO.getDescription(), recipeDTO.getImage(), ingredients, user, recipeDTO.getUserCreated());

        Recipe existingRecipe = recipeRepository.findByName(recipeDTO.getName());

        if (existingRecipe == null) {
            Recipe savedRecipe = recipeRepository.save(recipe);

            RecipeDTO savedRecipeDTO = RecipeMapper.convertToRecipeDTO(savedRecipe);

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String savedRecipeJson = objectMapper.writeValueAsString(savedRecipeDTO);

                return ResponseEntity.ok(savedRecipeJson);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting to JSON");
            }
        }
        return null;
    }

    @GetMapping("get")

    public ResponseEntity<List<Recipe>> getRecipeList(HttpServletRequest request) {

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);

        List<Recipe> recipesByUserId = recipeRepository.findByUserId(user.getId());

        return ResponseEntity.ok().body(recipesByUserId);
    }

    @DeleteMapping("delete")
    public ResponseEntity<List<Recipe>> deleteRecipe(@RequestBody RecipeDTO recipeDTO, HttpServletRequest request) {
        System.out.println(recipeDTO.getName());
        System.out.println(recipeDTO.getDescription());

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

}