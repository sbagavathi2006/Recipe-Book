package org.launchcode.recipebook.controllers;
import jakarta.validation.Valid;
import org.launchcode.recipebook.models.AddRecipe;
import org.launchcode.recipebook.models.data.AddRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

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
                                       Errors errors, Model model) {
        if (errors.hasErrors()) {
            return "add-recipe/add";
        }
        addRecipeRepository.save(newAddRecipe);
        return "redirect:";
    }
    @GetMapping("view/{recipeId}")
    public String displayViewSkill(Model model, @PathVariable int recipeId) {

        Optional optSkill = addRecipeRepository.findById(recipeId);
        if (optSkill.isPresent()) {
            AddRecipe addRecipe = (AddRecipe) optSkill.get();
            model.addAttribute("addRecipe", addRecipe);
            return "add-recipe/view";
        } else {
            return "redirect:../";
        }

    }
}
