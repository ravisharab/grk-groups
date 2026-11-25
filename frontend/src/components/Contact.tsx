
import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowRight,
  Building2,
  Mail,
  MessageSquare,
} from 'lucide-react';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

// Replace this with your actual business email.
const BUSINESS_EMAIL = 'rkganta85@gmail.com';

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  function updateField(field: keyof ContactForm, value: string) {
    setForm(previous => ({
      ...previous,
      [field]: value,
    }));
    setError('');
    setStatus('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !form.service || !message) {
      setError('Please complete all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.phone.trim() &&
        !/^[+()\d\s.-]{7,20}$/.test(form.phone.trim())) {
      setError('Please enter a valid phone number.');
      return;
    }

    const subject = `GRK Groups Inquiry - ${form.service}`;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Service: ${form.service}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const mailto = `mailto:${BUSINESS_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setStatus(
      'Your email application should open. ' +
      'Please review the message and press Send.'
    );

    window.location.href = mailto;
  }

  const fieldClass =
    'w-full rounded-xl border border-white/20 ' +
    'bg-white/10 px-4 py-3.5 text-white ' +
    'placeholder:text-slate-400 outline-none ' +
    'transition focus:border-amber-300 ' +
    'focus:ring-2 focus:ring-amber-300/20';

  return (
    <section
      id="contact"
      className="relative overflow-hidden
                 bg-[#06152f] px-6 py-24 text-white"
    >
      <div className="pointer-events-none absolute
                      -right-32 top-0 h-96 w-96
                      rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl
                      items-start gap-14 lg:grid-cols-2">
        <div className="lg:pt-10">
          <p className="mb-4 font-bold uppercase
                        tracking-[0.3em] text-amber-300">
            Get in Touch
          </p>

          <h2 className="mb-7 text-4xl font-black
                         leading-tight md:text-6xl">
            Let's Create
            <span className="grk-gold-text">
              {' '}Something Great.
            </span>
          </h2>

          <p className="mb-10 max-w-lg text-lg
                        leading-8 text-slate-300">
            Tell us about your project, technology
            needs or business goals. We'd love
            to hear from you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Building2 className="text-amber-300" />
              <span>GRK Groups — Business Solutions</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-amber-300" />
              <span>Contact our business team</span>
            </div>

            <div className="flex items-center gap-4">
              <MessageSquare className="text-amber-300" />
              <span>Discuss your next project</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-white/20
                     bg-white/10 p-6 shadow-2xl
                     backdrop-blur-xl md:p-10"
        >
          <h3 className="mb-2 text-2xl font-bold">
            Send an Inquiry
          </h3>

          <p className="mb-8 text-sm text-slate-300">
            Fields marked * are required.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name"
                     className="mb-2 block text-sm">
                Full Name *
              </label>
              <input
                id="contact-name"
                className={fieldClass}
                placeholder="Your name"
                autoComplete="name"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contact-email"
                     className="mb-2 block text-sm">
                Email Address *
              </label>
              <input
                id="contact-email"
                type="email"
                className={fieldClass}
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={e => updateField('email', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contact-phone"
                     className="mb-2 block text-sm">
                Phone Number
              </label>
              <input
                id="contact-phone"
                type="tel"
                className={fieldClass}
                placeholder="+1 555 000 0000"
                autoComplete="tel"
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contact-service"
                     className="mb-2 block text-sm">
                Service *
              </label>
              <select
                id="contact-service"
                className={fieldClass}
                value={form.service}
                onChange={e => updateField('service', e.target.value)}
              >
                <option value="" className="text-slate-900">
                  Select a service
                </option>
                {[
                  'Web Development',
                  'Cloud Solutions',
                  'IT Consulting',
                  'API & Integration',
                  'Data Solutions',
                  'Application Modernization',
                  'Other',
                ].map(service => (
                  <option
                    key={service}
                    value={service}
                    className="text-slate-900"
                  >
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message"
                   className="mb-2 block text-sm">
              Your Message *
            </label>
            <textarea
              id="contact-message"
              rows={5}
              className={fieldClass}
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={e => updateField('message', e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="mt-5 text-sm text-red-300">
              {error}
            </p>
          )}

          {status && (
            <p role="status" className="mt-5 text-sm text-amber-200">
              {status}
            </p>
          )}

          <button
            type="submit"
            className="grk-gold-button mt-7 flex w-full
                       items-center justify-center gap-3
                       rounded-xl px-6 py-4
                       font-bold text-slate-950"
          >
            Prepare Email Inquiry
            <ArrowRight size={20} />
          </button>

          <p className="mt-5 text-center text-xs
                        text-slate-400">
            Opens your email application to send the inquiry.
          </p>
        </form>
      </div>
    </section>
  );
}
