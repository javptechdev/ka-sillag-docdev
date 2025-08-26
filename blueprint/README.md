# Ka-Sillag Connect App - Blueprint Master README

---

## Konsepto

Ang **Ka-Sillag Connect App** ay isang mobile-first, super web app na ginawa para sa Ilocos Training and Regional Medical Center (ITRMC).  
Layunin nitong gawing digital, accessible, at efficient ang mga proseso ng hospital para sa mga staff at empleyado, simula sa simpleng login at account management, hanggang sa mas advanced na modules gaya ng OPD queue, appointment, at dashboard.

Bawat module o page ng app ay may sariling folder na may modular na blueprint (.md files) para madaling i-maintain, i-update, at i-feed sa mga AI developer tools tulad ng Cursor AI agent.

---

## Tech Stack na Gagamitin

- **Next.js**
- **Tailwind CSS**
- **Typescript**
- **ShadCN**
- **Supabase**
- **PWA**
- **Reusable Component Design**

---

## Folder & Blueprint Structure

```
/blueprint
  README.md
  /login/
    login.md
    greetings.md
    login-form.md
    request-account-modal.md
    forget-credentials-modal.md
    copyright-footer.md
    install-app-button.md
```

---

## Navigation

- [LOGIN PAGE](./login/login.md)
  - [Greetings Component](./login/greetings.md)
  - [Login Form](./login/login-form.md)
  - [Request Account Modal](./login/request-account-modal.md)
  - [Forget Credentials Modal](./login/forget-credentials-modal.md)
  - [Copyright Footer](./login/copyright-footer.md)
  - [Install App Button](./login/install-app-button.md)

---

## Notes para sa Developers

- Tagalog blueprints
- Mobile-first
- Modular components
- Pwedeng dagdagan ng schema/API guide
