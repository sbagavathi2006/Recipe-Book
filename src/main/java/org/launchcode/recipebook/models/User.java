package org.launchcode.recipebook.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity{

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Recipe> recipes;

    private static final BCryptPasswordEncoder encoder= new BCryptPasswordEncoder();

    public User() {};

    public User(String username, String password, List<Recipe> recipes) {
        this.username = username;
        this.pwHash = encoder.encode(password);
        this.recipes = recipes;
    }

    public boolean isMatchingPassword(String password) {
        return BCrypt.checkpw(password, pwHash);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwHash() {
        return pwHash;
    }

    public void setPwHash(String pwHash) {
        this.pwHash = pwHash;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(username, user.username) && Objects.equals(pwHash, user.pwHash);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), username, pwHash);
    }
}
