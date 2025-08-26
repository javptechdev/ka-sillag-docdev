# Login Form Component

## Purpose
Input fields para sa Employee ID at 6-Digit Pin Code  
Login Button with validations and toast notifications

---

## Fields & UI

- **Employee ID**
  - Input type: number
  - 10 digits, required
- **6-Digit Pin Code**
  - Input type: number/password
  - 6 digits, may eye icon for show/hide
- **Login Button**
  - Disabled kung may blank fields
- **Toast Notification**
  - For errors/validation feedback

---

## Flow

1. User enters Employee ID at Pin Code
2. Pag-blanko: toast “Please Enter Employee ID and Pin-Code”
3. Kulang ang field: toast “Please enter Employee ID” or “Please enter Pin Code”
4. Mali ang credentials: toast “Employee ID and Pin Code is incorrect”, “Employee ID is incorrect”, or “Pin Code is incorrect” (base sa error)

---

## Validation Rules

- Employee ID: 10 digits, numbers only, required
- Pin Code: 6 digits, numbers only, required

---

## Eye Icon
- Toggle show/hide Pin Code (default: hidden)

---

## Styling
- Rounded input boxes, soft shadow
- Button: Main color (green), white text, rounded
- Eye icon: simple outline
