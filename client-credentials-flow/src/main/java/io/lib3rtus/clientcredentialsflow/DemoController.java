package io.lib3rtus.clientcredentialsflow;


import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DemoController {


    private final OAuth2Client oauth2Client;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> demo() {
        return ResponseEntity.ok(oauth2Client.getTokens());
    }

}
