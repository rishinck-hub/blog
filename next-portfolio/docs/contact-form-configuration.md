# Contact form configuration

The contact form has no first-party API route because the existing portfolio does not include a verified email service or secure contact backend.

## Default mode

When `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is empty, the form validates in the browser and opens a pre-addressed draft in the visitor's email application. The interface does not claim the message was delivered; the visitor must review and send the draft.

## Optional provider mode

Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in the Vercel project environment to a trusted provider-owned form submission URL. The value is public by design and must not contain an API key, token, password, or other credential. The form sends standard `multipart/form-data` and requests a JSON response.

The selected provider must perform its own server-side validation, rate limiting, origin restrictions, and abuse filtering. Test the provider response and failure state in a preview deployment before enabling it in production.

## Validation and spam controls

- Required client-side validation with length limits and email-format checking.
- A hidden honeypot field silently absorbs simple automated submissions.
- A minimum completion time rejects unrealistically fast submission attempts.
- No first-party endpoint exists for bots to target in the default mail-draft mode.
- Provider-side validation, rate limiting, and spam filtering remain required when provider mode is enabled.
