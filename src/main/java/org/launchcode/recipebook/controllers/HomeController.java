package org.launchcode.recipebook.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {


//    @RequestMapping("")
//    public String index() {
//        return "index";
//    }

    @GetMapping("")
    public String index() {
        return "index";
    }
}

