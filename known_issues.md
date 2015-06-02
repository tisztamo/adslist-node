# Known security issues

## 1. XSS
- Missing sanitization in ad editing. It allows injecting a script to the admins session during approval.
- Reflected DOM XSS on the public page in the token REST parameter (after the last / )

## 2. Broken access control in API
- Ad properties can be edited, ad can published, rejected etc without access control.
- Ad of another user can be accessed and modified through the api.

## 3. Broken Authentication
Valid publication token can be created by registering a user using the ad id as user id and logging in. Non-published ads can be displayed on the public site this way.

## 4. Data exposure
Personal info of the creator is leaked in the ad

## 5. Race condition
in the approve workflow allows editing the ad while it is in review.

## 6. Broken Websocket Authentication
Publication token can be used as authentication token on the socket interface - non-published ads can be watched for, they are published at approval

