# Pallikudath Vishnumaya Temple

## Current State
Fully bilingual temple website with hero, booking form, about, contact, floating contact button, register/login with WhatsApp OTP, notification bell, admin panel.

## Requested Changes (Diff)

### Add
- Token booking system: users book a token before visiting; numbers start from 101
- After booking, token number shown and shareable to WhatsApp
- Token icon (ticket) in navbar opens TokenModal
- TokenModal: name + phone form, assigns next token, shows token with WhatsApp share
- Backend: Token type, nextTokenNumber=101, bookToken(), getMyToken(), getAllTokens()
- Bilingual strings for token feature
- Admin panel tokens section

### Modify
- Navbar: add gold ticket icon button
- AdminPanel: add tokens list
- Backend main.mo: token booking logic

### Remove
- Nothing

## Implementation Plan
1. Update backend main.mo with token logic
2. Create TokenModal component
3. Update Navbar with ticket icon
4. Add translations to LanguageContext
5. Update AdminPanel to show tokens
