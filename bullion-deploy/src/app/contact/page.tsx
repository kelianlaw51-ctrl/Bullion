import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us - Bullion Courier",
  description: "Get in touch with Bullion Courier for all your shipping and delivery needs.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
