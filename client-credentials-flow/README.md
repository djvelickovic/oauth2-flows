# Client Credentials Flow

```
The client can request an access token using only its client
credentials (or other supported means of authentication) when the
client is requesting access to the protected resources under its
control

...

The client credentials grant type MUST only be used by confidential
clients.


RFC 6749
```

```
     +---------+                                  +---------------+
     |         |                                  |               |
     |         |>--(A)- Client Authentication --->| Authorization |
     | Client  |                                  |     Server    |
     |         |<--(B)---- Access Token ---------<|               |
     |         |                                  |               |
     +---------+                                  +---------------+
```

## Notes

- Used for authorizing service to service communication

## Links
- https://datatracker.ietf.org/doc/html/rfc6749#section-4.4