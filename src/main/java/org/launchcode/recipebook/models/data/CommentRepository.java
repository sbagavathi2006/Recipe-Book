package org.launchcode.recipebook.models.data;

import jakarta.transaction.Transactional;
import org.launchcode.recipebook.models.Comment;
import org.launchcode.recipebook.models.Recipe;
import org.launchcode.recipebook.models.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findByRecipe(Recipe recipe);
//    List<Comment> findByCreatedBy(User user);
    List<Comment> findByUser(User user);
    @Modifying
    @Transactional
    void deleteByRecipe(Recipe existingRecipe);
}
