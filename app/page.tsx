'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    hospital: '',
    specialty: '',
    remark: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStatus('success');
      
      // Reset form after viewing success animation
      setTimeout(() => {
        setStatus('idle');
        setFormData({
          firstName: '', lastName: '', email: '', phoneNumber: '', hospital: '', specialty: '', remark: ''
        });
      }, 5000);
    } catch (error) {
      setStatus('error');
    }
  };

  // Animation variants for smooth, staggered loading
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 300, damping: 24 } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900 overflow-hidden">
      
      {/* Super subtle background depth to make the glass effect pop */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-slate-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-zinc-200/40 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full flex-grow flex items-center justify-center py-12 px-6 sm:px-12 lg:px-24">
        
        {/* Premium Glass Card Container */}
        <div className="w-full max-w-[1000px] relative">
          
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] rounded-[2rem] p-8 sm:p-14"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col w-full">
                  
                  {/* Header Section */}
                  <motion.div variants={itemVariants} className="flex flex-col mb-12">
                    <div className="flex justify-start mb-10">
                      <div className="relative h-12 w-12 opacity-90 hover:opacity-100 transition-opacity duration-300">
                        <img 
                          src="/tab.png" 
                          alt="Logo" 
                          className="w-full h-full object-contain drop-shadow-sm"
                        />
                      </div>
                    </div>
                    
                    <h1 className="text-[32px] sm:text-[44px] font-medium text-zinc-900 tracking-tight leading-tight mb-4">
                      Register your interest
                    </h1>
                    <p className="text-zinc-500 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed font-light">
                      Please provide your details below. Our team will contact you shortly to discuss how we can support your practice.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="w-full">
                    {/* Grid for standard inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                      <motion.div variants={itemVariants}><FloatInput label="First name" name="firstName" value={formData.firstName} onChange={handleChange} required isFocused={focusedField === 'firstName'} setFocused={setFocusedField} /></motion.div>
                      <motion.div variants={itemVariants}><FloatInput label="Last name" name="lastName" value={formData.lastName} onChange={handleChange} required isFocused={focusedField === 'lastName'} setFocused={setFocusedField} /></motion.div>
                      <motion.div variants={itemVariants}><FloatInput label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} required isFocused={focusedField === 'email'} setFocused={setFocusedField} /></motion.div>
                      <motion.div variants={itemVariants}><FloatInput label="Phone number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required isFocused={focusedField === 'phoneNumber'} setFocused={setFocusedField} /></motion.div>
                      
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <motion.div variants={itemVariants}><FloatInput label="Hospital / Institution" name="hospital" value={formData.hospital} onChange={handleChange} required isFocused={focusedField === 'hospital'} setFocused={setFocusedField} /></motion.div>
                        <motion.div variants={itemVariants}><FloatInput label="Specialty (Optional)" name="specialty" value={formData.specialty} onChange={handleChange} isFocused={focusedField === 'specialty'} setFocused={setFocusedField} /></motion.div>
                      </div>
                    </div>

                    {/* Textarea */}
                    <motion.div variants={itemVariants} className="mb-12 relative w-full group">
                      <div className={`absolute inset-0 bg-white/80 rounded-2xl transition-all duration-300 
                        ${focusedField === 'remark' 
                          ? 'ring-2 ring-zinc-900 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]' 
                          : 'border border-zinc-200 shadow-sm group-hover:border-zinc-300'
                        }`} 
                      />
                      <label 
                        className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none font-medium z-10 ${
                          formData.remark || focusedField === 'remark' 
                            ? 'top-3 text-[11px] text-zinc-500 uppercase tracking-wider' 
                            : 'top-5 text-[15px] text-zinc-400'
                        }`}
                      >
                        Additional remarks
                      </label>
                      <textarea
                        name="remark"
                        value={formData.remark}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('remark')}
                        onBlur={() => setFocusedField(null)}
                        className="relative z-0 w-full bg-transparent pt-8 pb-4 px-4 text-[15px] text-zinc-900 transition-colors duration-300 outline-none resize-none overflow-hidden"
                        style={{ minHeight: '120px' }}
                      />
                    </motion.div>

                    {/* Footer Action Area */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-zinc-100/50">
                      {status === 'error' && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-sm font-medium">
                          An error occurred. Please try again.
                        </motion.div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="group relative px-8 py-4 rounded-full bg-zinc-900 text-white text-[15px] font-medium tracking-wide overflow-hidden transition-all duration-500 hover:bg-zinc-800 hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.5)] disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98] w-full sm:w-auto min-w-[200px] ml-auto"
                      >
                        {/* Shimmer sweep effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <span className="relative flex items-center justify-center gap-3 z-10">
                          {status === 'loading' ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Submit Registration
                              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </>
                          )}
                        </span>
                      </button>
                    </motion.div>
                  </form>
                </motion.div>
              </motion.div>
            ) : (
              /* Success Animation State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] rounded-[2rem] p-16 flex flex-col items-center justify-center min-h-[500px] text-center"
              >
                <div className="relative mb-8">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
                  >
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                  </motion.div>
                </div>
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-3xl font-medium text-zinc-900 mb-4"
                >
                  Registration Successful
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-zinc-500 max-w-sm"
                >
                  Thank you for your interest. Our team will review your details and reach out shortly.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Upgraded Premium Floating Input Component
function FloatInput({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  isFocused,
  setFocused
}: { 
  label: string; 
  name: string; 
  type?: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isFocused: boolean;
  setFocused: (name: string | null) => void;
}) {
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative w-full group h-[64px]">
      {/* Input Background & Tactile Border */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none bg-white/80
          ${isFocused 
            ? 'ring-2 ring-zinc-900 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]' 
            : 'border border-zinc-200 shadow-sm group-hover:border-zinc-300'
          }
        `}
      />
      
      <label 
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none font-medium z-10
          ${isActive 
            ? 'top-2.5 text-[11px] text-zinc-500 uppercase tracking-wider' 
            : 'top-[22px] text-[15px] text-zinc-400'
          }
        `}
      >
        {label} {required && isActive && <span className="text-zinc-300 ml-0.5">*</span>}
      </label>
      
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        className="relative z-0 w-full h-full bg-transparent pt-6 pb-2 px-4 text-[15px] text-zinc-900 font-medium transition-colors duration-300 outline-none shadow-none rounded-2xl"
      />
    </div>
  );
}