package org.launchcode.recipebook.util;

import org.launchcode.recipebook.models.Comment;
import org.launchcode.recipebook.models.dto.CommentDTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentMapper {

    public static CommentDTO convertToCommentDTO(Comment comment, String username) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setText(comment.getText());
        commentDTO.setRecipeId(comment.getRecipe().getId());
        commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setUsername(username); // Include the username in the DTO

        return commentDTO;
    }
}
