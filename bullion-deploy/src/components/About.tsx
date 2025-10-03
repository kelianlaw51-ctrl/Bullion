export default function About({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="bg-gray-50 dark:bg-neutral-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-accent rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-brand-teal rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-brand-navy rounded-full animate-pulse"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12 items-center relative">
        <div className="animate-fade-in">
          {/* Bouncing about icon */}
          <div className="inline-block mb-4 animate-bounce" style={{ animationDuration: '2s' }}>
            <svg className="w-12 h-12 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-brand-navy dark:text-white">About Bullion Courier</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            We are a dedicated team of logistics professionals committed to providing fast, reliable, and secure delivery services. Our mission is to connect people and businesses with what matters most, offering peace of mind with every parcel we handle.
          </p>
        </div>
        <div className="w-full h-64 bg-neutral-800 rounded-lg animate-slide-up">
          <img src={imageUrl} alt="About Bullion Courier" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    </section>
  );
}
