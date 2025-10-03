"use client";

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry'); // Added subject with a default
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only run reCAPTCHA if a site key is configured
    let recaptchaToken: string | undefined = undefined;
    if (siteKey && recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      if (token) {
        recaptchaToken = token;
      } else {
        setStatus({ type: 'error', message: 'Please complete the CAPTCHA.' });
        return;
      }
    }
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, recaptchaToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({ type: 'success', message: data.message });
      // Clear form
      setName('');
      setEmail('');
      setMessage('');

    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-neutral-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-accent rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-brand-teal rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-brand-navy rounded-full animate-pulse"></div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 relative">
        <div className="text-center mb-12 animate-fade-in">
          {/* Bouncing envelope icon */}
          <div className="inline-block mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
            <svg className="w-12 h-12 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-brand-navy dark:text-white">Contact Us</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            We are a dedicated team of logistics professionals committed to providing fast, reliable, and secure delivery services. Our mission is to connect people and businesses with what matters most, offering peace of mind with every parcel we handle.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Have a question or need assistance? We'd love to hear from you and help make your shipping experience seamless.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
          <div className="transform transition-all duration-300 hover:scale-105">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-105">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-105">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              placeholder="Message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full rounded-md border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 px-4 py-3 transition-all duration-300 focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            ></textarea>
          {siteKey && (
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={siteKey}
            />
          )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-[var(--brand-accent)] text-black font-bold px-8 py-3 hover:opacity-90 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {status.message && (
            <div className={`text-center p-2 rounded-md transition-all duration-300 animate-fade-in ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
