import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Heart, DollarSign, Apple, MessageCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { toast, Toaster } from 'sonner';
import { supabase, PatientSupportRequest } from '../lib/supabase';

const steps = [
  { id: 1, title: 'Personal Details', description: 'Tell us about yourself' },
  { id: 2, title: 'Medical Context', description: 'What support do you need?' },
  { id: 3, title: 'Priority Level', description: 'Help us prioritize' },
];

const supportTypes = [
  { value: 'Financial', icon: DollarSign, color: 'from-green-500 to-emerald-600', description: 'Medical expenses, treatment costs' },
  { value: 'Nutritional', icon: Apple, color: 'from-orange-500 to-orange-600', description: 'Diet plans, supplements' },
  { value: 'Emotional', icon: MessageCircle, color: 'from-purple-500 to-purple-600', description: 'Counseling, support groups' },
];

export default function SupportForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<PatientSupportRequest>>({
    full_name: '',
    age: 0,
    location: '',
    support_type: undefined,
    priority_level: 5,
  });

  const updateFormData = (field: keyof PatientSupportRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.full_name || !formData.age || !formData.location) {
          toast.error('Please fill in all personal details');
          return false;
        }
        if (formData.age < 1 || formData.age > 120) {
          toast.error('Please enter a valid age');
          return false;
        }
        return true;
      case 2:
        if (!formData.support_type) {
          toast.error('Please select a support type');
          return false;
        }
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('patient_support_requests')
        .insert([formData as PatientSupportRequest]);

      if (error) throw error;

      setShowConfetti(true);
      toast.success('Request submitted successfully! Our team will contact you soon.', {
        duration: 5000,
      });

      setTimeout(() => {
        setShowConfetti(false);
        setCurrentStep(1);
        setFormData({
          full_name: '',
          age: 0,
          location: '',
          support_type: undefined,
          priority_level: 5,
        });
      }, 5000);
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="support" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-50/50">
      <Toaster position="top-center" richColors />
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Request Support</h2>
          <p className="text-xl text-gray-600">We're here to help you through your journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-white/40 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-12">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: currentStep === step.id ? 1.1 : 1,
                        backgroundColor: currentStep >= step.id ? '#0D9488' : '#E5E7EB',
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2 relative"
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <span className={`font-bold ${currentStep >= step.id ? 'text-white' : 'text-gray-600'}`}>
                          {step.id}
                        </span>
                      )}
                    </motion.div>
                    <div className="text-center hidden sm:block">
                      <div className={`text-sm font-semibold ${currentStep >= step.id ? 'text-teal-600' : 'text-gray-600'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <motion.div
                      animate={{
                        backgroundColor: currentStep > step.id ? '#0D9488' : '#E5E7EB',
                      }}
                      className="flex-1 h-1 mx-4"
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => updateFormData('full_name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white/50 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age || ''}
                        onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white/50 backdrop-blur-sm"
                        placeholder="Your age"
                        min="1"
                        max="120"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white/50 backdrop-blur-sm"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Select Support Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {supportTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.support_type === type.value;
                      return (
                        <motion.button
                          key={type.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateFormData('support_type', type.value as any)}
                          className={`relative p-6 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 shadow-lg'
                              : 'border-gray-200 bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="selected"
                              className="absolute top-3 right-3 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-800 mb-2">{type.value}</div>
                            <div className="text-xs text-gray-600">{type.description}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Priority Level: <span className="text-2xl text-teal-600 font-bold">{formData.priority_level}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.priority_level}
                        onChange={(e) => updateFormData('priority_level', parseInt(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-300 rounded-full appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #86efac 0%, #fde047 50%, #fca5a5 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>Low Priority</span>
                        <span>High Priority</span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
                      <p className="text-sm text-gray-700">
                        {formData.priority_level <= 3 && '📊 Standard processing time: 5-7 days'}
                        {formData.priority_level > 3 && formData.priority_level <= 7 && '⚡ Expedited processing: 2-3 days'}
                        {formData.priority_level > 7 && '🚨 Urgent - We will prioritize your request within 24 hours'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-teal-600" />
                      Request Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-semibold text-gray-800">{formData.full_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-semibold text-gray-800">{formData.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold text-gray-800">{formData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Support Type:</span>
                        <span className="font-semibold text-gray-800">{formData.support_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className="font-semibold text-gray-800">{formData.priority_level}/10</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </motion.button>

              {currentStep < steps.length ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Heart className="w-5 h-5" fill="white" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
