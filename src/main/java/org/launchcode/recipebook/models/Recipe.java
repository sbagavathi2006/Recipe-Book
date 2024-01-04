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
    private String description;
    @Column(columnDefinition = "LONGTEXT")
    @NotNull
    private String image;
    @Column(columnDefinition = "VARBINARY(1000)")
    @NotNull
    private List<String> ingredients;
    @ManyToOne
    private User user;
    private Boolean userCreated;

    public Recipe(String name, String description, String image, List<String> ingredients, User user, Boolean userCreated) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.ingredients = ingredients;
        this.user = user;
        this.userCreated = userCreated;
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


    public Boolean getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(Boolean userCreated) {
        this.userCreated = userCreated;
    }
}
