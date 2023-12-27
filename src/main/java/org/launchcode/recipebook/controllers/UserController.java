package org.launchcode.recipebook.controllers;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import org.launchcode.recipebook.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    AuthenticationController authenticationController;

    @GetMapping("/get-user")
    @ResponseBody
    public String getCurrentUser(HttpServletRequest request) {

        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);

        if (user != null) {
            return String.valueOf(user.getId());
        } else {
            return "{\"error\": \"No user in session\"}";
        }
    }
}
