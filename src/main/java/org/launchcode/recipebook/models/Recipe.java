package org.launchcode.recipebook.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
public class Recipe extends AbstractEntity {

    @NotBlank(message = "Name cannot be blank")
    @NotNull
    @Size(min = 3, max = 50, message = "Recipe name must be between 3 and 50 characters")
    private String name;

    @Column(length = 2000)
    @Size(min = 10, max = 2000, message = "Description must be between 10 and 1000 characters")
    private String description;

    private String image;

    @Column(length = 1000)
    private List<String> ingredients;

    @ManyToOne
    private User user;

    public Recipe(String name, String description, String image, List<String> ingredients, User user) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.ingredients = ingredients;
        this.user = user;
    }

    public Recipe () {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    //    public double getAverageRating() {
//        return averageRating;
//    }
//
//    public void setAverageRating(double averageRating) {
//        this.averageRating = averageRating;
//    }
//
//    public int getTotalVotes() {
//        return totalVotes;
//    }
//
//    public void setTotalVotes(int totalVotes) {
//        this.totalVotes = totalVotes;
//    }


}
