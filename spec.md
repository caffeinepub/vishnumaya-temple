# Vishnumaya Temple

## Current State
Bilingual temple website with booking form, floating contact button, hero section, about section, contact section, and a navbar. Backend has poojas and bookings management.

## Requested Changes (Diff)

### Add
- User registration with mobile number and OTP verification
- Backend: `requestOTP(phoneNumber, name)` -> returns generated OTP (displayed on screen for demo)
- Backend: `verifyOTP(phoneNumber, otp)` -> verifies and registers user, returns success bool
- Backend: `isRegistered(phoneNumber)` -> checks if phone number is already registered
- Frontend: Register button in the navbar
- Frontend: Registration modal with two steps: (1) enter name + phone number -> request OTP, (2) enter 6-digit OTP to verify
- Frontend: On successful registration, show success message
- OTP displayed on-screen since real SMS is not available (demo mode note shown)

### Modify
- Navbar to include a Register button
- backend.d.ts to include new registration functions

### Remove
- Nothing removed

## Implementation Plan
1. Update main.mo to add User type, OTP storage, requestOTP, verifyOTP, isRegistered functions
2. Update backend.d.ts with new types and function signatures
3. Add RegisterModal component with two-step flow
4. Update Navbar to include Register button that opens the modal
