package io.lib3rtus.authdemo.authorizationcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthorizationCodeFlowWithPkceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthorizationCodeFlowWithPkceApplication.class, args);
	}

}
