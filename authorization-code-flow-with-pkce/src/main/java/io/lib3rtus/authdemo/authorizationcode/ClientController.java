package io.lib3rtus.authdemo.authorizationcode;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class ClientController {

    @GetMapping(value = "/")
    public String welcomeEndpoint(@RequestParam Map<String, String> reqParam, @RequestHeader Map<String, String> headers, HttpServletRequest request) {
        return "index";
    }
}
