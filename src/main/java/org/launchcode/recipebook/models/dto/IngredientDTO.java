package org.launchcode.recipebook.models.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import org.launchcode.recipebook.models.Recipe;

public class IngredientDTO {

  @NotNull
  private String name;

  @NotNull
  private String originalName;

  @NotNull
  @JsonIgnore
  private Recipe recipe;

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

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
