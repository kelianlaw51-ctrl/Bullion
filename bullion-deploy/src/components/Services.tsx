import { Package, Zap, Globe } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Same-Day Delivery',
    description: 'Urgent delivery within the city. Fast, reliable, and on time.',
  },
  {
    icon: Package,
    title: 'Next-Day Delivery',
    description: 'Nationwide delivery for your important packages. We handle with care.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    description: 'Global reach with competitive pricing. Ship anywhere in the world.',
  },
];

export default function Services({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-900">
      {/* Faint background image for Services */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy dark:text-white">Our Services</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Solutions for every shipping need.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="w-full h-64 bg-neutral-800 rounded-lg">
            <img src={imageUrl} alt="Our Services" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="inline-block p-3 bg-brand-teal text-white rounded-full">
                  <service.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-navy dark:text-white">{service.title}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
