"use client";
import { useRef, useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/lib/profile-content";

export function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof data>>({});
  const [draftOpened, setDraftOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const brief = `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\n\nProject details:\n${data.message.trim()}`;
  const emailDraft = `${CONTACT_HREF}?subject=${encodeURIComponent("Let’s discuss a website project")}&body=${encodeURIComponent(brief)}`;
  const update = (key: keyof typeof data, value: string) => {
    setData((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setCopied(false);
    setCopyError(false);
    setDraftOpened(false);
  };
  const validate = () => {
    const next: Partial<typeof data> = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!data.message.trim()) next.message = "Please describe your project.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return false;
    }
    return true;
  };
  const handleDraft = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setDraftOpened(true);
    window.location.href = emailDraft;
  };
  const handleCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
      setCopied(false);
    }
  };
  return (
    <div className="surface-panel p-6 sm:p-8">
      <h2 className="card-title">Prepare your project brief</h2>
      <p className="body-copy mt-3 mb-6">
        Tell me what you have in mind. We’ll open a draft in your email app for
        you to review and send.
      </p>
      <form ref={form} onSubmit={handleDraft} noValidate className="space-y-5">
        <Input
          id="name"
          label="Your name"
          autoComplete="name"
          required
          value={data.name}
          error={errors.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Your name"
        />
        <Input
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={data.email}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
        />
        <Textarea
          id="message"
          label="Project details"
          rows={5}
          required
          value={data.message}
          error={errors.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="What are you building? Include key features, your timeline, and any existing website or designs."
        />
        <Button type="submit" className="w-full">
          Open email draft <ArrowUpRight size={18} aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
          className="w-full"
        >
          {copied ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
          {copied ? "Brief copied" : "Copy project brief"}
        </Button>
        <div role="status" className="text-sm text-ink-secondary">
          {copied
            ? "Copied. You can paste your brief into any email app."
            : draftOpened
              ? "Your draft is ready to open in your email app. Review it and press send there. If no app opened, copy your brief and email me directly."
              : "This form prepares a draft. Nothing is sent until you send it from your email app."}
        </div>
        {copyError && (
          <div role="alert">
            <p className="text-sm text-feedback-error mb-3">
              Automatic copying isn’t available. Select and copy the brief
              below.
            </p>
            <Textarea
              label="Your brief"
              value={brief}
              readOnly
              rows={6}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        )}
        <p className="text-sm text-ink-secondary">
          Prefer a blank email?{" "}
          <a
            href={CONTACT_HREF}
            className="underline underline-offset-4 break-all"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </form>
    </div>
  );
}
