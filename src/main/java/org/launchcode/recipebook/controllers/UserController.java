package org.launchcode.recipebook.controllers;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import org.launchcode.recipebook.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    AuthenticationController authenticationController;

    @GetMapping("/getUser")
    @ResponseBody
    public ResponseEntity<String> getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);

        if (user != null) {
            // Return user ID as a string
            return ResponseEntity.ok(String.valueOf(user.getId()));
        } else {
            // Return an error response with HTTP 404 Not Found status
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"No user in session\"}");
        }
    }
}
