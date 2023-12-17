package org.launchcode.recipebook.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Entity
public class User extends AbstractEntity{

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

//    @OneToMany
//    private List<Recipe> recipes;

    private static final BCryptPasswordEncoder encoder= new BCryptPasswordEncoder();

    public User() {};

    public User(String username, String pwHash) {
        this.username = username;
        this.pwHash = pwHash;
    }

//    public User(String username, String pwHash, List<Recipe> recipes) {
//        this.username = username;
//        this.pwHash = pwHash;
//        this.recipes = recipes;
//    }

//    public List<Recipe> getRecipes() {
//        return recipes;
//    }
//
//    public void setRecipes(List<Recipe> recipes) {
//        this.recipes = recipes;
//    }

    public String getUsername() {
        return this.username;
    }

    public String getPwHash() {
        return this.pwHash;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

}
