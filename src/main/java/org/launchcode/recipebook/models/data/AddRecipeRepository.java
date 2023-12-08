package org.launchcode.recipebook.models.data;

import org.launchcode.recipebook.models.AddRecipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddRecipeRepository extends CrudRepository<AddRecipe, Integer> {
}
