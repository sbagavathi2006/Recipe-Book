//package org.launchcode.recipebook.models;
//
//import jakarta.persistence.Entity;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Size;
//
//@Entity
//public class Recipe extends AbstractEntity {
//
//    @NotBlank(message = "Name cannot be blank")
//    @NotNull
//    @Size(min = 3, max = 50, message = "Recipe name must be between 3 and 50 characters")
//    private String name;
//
//    @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters")
//    private String description;
//
//    @ManytoOne
//    private User user;
//
//    public Recipe(String name, String description, User user) {
//        this.name = name;
//        this.description = description;
//        this.user = user;
//    }
//
//    public Recipe () {}
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public double getAverageRating() {
//        return averageRating;
//    }
//
//    public void setAverageRating(double averageRating) {
//        this.averageRating = averageRating;
//    }
//
//    public int getTotalVotes() {
//        return totalVotes;
//    }
//
//    public void setTotalVotes(int totalVotes) {
//        this.totalVotes = totalVotes;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//}
