package org.launchcode.recipebook.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginFormDTO {

    @NotNull
    @NotBlank
    @Size(min=6, max=15, message="Username must be between 6 and 15 characters.")
    private String username;

    @NotNull
    @NotBlank
    @Size(min=6, max=15, message="Password must be between 6 and 15 characters long")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
