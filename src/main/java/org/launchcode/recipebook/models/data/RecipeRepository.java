package org.launchcode.recipebook.models.data;

import org.launchcode.recipebook.models.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Integer> {
    Recipe findByName(String name);
    List<Recipe> findByUserId(int userId);
}
