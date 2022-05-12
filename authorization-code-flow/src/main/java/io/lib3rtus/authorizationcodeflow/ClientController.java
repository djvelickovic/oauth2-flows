package io.lib3rtus.authorizationcodeflow;

import io.lib3rtus.authorizationcodeflow.oauth2.OAuth2Client;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ClientController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> welcomeEndpoint(@RequestParam Map<String, String> reqParam, @RequestHeader Map<String, String> headers, HttpServletRequest request) {
        return ResponseEntity.ok("Hello world!");
    }

}
