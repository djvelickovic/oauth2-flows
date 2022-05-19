package io.lib3rtus.authdemo.authorizationcode;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientController {

    @GetMapping(value = "/")
    public String welcomeEndpoint() {
        return "index";
    }
}
