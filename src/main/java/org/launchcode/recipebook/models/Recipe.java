package org.launchcode.recipebook.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Objects;

@Entity
public class Recipe extends AbstractEntity {

    @NotNull
    @Column(columnDefinition = "LONGTEXT")
    private String name;


    @NotNull
    @Column(columnDefinition = "LONGTEXT")
    private String description;


    @NotNull
    @Column(columnDefinition = "VARBINARY(1000)")
    private String image;

    @NotNull
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients;

    @ManyToOne
    private User user;

    private Boolean userCreated;

    public Recipe(String name, String description, String image, List<Ingredient> ingredients, User user, Boolean userCreated) {
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

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Boolean getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(Boolean userCreated) {
        this.userCreated = userCreated;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Recipe recipe = (Recipe) o;
        return Objects.equals(name, recipe.name) && Objects.equals(description, recipe.description) && Objects.equals(ingredients, recipe.ingredients);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, description, ingredients);
    }
}
