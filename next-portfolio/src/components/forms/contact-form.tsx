"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FormFields = "name" | "email" | "subject" | "message";
type FormErrors = Partial<Record<FormFields, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const values = {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    subject: String(data.get("subject") ?? "").trim(),
    message: String(data.get("message") ?? "").trim(),
  };
  const errors: FormErrors = {};
  if (values.name.length < 2) errors.name = "Please enter at least 2 characters.";
  if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.subject.length < 3) errors.subject = "Please enter at least 3 characters.";
  if (values.message.length < 20) errors.message = "Please provide at least 20 characters.";
  return errors;
}

export function ContactForm({ recipient, endpoint, idPrefix = "contact", onSuccess }: Readonly<{ recipient: string; endpoint?: string; idPrefix?: string; onSuccess?: () => void }>) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setState("error");
      setMessage("Please correct the highlighted fields and try again.");
      const firstInvalidField = Object.keys(nextErrors)[0] as FormFields;
      requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus());
      return;
    }

    const data = new FormData(form);
    if (String(data.get("companyWebsite") ?? "")) {
      setState("success");
      setMessage("Thanks. Your message has been processed.");
      form.reset();
      return;
    }
    if (Date.now() - startedAt.current < 1500) {
      setState("error");
      setMessage("Please take a moment to review your message before sending.");
      return;
    }

    setState("loading");
    setMessage(endpoint ? "Sending your message…" : "Preparing your email draft…");

    if (!endpoint) {
      const subject = encodeURIComponent(String(data.get("subject")));
      const body = encodeURIComponent(`Name: ${String(data.get("name"))}\nEmail: ${String(data.get("email"))}\n\n${String(data.get("message"))}`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      setState("success");
      setMessage("Your email application should now contain a prepared draft. Review it there and press send.");
      return;
    }

    try {
      const response = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Contact provider returned ${response.status}`);
      form.reset();
      startedAt.current = Date.now();
      setErrors({});
      setState("success");
      setMessage("Your message was accepted by the configured contact provider. Thank you.");
      onSuccess?.();
    } catch {
      setState("error");
      setMessage(`The form provider could not accept your message. Please email ${recipient} directly.`);
    }
  };

  const field = (name: FormFields, label: string, type: "text" | "email" = "text", maxLength = 120) => (
    <div className="contact-field">
      <label htmlFor={`${idPrefix}-${name}`}>{label}</label>
      <input id={`${idPrefix}-${name}`} name={name} type={type} required maxLength={maxLength} autoComplete={name === "name" ? "name" : name === "email" ? "email" : "off"} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${idPrefix}-${name}-error` : undefined} onChange={() => errors[name] && setErrors((current) => ({ ...current, [name]: undefined }))} />
      {errors[name] ? <span id={`${idPrefix}-${name}-error`} className="contact-field__error">{errors[name]}</span> : null}
    </div>
  );

  return (
    <form className="contact-form" noValidate onSubmit={submit}>
      <div className="contact-honeypot" aria-hidden="true"><label htmlFor={`${idPrefix}-company-website`}>Company website</label><input id={`${idPrefix}-company-website`} name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" /></div>
      {field("name", "Name", "text", 80)}
      {field("email", "Email", "email", 254)}
      {field("subject", "Subject", "text", 120)}
      <div className="contact-field contact-field--message">
        <label htmlFor={`${idPrefix}-message`}>Message</label>
        <textarea id={`${idPrefix}-message`} name="message" required minLength={20} maxLength={3000} rows={7} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${idPrefix}-message-error` : `${idPrefix}-message-help`} onChange={() => errors.message && setErrors((current) => ({ ...current, message: undefined }))} />
        <span id={`${idPrefix}-message-help`} className="contact-field__help">Please do not include passwords, credentials, or private customer information.</span>
        {errors.message ? <span id={`${idPrefix}-message-error`} className="contact-field__error">{errors.message}</span> : null}
      </div>
      <div className="contact-form__footer">
        <button type="submit" disabled={state === "loading"}>{state === "loading" ? "Working…" : endpoint ? "Send message →" : "Prepare email →"}</button>
        <p className="type-metadata">{endpoint ? "Delivered through the configured form provider." : "No form backend is configured. Submitting opens your email application."}</p>
      </div>
      <div className={`contact-form__status contact-form__status--${state}`} role={state === "error" ? "alert" : "status"} aria-live="polite">{message}</div>
    </form>
  );
}
