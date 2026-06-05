"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-accent-subtle border border-accent/20 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <p className="text-xl font-bold text-foreground mb-2">Message sent successfully</p>
        <p className="text-muted">
          Thank you for reaching out. Our team will respond within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm";

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-5">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-foreground">Send Us Message</h3>
        <p className="text-sm text-muted mt-1">We typically respond within 24 hours.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-accent">*</span>
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address <span className="text-accent">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="john@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
          Company
        </label>
        <input id="company" name="company" type="text" className={inputClass} placeholder="Your organisation" />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          How can we help?
        </label>
        <select id="subject" name="subject" className={inputClass}>
          <option value="general">General Inquiry</option>
          <option value="salesforce">Salesforce Services</option>
          <option value="oracle">Oracle Services</option>
          <option value="rails">Ruby on Rails Development</option>
          <option value="netsuite">NetSuite Services</option>
          <option value="products">Product Demo</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
          placeholder="Tell us about your project, timeline, and goals..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        <Send className="w-4 h-4" />
        Send Message
      </Button>
    </form>
  );
}
