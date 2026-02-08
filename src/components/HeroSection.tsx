import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, Heart, TrendingUp } from 'lucide-react';
import { supabase, ImpactStats } from '../lib/supabase';

export default function HeroSection() {
  const [impactStats, setImpactStats] = useState<ImpactStats>({
    patients_supported: 0,
    active_volunteers: 0,
  });
  const [displayStats, setDisplayStats] = useState({
    patients: 0,
    volunteers: 0,
  });

  useEffect(() => {
    fetchImpactStats();
  }, []);

  useEffect(() => {
    const patientsInterval = setInterval(() => {
      setDisplayStats((prev) => {
        if (prev.patients < impactStats.patients_supported) {
          return { ...prev, patients: prev.patients + 1 };
        }
        return prev;
      });
    }, 3);

    const volunteersInterval = setInterval(() => {
      setDisplayStats((prev) => {
        if (prev.volunteers < impactStats.active_volunteers) {
          return { ...prev, volunteers: prev.volunteers + 1 };
        }
        return prev;
      });
    }, 10);

    return () => {
      clearInterval(patientsInterval);
      clearInterval(volunteersInterval);
    };
  }, [impactStats]);

  async function fetchImpactStats() {
    const { data } = await supabase
      .from('impact_stats')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      setImpactStats(data);
    }
  }

  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/30 to-orange-50/20 -z-10" />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 bg-clip-text text-transparent">
                Compassion Meets
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Innovation
              </span>
              <br />
              <span className="text-gray-800">in Cancer Care</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Providing a lifeline for gallbladder and biliary tract cancer patients across India
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 shadow-2xl border border-white/40 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-8 h-8 text-teal-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Live Impact Tracker</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="w-12 h-12 text-white/80" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {displayStats.patients.toLocaleString()}
              </div>
              <div className="text-teal-100 font-medium text-lg">Patients Supported</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-full bg-white/60 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-12 h-12 text-white/80" fill="white" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {displayStats.volunteers.toLocaleString()}
              </div>
              <div className="text-orange-100 font-medium text-lg">Active Volunteers</div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 0.7 }}
                  className="h-full bg-white/60 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
