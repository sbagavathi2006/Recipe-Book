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


import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("add-recipe")
public class AddRecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

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


        Recipe recipe = new Recipe(recipeDTO.getName(), recipeDTO.getDescription(), recipeDTO.getImage(), ingredients, user);

        Recipe existingRecipe = recipeRepository.findByName(recipeDTO.getName());

        if (existingRecipe == null) {
            // Save the new recipe
            Recipe savedRecipe = recipeRepository.save(recipe);

            // Convert the saved Recipe to DTO
            RecipeDTO savedRecipeDTO = RecipeMapper.convertToRecipeDTO(savedRecipe);

            // Convert DTO to JSON string
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

        public ResponseEntity<List<Recipe>> getRecipeList () {

            Iterable<Recipe> recipeIterable = recipeRepository.findAll();
            List<Recipe> recipes = new ArrayList<>();

            recipeIterable.forEach(recipes::add);

            return ResponseEntity.ok().body(recipes);
        }

//    @PostMapping("add")
//    public String processAddRecipeForm(@ModelAttribute @Valid AddRecipe newAddRecipe,
//                                       @RequestParam("imageFile") MultipartFile imageFile,
//                                       Errors errors, Model model) {
//        if (errors.hasErrors()) {
//            return "add-recipe/add";
//        }
//
//        if (!imageFile.isEmpty()) {
//            try {
//                byte[] imageData = imageFile.getBytes();
//                newAddRecipe.setImageData(imageData);
//            } catch (IOException e) {
//                // Handle the exception (e.g., log it or show an error message)
//            }
//        }
//        newAddRecipe.setUploadImage(newAddRecipe.getUploadImage());
//        addRecipeRepository.save(newAddRecipe);
//        System.out.println("Recipe added successfully!");
//        return "redirect:";
//    }
//    @GetMapping("view/{recipeId}")
//    public String displayViewSkill(Model model, @PathVariable int recipeId) {
//        Optional optSkill = addRecipeRepository.findById(recipeId);
//        if (optSkill.isPresent()) {
//            AddRecipe addRecipe = (AddRecipe) optSkill.get();
//            String base64Image = Base64.getEncoder().encodeToString(addRecipe.getImageData());
//            model.addAttribute("base64Image", base64Image);
//            model.addAttribute("addRecipe", addRecipe);
//            return "add-recipe/view";
//        } else {
//            return "redirect:../";
//        }
//    }
}
