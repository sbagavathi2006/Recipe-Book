package org.launchcode.recipebook.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Entity
public class AddRecipe extends AbstractEntity{
    @NotBlank(message = "Recipe Name is required")
    @Size(min=2, max = 75, message = "Name must be between 2 to 75 characters")
    private String recipeName;

    @NotEmpty(message = "Ingredient is required")
    @Size(min =2, max = 1000, message = "Name should be between 2 to 1000 characters")
    private String ingredients;
    @Column(length = 3000)
    @NotBlank(message = "Preparation is required")
    @Size(min =2, max = 3000, message = "Name should be between 2 to 3000 characters")
    private String preparation;
    @ElementCollection
    @CollectionTable(name = "meal_type", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "meal_type")
    @NotEmpty(message = "Meal Type is required")
    private List<String> mealType;
//    @NotEmpty(message = "Image is required")
    private String uploadImage;

//    @NotBlank(message = "Image is required")
    @Lob
//    @Column(name = "image_data")
    private byte[] imageData;

    // Add a transient field to handle file upload
    @Transient
    private MultipartFile imageFile;

    public AddRecipe(){   }

    public String getUploadImage() {
        return uploadImage;
    }

    public void setUploadImage(String uploadImage) {
        this.uploadImage = uploadImage;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }
    public String getPreparation() {
        return preparation;
    }

    public void setPreparation(String preparation) {
        this.preparation = preparation;
    }

    public List<String> getMealType() {
        return mealType;
    }

    public void setMealType(List<String> mealType) {
        this.mealType = mealType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public MultipartFile getImageFile() {
        return imageFile;
    }

    public void setImageFile(MultipartFile imageFile) {
        this.imageFile = imageFile;
    }
}
