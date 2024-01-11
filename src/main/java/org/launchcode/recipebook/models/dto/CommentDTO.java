package org.launchcode.recipebook.models.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class CommentDTO {

    @NotNull
    private String text;

    @NotNull
    private int recipeId;

    @NotNull
    private int userId;

    // Add username field
    @NotNull
    private String username;
    private LocalDateTime createdAt;

    // Getter and setter for createdAt
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Getter and setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public void setCreatedAt(String formattedDate) {
    }
}
