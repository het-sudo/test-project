# TODO - Simplify Auth Flow

## Backend Changes:

- [x] 1. Update auth.js - Register: save user with name/email/password (no OTP)
- [x] 2. Update auth.js - Login: accept email+password, send OTP to email
- [x] 3. Update auth.js - Add verify-login endpoint: verify OTP, return JWT

## Frontend Changes:

- [x] 4. Update auth.js - login sends email+password, add verifyLoginCode function
- [x] 5. Update Login.jsx - 2-step: email+password → OTP → redirect to notes
- [x] 6. Update Register.jsx - redirect to login after successful register
- [x] 7. Update App.js - remove /verify route (integrated into login)

## Testing:

- [ ] 8. Test registration
- [ ] 9. Test login flow (email+password → OTP → notes)
