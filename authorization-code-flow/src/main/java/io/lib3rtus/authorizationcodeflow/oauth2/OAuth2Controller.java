package io.lib3rtus.authorizationcodeflow.oauth2;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class OAuth2Controller {

    private final OAuth2Client oauth2Client;

    @GetMapping(value = "/client-oauth2", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> auth(@RequestParam String code, @RequestParam String state, @RequestHeader Map<String, String> headers, HttpServletRequest request) {
        var data = new HashMap<String, Object>();

        data.put("headers", headers);
        data.put("cookies", request.getCookies());

        var session = request.getSession();

        var auth = oauth2Client.getTokens(code);
        session.setAttribute("auth", auth);
        session.setAttribute("authenticated", true);

        data.put("authenticated", session.getAttribute("authenticated"));
        data.put("auth_token", session.getAttribute("access_token"));

        log.info("Data: {}", data);

        return ResponseEntity.status(302).header("Location", (String) session.getAttribute(state)).build();
    }

    @GetMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        var logoutUri = oauth2Client.getLogoutEndpoint();
        return ResponseEntity.status(302).header("Location", logoutUri).build();
    }
}
