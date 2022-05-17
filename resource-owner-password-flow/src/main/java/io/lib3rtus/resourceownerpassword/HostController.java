package io.lib3rtus.resourceownerpassword;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HostController {

    @GetMapping("index")
    public String index() {
        return "index";
    }
}
