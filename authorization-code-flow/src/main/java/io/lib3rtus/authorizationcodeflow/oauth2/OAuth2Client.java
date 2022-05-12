package io.lib3rtus.authorizationcodeflow.oauth2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class OAuth2Client {

    @Value("${oauth2.server.authorization-endpoint}")
    private String authorizationEndpoint;

    @Value("${oauth2.server.token-endpoint}")
    private String tokenEndpoint;

    @Value("${oauth2.server.logout-endpoint}")
    private String logoutEndpoint;

    @Value("${oauth2.client.id}")
    private String clientId;

    @Value("${oauth2.client.secret}")
    private String clientSecret;

    @Value("${oauth2.client.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.client.base-uri}")
    private String clientBaseEndpoint;

    public String getAuthorizationEndpoint(String state) {
//        "/realms/OAuth2FlowsTest/protocol/openid-connect/auth?response_type=code&redirect_uri=http://localhost:8280/auth&client_id=authorization-code-flow-demo&state=1234";
        return String.format(authorizationEndpoint+"?response_type=%s&redirect_uri=%s&client_id=%s&state=%s", "code", redirectUri, clientId, state);
    }

    public AuthResponse getTokens(String code) {
        return WebClient.create(tokenEndpoint).post()
                .body(BodyInserters.fromFormData("code", code)
                        .with("grant_type", "authorization_code")
                        .with("client_id", clientId)
                        .with("client_secret", clientSecret)
                        .with("redirect_uri", redirectUri))
                .retrieve()
                .bodyToMono(AuthResponse.class)
                .block();
    }

    public String getLogoutEndpoint() {
        return logoutEndpoint + "?redirect_uri=" + clientBaseEndpoint;
    }
}
