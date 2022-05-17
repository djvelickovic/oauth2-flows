# Authorization Code Flow with PKCE

## Attack
```
OAuth 2.0 [RFC6749] public clients are susceptible to the
authorization code interception attack.

In this attack, the attacker intercepts the authorization code
returned from the authorization endpoint within a communication path
not protected by Transport Layer Security (TLS), such as inter-
application communication within the client's operating system.

Once the attacker has gained access to the authorization code, it can
use it to obtain the access token.


Figure 1 shows the attack graphically.  In step (1), the native
application running on the end device, such as a smartphone, issues
an OAuth 2.0 Authorization Request via the browser/operating system.
The Redirection Endpoint URI in this case typically uses a custom URI
scheme.  Step (1) happens through a secure API that cannot be
intercepted, though it may potentially be observed in advanced attack
scenarios.  The request then gets forwarded to the OAuth 2.0
authorization server in step (2).  Because OAuth requires the use of
TLS, this communication is protected by TLS and cannot be
intercepted.  The authorization server returns the authorization code
in step (3).  In step (4), the Authorization Code is returned to the
requester via the Redirection Endpoint URI that was provided in step
(1).

Note that it is possible for a malicious app to register itself as a
handler for the custom scheme in addition to the legitimate OAuth 2.0
app.  Once it does so, the malicious app is now able to intercept the
authorization code in step (4).  This allows the attacker to request
and obtain an access token in steps (5) and (6), respectively.


    +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
    | End Device (e.g., Smartphone)  |
    |                                |
    | +-------------+   +----------+ | (6) Access Token  +----------+
    | |Legitimate   |   | Malicious|<--------------------|          |
    | |OAuth 2.0 App|   | App      |-------------------->|          |
    | +-------------+   +----------+ | (5) Authorization |          |
    |        |    ^          ^       |        Grant      |          |
    |        |     \         |       |                   |          |
    |        |      \   (4)  |       |                   |          |
    |    (1) |       \  Authz|       |                   |          |
    |   Authz|        \ Code |       |                   |  Authz   |
    | Request|         \     |       |                   |  Server  |
    |        |          \    |       |                   |          |
    |        |           \   |       |                   |          |
    |        v            \  |       |                   |          |
    | +----------------------------+ |                   |          |
    | |                            | | (3) Authz Code    |          |
    | |     Operating System/      |<--------------------|          |
    | |         Browser            |-------------------->|          |
    | |                            | | (2) Authz Request |          |
    | +----------------------------+ |                   +----------+
    +~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+

RFC 7636

```



## Proof Key for Code Exchange (PKCE)

```
                                                 +-------------------+
                                                 |   Authz Server    |
       +--------+                                | +---------------+ |
       |        |--(A)- Authorization Request ---->|               | |
       |        |       + t(code_verifier), t_m  | | Authorization | |
       |        |                                | |    Endpoint   | |
       |        |<-(B)---- Authorization Code -----|               | |
       |        |                                | +---------------+ |
       | Client |                                |                   |
       |        |                                | +---------------+ |
       |        |--(C)-- Access Token Request ---->|               | |
       |        |          + code_verifier       | |    Token      | |
       |        |                                | |   Endpoint    | |
       |        |<-(D)------ Access Token ---------|               | |
       +--------+                                | +---------------+ |
                                                 +-------------------+
                                                 
RFC 7636
```


## Notes

- Optimized for **public** clients like **Native Apps** or **SPA**


## Links

- https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
- https://datatracker.ietf.org/doc/html/rfc7636
- https://auth0.com/docs/get-started/authentication-and-authorization-flow/which-oauth-2-0-flow-should-i-use
- https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce
- https://www.appsdeveloperblog.com/pkce-verification-in-authorization-code-grant/
- 
- Best practices for SPA: https://curity.io/resources/learn/spa-best-practices/