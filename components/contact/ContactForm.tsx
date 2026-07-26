import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2 } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = "Name is Required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    if (!formData.message.trim()) errs.message = "Message is Empty";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1000);
    }
  };

  return (
    <div className="lg:col-span-7 bg-mono-900 border border-mono-700 p-8 sm:p-10 rounded-[8px]">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
          <CheckCircle2 className="w-16 h-16 text-white animate-bounce" />
          <h3 className="font-archivo text-2xl font-bold uppercase text-white">
            Message Sent Successfully!
          </h3>
          <p className="font-sans text-mono-400 text-sm max-w-md">
            Thank you for contacting me. Your message has been received and will be responded to as soon as possible.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSubmitted(false)}
            className="mt-4"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-mono-300">
              Name <span className="text-white">*</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-xs font-sans text-red-400">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-mono-300">
              Email Address <span className="text-white">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={errors.email ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.email && (
              <span className="text-xs font-sans text-red-400">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-mono-300">
              Message <span className="text-white">*</span>
            </label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              className={errors.message ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.message && (
              <span className="text-xs font-sans text-red-400">{errors.message}</span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full gap-2 mt-2"
          >
            <span>{isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}</span>
          </Button>
        </form>
      )}
    </div>
  );
};
