package org.launchcode.recipebook.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.launchcode.recipebook.models.Comment;
import org.launchcode.recipebook.models.Recipe;
import org.launchcode.recipebook.models.User;
import org.launchcode.recipebook.models.data.CommentRepository;
import org.launchcode.recipebook.models.data.RecipeRepository;
import org.launchcode.recipebook.models.data.UserRepository;
import org.launchcode.recipebook.models.dto.CommentDTO;
import org.launchcode.recipebook.util.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("comment")
public class CommentController {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private CommentRepository commentRepository;

    private List<CommentDTO> mapComments(List<Comment> comments) {
        return comments.stream()
                .map(comment -> {
                    CommentDTO commentDTO = CommentMapper.convertToCommentDTO(comment, comment.getUser().getUsername());
                    commentDTO.setCreatedAt(comment.getCreatedDate()); // Set createdAt field
                    return commentDTO;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/recipe/{recipeId}")
    public ResponseEntity<List<CommentDTO>> getCommentsForRecipe(@PathVariable int recipeId) {
        // Fetch the recipe from the repository using the provided recipeId
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);

        if (optionalRecipe.isPresent()) {
            Recipe recipe = optionalRecipe.get();
            List<CommentDTO> commentDTOs = mapComments(commentRepository.findByRecipe(recipe));
            return ResponseEntity.ok(commentDTOs);
        } else {
            // Recipe not found
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("add")
    public ResponseEntity<String> addComment(@RequestBody @Valid CommentDTO commentDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation errors found");
        }

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);


        int recipeId = commentDTO.getRecipeId();
        System.out.println("Received comment for recipeId: " + recipeId);

        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

        if (recipe != null) {
            Comment comment = new Comment(commentDTO.getText(), recipe, user);

            try {
                commentRepository.save(comment);
//                return ResponseEntity.ok("Comment added successfully");
                // After saving the comment, fetch the updated comments list and send it back to the client
                List<CommentDTO> updatedComments = mapComments(commentRepository.findByRecipe(recipe));
                return ResponseEntity.ok(updatedComments.toString());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding comment");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found");
        }
    }
}
