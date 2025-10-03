export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Bullion Courier. All rights reserved.</p>
      </div>
    </footer>
  );
}
