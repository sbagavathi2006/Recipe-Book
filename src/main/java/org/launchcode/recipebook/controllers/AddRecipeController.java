package org.launchcode.recipebook.controllers;
import org.launchcode.recipebook.models.data.AddRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

//    @GetMapping("add")
//    public String displayAddRecipeForm(Model model) {
//        model.addAttribute(new Recipe());
//        return "add-recipe/add";
//    }

}
