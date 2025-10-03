import { Metadata } from "next";
import { Shield, Eye, Database, Cookie, Mail, Phone, MapPin, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Bullion Courier",
  description: "Learn how Bullion Courier protects and handles your personal information and data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Faint background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url('/background-optimized.jpg')" }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-[var(--brand-accent)] mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Our Commitment to Your Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  At Bullion Courier, we are committed to protecting your privacy and ensuring the security of your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Database className="h-8 w-8 text-[var(--brand-primary)]" />
            Information We Collect
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you use our services, we may collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Name, email address, and phone number</li>
                <li>Delivery and pickup addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Government-issued identification for certain shipments</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Shipment Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For delivery services, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Sender and recipient contact details</li>
                <li>Package contents description (for customs and insurance)</li>
                <li>Package weight, dimensions, and value</li>
                <li>Special handling requirements</li>
                <li>Delivery instructions and preferences</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technical Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We automatically collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website information</li>
                <li>Cookies and tracking technologies data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Eye className="h-8 w-8 text-[var(--brand-primary)]" />
            How We Use Your Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Service Provision</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Process and fulfill delivery requests</li>
                <li>• Communicate about shipment status</li>
                <li>• Provide customer support</li>
                <li>• Handle billing and payments</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Improvement</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Analyze website usage patterns</li>
                <li>• Improve our services and features</li>
                <li>• Develop new products and services</li>
                <li>• Ensure website security</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Legal Compliance</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Comply with legal obligations</li>
                <li>• Protect against fraud and abuse</li>
                <li>• Enforce our terms of service</li>
                <li>• Respond to legal requests</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Communication</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Send service updates and notifications</li>
                <li>• Provide promotional offers (with consent)</li>
                <li>• Respond to inquiries and feedback</li>
                <li>• Send important service announcements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Information Sharing and Disclosure</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Service Providers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may share information with trusted third-party service providers who assist us in operating our website,
                conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Business Transfers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information
                may be transferred as part of that transaction.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Legal Requirements</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may disclose your information if required by law, court order, or government regulation, or if we believe
                disclosure is necessary to protect our rights or the safety of others.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800 dark:text-blue-300 font-semibold">
                We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes
                without your explicit consent.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Cookie className="h-8 w-8 text-[var(--brand-primary)]" />
            Cookies and Tracking Technologies
          </h2>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our website:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Required for basic website functionality, user authentication, and security.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Help us understand how visitors interact with our website to improve user experience.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Preference Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Remember your settings and preferences for future visits.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Used to deliver relevant advertisements and track campaign performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Data Security</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <Shield className="h-12 w-12 text-[var(--brand-accent)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All data transmission is encrypted using SSL/TLS protocols
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <Database className="h-12 w-12 text-[var(--brand-accent)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Data is stored in secure, access-controlled environments
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
              <Eye className="h-12 w-12 text-[var(--brand-accent)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Access Control</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Strict access controls and regular security audits
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Rights and Choices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can request information about the personal data we hold about you.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Correction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can request correction of inaccurate or incomplete personal data.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Deletion</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can request deletion of your personal data, subject to legal requirements.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Portability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can request a copy of your data in a structured, machine-readable format.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mt-6">
            <p className="text-blue-800 dark:text-blue-300">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[var(--brand-accent)]" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-300">support@bullion.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-[var(--brand-accent)]" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Phone</p>
                  <p className="text-gray-600 dark:text-gray-300">+49 - 69 - 7985 36 10</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[var(--brand-accent)]" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Address</p>
                  <p className="text-gray-600 dark:text-gray-300">Ludwig Landmann Str. 371 / Rossittener Str. 21-23<br />60487 Frankfurt Bockenheim<br />Germany</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Updates to Policy */}
        <section className="mb-12">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              Updates to This Privacy Policy
            </h3>
            <p className="text-yellow-700 dark:text-yellow-400">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
