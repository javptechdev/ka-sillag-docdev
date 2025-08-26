# Request Account Modal

## Purpose
Form para magrequest ng bagong account, lalabas bilang modal

---

## Fields & UI

- Employee ID (number only, 10 digits, check kung unique)
- First Name, Middle Name, Last Name
- Extension Name (Dropdown: Jr, Sr, III, blank)
- Division (Dropdown: Medical, Nursing, Finance, HOPPS, MCC, BUCAS)
- Unit (Dependent dropdown based sa division)
- Plantilla Type (Dropdown: Plantilla, Contract of Service)
- Plantilla Position (Dropdown, depende sa unit)
- Active Email (validate & check kung existing)
- Mobile Number (+639xxxxxxxxx, validate)
- Upload ID Picture (image file)

---

## Flow

1. Employee ID check (unique)
2. Fill out form
3. Click "Send"
4. System sends OTP sa email
5. User inputs OTP
6. On success: modal “Account Request Successful. Please coordinate with DHIU for activation.”

---

## Validation

- Employee ID & Email: unique
- Mobile: PH format lang
- All fields: required except extension

---

## Styling

- Modal, center screen, rounded corners, purple header
- “Send” button: green
