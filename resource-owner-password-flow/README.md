# Resource Owner Password Flow


```
   The resource owner password credentials grant type is suitable in
   cases where the resource owner has a trust relationship with the
   client, such as the device operating system or a highly privileged
   application.  The authorization server should take special care when
   enabling this grant type and only allow it when other flows are not
   viable.

   This grant type is suitable for clients capable of obtaining the
   resource owner's credentials (username and password, typically using
   an interactive form). It is also used to migrate existing clients
   using direct authentication schemes such as HTTP Basic or Digest
   authentication to OAuth by converting the stored credentials to an
   access token.
   
   RFC 6749 
```

```
     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          v
          |    Resource Owner
         (A) Password Credentials
          |
          v
     +---------+                                  +---------------+
     |         |>--(B)---- Resource Owner ------->|               |
     |         |         Password Credentials     | Authorization |
     | Client  |                                  |     Server    |
     |         |<--(C)---- Access Token ---------<|               |
     |         |    (w/ Optional Refresh Token)   |               |
     +---------+                                  +---------------+
     
     RFC 6749 
```

## Notes

Should be used only if:
- Client is very trusted and no other flows are possible
- First step in migration from 'old ways' to OAuth and using access tokens
- Because the Resource Owner Password (ROP) Flow involves the application handling the user's password, 
  it must not be used by third-party clients.


## Links

- https://datatracker.ietf.org/doc/html/rfc6749#section-4.3
- https://auth0.com/docs/get-started/authentication-and-authorization-flow/resource-owner-password-flow