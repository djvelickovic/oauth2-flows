package io.lib3rtus.clientcredentialsflow;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class OAuth2Client {


    @Value("${oauth2.server.token-endpoint}")
    private String tokenEndpoint;
    @Value("${oauth2.client.id}")
    private String clientId;

    @Value("${oauth2.client.secret}")
    private String clientSecret;


    public AuthResponse getTokens() {
        return WebClient.create(tokenEndpoint).post()
                .body(BodyInserters.fromFormData("grant_type", "client_credentials")
                        .with("client_id", clientId)
                        .with("client_secret", clientSecret))
                .retrieve()
                .bodyToMono(AuthResponse.class)
                .block();
    }
}
