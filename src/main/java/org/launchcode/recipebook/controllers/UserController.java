package org.launchcode.recipebook.controllers;

import jakarta.servlet.http.HttpSession;
import org.launchcode.recipebook.models.User;
import org.launchcode.recipebook.services.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserSessionService userSessionService;

    @GetMapping("/get-user")
    @ResponseBody
    public String getCurrentUser(HttpSession session) {
        User user = userSessionService.getUserFromSession(session);

        if (user != null) {
            return "{\"userId\": " + user.getId() + "}";
        } else {
            return "{\"error\": \"No user in session\"}";
        }
    }
}
