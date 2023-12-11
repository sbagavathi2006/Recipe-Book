package org.launchcode.recipebook.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
public class AddRecipe extends AbstractEntity{
    @NotBlank(message = "Recipe Name is required")
    @Size(min=2, max = 75, message = "Name must be between 2 to 75 characters")
    private String recipeName;

//    @NotBlank(message = "Ingredient is required")
//    @Size(min =2, max = 250, message = "Name should be between 2 to 250 characters")
//    private List<String> ingredients = new ArrayList<>();

    @NotBlank(message = "Preparation is required")
    @Size(min =2, max = 1500, message = "Name should be between 2 to 1500 characters")
    private String preparation;

    @NotBlank(message = "Meal Type is required")
    private String mealType;

    @NotBlank(message = "Creator Name is required")
    @Size(min=2, max = 75, message = "Name must be between 2 to 75 characters")
    private String creatorName;

    @NotBlank(message = "Image is required")
    private String imageUrl;

    public AddRecipe(){   }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

//    public List<String> getIngredients() {
//        return ingredients;
//    }
//
//    public void setIngredients(List<String> ingredients) {
//        this.ingredients = ingredients;
//    }

    public String getPreparation() {
        return preparation;
    }

    public void setPreparation(String preparation) {
        this.preparation = preparation;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
