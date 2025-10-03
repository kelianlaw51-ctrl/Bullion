import { Metadata } from "next";
import { CheckCircle, Truck, Clock, Shield, MapPin, Phone, Mail, Award, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Bullion Courier",
  description: "Learn about Bullion Courier's mission, services, and commitment to reliable delivery solutions.",
};

export default function AboutPage() {
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
              About <span className="text-[var(--brand-accent)]">Bullion Courier</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Delivering excellence across borders with reliable, secure, and efficient courier services
              that connect businesses and individuals worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                To provide seamless, reliable delivery solutions that bridge distances and connect people.
                We believe in the power of efficient logistics to drive business growth and personal connections
                across the globe.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[var(--brand-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Reliability</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Guaranteed delivery times</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[var(--brand-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Security</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Protected shipments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[var(--brand-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Innovation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Modern tracking systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[var(--brand-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Customer Focus</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Personalized service</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/logo black bg.png"
                alt="Bullion Courier Logo"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive delivery solutions tailored to meet diverse shipping needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-accent)] text-white rounded-full mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Same-Day Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fast, reliable same-day delivery for urgent shipments within city limits.
                Perfect for time-sensitive documents and packages.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-accent)] text-white rounded-full mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Next-Day Service</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Efficient next-day delivery across the country. Ideal for standard
                business shipments and personal packages.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--brand-accent)] text-white rounded-full mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">International Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Global delivery solutions with customs clearance support.
                Connect with international partners seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Bullion Courier?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Secure & Insured</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All shipments are fully insured and tracked with advanced security measures
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Track your packages in real-time with our advanced GPS tracking system
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Professional staff dedicated to providing exceptional customer service
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--brand-primary)] text-white rounded-full mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Award Winning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recognized for excellence in logistics and customer satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We conduct business with honesty and transparency, building trust with every interaction.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We strive for perfection in every delivery, continuously improving our services and processes.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                We embrace technology and new ideas to provide cutting-edge logistics solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of satisfied customers who trust Bullion Courier for their delivery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-3 bg-[var(--brand-primary)] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get a Quote
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold rounded-lg hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
