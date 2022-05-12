package io.lib3rtus.authorizationcodeflow.oauth2;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

@Order(1)
@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2Filter implements Filter {

    private final OAuth2Client oAuth2Client;

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {

        var request = (HttpServletRequest) servletRequest;
        var response = (HttpServletResponse) servletResponse;

        var path = request.getServletPath();

        if (path.equals("/client-oauth2")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        var session = request.getSession();

        Boolean isAuthenticated = (Boolean) session.getAttribute("authenticated");
        if (isAuthenticated != null && isAuthenticated) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        var state = UUID.randomUUID().toString();
        session.setAttribute(state, request.getRequestURL().toString());

        var authorizationEndpoint = oAuth2Client.getAuthorizationEndpoint(state);
        response.sendRedirect(authorizationEndpoint);
    }
}
