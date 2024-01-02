package org.launchcode.recipebook.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Recipe extends AbstractEntity {

    @NotNull
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    @NotNull
//    @Column(length = 1000)
    private String description;
    @Column(columnDefinition = "LONGTEXT")
    @NotNull
    private String image;
    @Column(columnDefinition = "VARBINARY(500)")
    @NotNull
//    @Column(length = 1000)
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

//    public void setName(String name) {
//        this.name = name;
//    }

    public String getDescription() {
        return description;
    }

//    public void setDescription(String description) {
//        this.description = description;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImage() {
        return image;
    }

//    public void setImage(String image) {
//        this.image = image;
//    }

    public List<String> getIngredients() {
        return ingredients;
    }

//    public void setIngredients(List<String> ingredients) {
//        this.ingredients = ingredients;
//    }

}
