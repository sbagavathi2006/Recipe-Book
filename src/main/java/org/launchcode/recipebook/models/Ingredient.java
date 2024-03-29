package org.launchcode.recipebook.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ingredient extends AbstractEntity {

    private String name;

    private String originalName;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    @JsonIgnoreProperties("ingredients")
    private Recipe recipe;


    public Ingredient(String name, String originalName, Recipe recipe) {
      this.name = name;
      this.originalName = originalName;
      this.recipe = recipe;
    }

    public Ingredient() {}


    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getOriginalName() {
      return originalName;
    }

    public void setOriginalName(String originalName) {
      this.originalName = originalName;
    }

    public Recipe getRecipe() {
      return recipe;
    }

    public void setRecipe(Recipe recipe) {
      this.recipe = recipe;
    }
}
