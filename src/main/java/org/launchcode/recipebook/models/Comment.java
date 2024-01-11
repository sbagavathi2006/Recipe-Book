package org.launchcode.recipebook.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
@Entity
public class Comment extends AbstractEntity{
    @NotNull
    @Column(columnDefinition = "LONGTEXT")
    private String text;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createdDate;
    @ManyToOne
    private Recipe recipe;
    @ManyToOne
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Comment(String text, Recipe recipe, User user) {
        this.text = text;
        this.recipe = recipe;
        this.user = user;
    }

    public Comment(){

    }

    public String getCommentUsername() {
        // implement the logic to get the username from the Comment entity
        return "username";  // replace with your actual logic
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
    @PrePersist
    public void setCreatedDate() {
        this.createdDate = LocalDateTime.now();
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }


}
