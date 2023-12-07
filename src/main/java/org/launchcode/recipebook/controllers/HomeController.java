package org.launchcode.recipebook.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/custom-login")
    public String displayLogin() { return "custom-login"; }

}
