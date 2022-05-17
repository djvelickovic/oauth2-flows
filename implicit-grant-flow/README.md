# Implicit Grant Flow

```
The implicit grant type is used to obtain access tokens (it does not
support the issuance of refresh tokens) and is optimized for public
clients known to operate a particular redirection URI.  These clients
are typically implemented in a browser using a scripting language
such as JavaScript.

...

Because the access token is encoded into the redirection URI, 
it may be exposed to the resource owner and other applications 
residing on the same device.

RFC 6749
```

```

     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier     +---------------+
     |         -+----(A)-- & Redirection URI --->|               |
     |  User-   |                                | Authorization |
     |  Agent  -|----(B)-- User authenticates -->|     Server    |
     |          |                                |               |
     |          |<---(C)--- Redirection URI ----<|               |
     |          |          with Access Token     +---------------+
     |          |            in Fragment
     |          |                                +---------------+
     |          |----(D)--- Redirection URI ---->|   Web-Hosted  |
     |          |          without Fragment      |     Client    |
     |          |                                |    Resource   |
     |     (F)  |<---(E)------- Script ---------<|               |
     |          |                                +---------------+
     +-|--------+
       |    |
      (A)  (G) Access Token
       |    |
       ^    v
     +---------+
     |         |
     |  Client |
     |         |
     +---------+

RFC 6749
```

- Should not be used since there are a lot of security issues like history attacks, redirect headers, and so on.
- Implicit Grant Flow is safe only if used for obtaining id tokens for logging in to the app (instead of getting access tokens)
  and doing that with Form POST to the server in traditional web apps
- Recommendation is to avoid this flow and use Authorization Code Flow with PKCE in SPA apps

### Links

- https://datatracker.ietf.org/doc/html/rfc6749#section-4.2
- https://auth0.com/docs/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use
- https://auth0.com/docs/get-started/authentication-and-authorization-flow/implicit-flow-with-form-post




