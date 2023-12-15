package org.launchcode.recipebook.controllers;
import jakarta.validation.Valid;
import org.launchcode.recipebook.models.AddRecipe;
import org.launchcode.recipebook.models.data.AddRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Controller
@RequestMapping("add-recipe")
public class AddRecipeController {
    @Autowired
    private AddRecipeRepository addRecipeRepository;
    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("recipes", addRecipeRepository.findAll() );
        return "add-recipe/index";
    }

    @GetMapping("add")
    public String displayAddRecipeForm(Model model) {
        model.addAttribute(new AddRecipe());
        return "add-recipe/add";
    }

    @PostMapping("add")
    public String processAddRecipeForm(@ModelAttribute @Valid AddRecipe newAddRecipe,
                                       @RequestParam("imageFile") MultipartFile imageFile,
                                       Errors errors, Model model) {
        if (errors.hasErrors()) {
            return "add-recipe/add";
        }
        if (!imageFile.isEmpty()) {
            try {
                byte[] imageData = imageFile.getBytes();
                newAddRecipe.setImageData(imageData);
            } catch (IOException e) {
                // Handle the exception (e.g., log it or show an error message)
            }
        }
//        newAddRecipe.setUploadImage(newAddRecipe.getUploadImage());
        addRecipeRepository.save(newAddRecipe);
//        System.out.println("Recipe added successfully!");
        return "redirect:";
    }
    @GetMapping("view/{recipeId}")
    public String displayViewSkill(Model model, @PathVariable int recipeId) {
        Optional optSkill = addRecipeRepository.findById(recipeId);
        if (optSkill.isPresent()) {
            AddRecipe addRecipe = (AddRecipe) optSkill.get();
            String base64Image = Base64.getEncoder().encodeToString(addRecipe.getImageData());
            model.addAttribute("base64Image", base64Image);
            model.addAttribute("addRecipe", addRecipe);
            return "add-recipe/view";
        } else {
            return "redirect:../";
        }
    }
}
