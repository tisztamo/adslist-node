# Known security issues

## 1. XSS
- Missing sanitization in ad editing. It allows injecting a script to the admins session during approval.
- Reflected DOM XSS on the public page in the token REST parameter (after the last / )

## 2. Broken token protection in publication
Valid publication token can be created by registering a user using the ad id as user id and logging in. Even non-published ads can be displayed on the public site this way.

## 3. Broken Websocket Authentication
Publication token can be used as authentication token on the socket interface - non-published ads can be watched for, they are published at approval

## 4. Personal data leak
Personal info of the creator is leaked in the ad

## 5. Race condition
in the approve workflow allows editing the ad while it is in review.

## 6. XSS
Reflected DOM XSS on the public page in the token REST parameter (after the last / )

## 7. CSRF
Bearer token is distributed in a cookie and the cookie validates a request without the authorization header which opens the door for CSRF

## 8. Broken access control in API
- Ad properties can be edited, ad can published, rejected etc without access control.
- Ad of another user can be accessed and modified through the api.

