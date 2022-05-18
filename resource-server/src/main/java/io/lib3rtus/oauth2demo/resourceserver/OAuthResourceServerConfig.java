package io.lib3rtus.oauth2demo.resourceserver;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class OAuthResourceServerConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests(authz -> authz
//                        .antMatchers("/items/**")
//                        .antMatchers(HttpMethod.GET, "/items/**").hasAuthority("SCOPE_read")
//                        .antMatchers(HttpMethod.POST, "/items").hasAuthority("SCOPE_write")
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt());
    }
}