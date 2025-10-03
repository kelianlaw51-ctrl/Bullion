"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: `Phone: ${formData.phone}\n\n${formData.message}`,
          recaptchaToken: 'demo-token' // In production, integrate with reCAPTCHA
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message || 'Message sent successfully!' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Faint background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url('/background-optimized.jpg')" }}
      />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Contact <span className="text-[var(--brand-accent)]">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Ready to ship? We're here to help. Get in touch with our expert team for all your courier needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Our dedicated team is ready to assist you with all your shipping needs.
                  Choose the most convenient way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Phone Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">+49 - 69 - 7985 36 10</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available 24/7 for urgent shipments</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@bullion.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Response within 2 hours during business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Ludwig Landmann Str. 371 / Rossittener Str. 21-23<br />
                      60487 Frankfurt Bockenheim<br />
                      Germany
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                    <div className="text-gray-600 dark:text-gray-300 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                      <p className="text-sm text-[var(--brand-accent)] font-medium">Emergency services available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="+49 - 69 - 7985 36 10"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Get a Quote</option>
                    <option value="tracking">Track a Package</option>
                    <option value="complaint">File a Complaint</option>
                    <option value="business">Business Inquiry</option>
                    <option value="support">General Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--brand-accent)] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {submitMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 py-3 bg-[var(--brand-primary)] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors gap-2 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How quickly can you pick up my package?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Same-day pickup is available within 2 hours for urgent shipments in metro areas.
                Next-day service is available for standard deliveries.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! We provide international shipping to over 200 countries with full customs support
                and tracking throughout the journey.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What items are prohibited for shipping?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We cannot ship hazardous materials, illegal substances, weapons, or perishable items
                requiring special handling. Contact us for specific restrictions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How do I track my package?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our online tracking system with your tracking number, or call our 24/7 support line
                for real-time updates on your shipment status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Visit our headquarters or one of our many service locations
            </p>
          </div>

          <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.473658432123!2d8.637689!3d50.118761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0965f7b9e8b9%3A0x423a5e1f7b5e8c4a!2sLudwig%20Landmann%20Str.%20371%2C%2060487%20Frankfurt%20am%20Main%2C%20Germany!5e0!3m2!1sen!2sus!4v1701234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bullion Courier Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
