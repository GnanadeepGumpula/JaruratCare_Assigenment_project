import { motion } from 'framer-motion';
import { DollarSign, Apple, MessageCircle, Phone, Users, BookOpen } from 'lucide-react';

const services = [
  {
    icon: DollarSign,
    title: 'Financial Support',
    description: 'Assistance with medical expenses, treatment costs, and medication',
    color: 'from-green-500 to-emerald-600',
    features: ['Treatment funding', 'Medication support', 'Travel assistance'],
  },
  {
    icon: Apple,
    title: 'Nutritional Guidance',
    description: 'Personalized diet plans and nutritional supplements',
    color: 'from-orange-500 to-orange-600',
    features: ['Custom diet plans', 'Nutritional supplements', 'Expert guidance'],
  },
  {
    icon: MessageCircle,
    title: 'Emotional Support',
    description: 'One-on-one counseling and support group sessions',
    color: 'from-purple-500 to-purple-600',
    features: ['Individual counseling', 'Support groups', '24/7 helpline'],
  },
  {
    icon: Phone,
    title: '24/7 Helpline',
    description: 'Round-the-clock support for urgent queries and assistance',
    color: 'from-blue-500 to-blue-600',
    features: ['Emergency support', 'Medical queries', 'Crisis intervention'],
  },
  {
    icon: Users,
    title: 'Caregiver Support',
    description: 'Resources and guidance for family members and caregivers',
    color: 'from-pink-500 to-pink-600',
    features: ['Training programs', 'Support networks', 'Respite care'],
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Comprehensive information about cancer care and treatment',
    color: 'from-indigo-500 to-indigo-600',
    features: ['Treatment guides', 'Webinars', 'Resource library'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support for every aspect of your cancer care journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 shadow-lg border border-white/40 hover:shadow-2xl transition-all group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + idx * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-teal-600 group-hover:text-white"
                >
                  Learn More
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
