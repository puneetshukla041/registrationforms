'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
      
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

  // High-end spring physics
  const spring = { type: 'spring' as const, stiffness: 400, damping: 30 };
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: spring 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-zinc-200 selection:text-zinc-900 overflow-hidden">
      
      {/* Living Ambient Background */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-slate-200/40 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-zinc-200/40 blur-[120px] pointer-events-none" 
      />

      <div className="relative z-10 w-full flex-grow flex items-center justify-center py-12 px-6 sm:px-12 lg:px-24">
        
        {/* Spatial Card Container */}
        <div className="w-full max-w-[900px] relative">
          
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/70 backdrop-blur-3xl border border-white shadow-[0_20px_80px_-20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] rounded-[2.5rem] p-8 sm:p-14"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col w-full">
                  
                  {/* Header Section */}
                  <motion.div variants={itemVariants} className="flex flex-col mb-12 relative z-20">
                    <div className="flex justify-start mb-10">
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative h-12 w-12 opacity-90 transition-all duration-300 cursor-pointer"
                      >
                        <img src="/tab.png" alt="Logo" className="w-full h-full object-contain drop-shadow-sm" />
                      </motion.div>
                    </div>
                    
                    <h1 className="text-[34px] sm:text-[46px] font-medium text-zinc-900 tracking-tight leading-tight mb-4">
                      Register your interest
                    </h1>
                    <p className="text-zinc-500 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed font-light">
                      Please provide your details below. Our team will contact you shortly to discuss how we can support your practice.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="w-full relative z-10">
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
                      <div className={`absolute inset-0 bg-white rounded-3xl transition-all duration-400 ease-out
                        ${focusedField === 'remark' 
                          ? 'ring-[2.5px] ring-zinc-900 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)]' 
                          : 'border border-zinc-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] group-hover:border-zinc-300 group-hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.06)]'
                        }`} 
                      />
                      <label 
                        className={`absolute left-5 transition-all duration-300 ease-out pointer-events-none font-medium z-10 ${
                          formData.remark || focusedField === 'remark' 
                            ? 'top-4 text-[10px] text-zinc-500 uppercase tracking-widest' 
                            : 'top-6 text-[15px] text-zinc-400'
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
                        className="relative z-10 w-full bg-transparent pt-9 pb-5 px-5 text-[15px] text-zinc-900 transition-colors duration-300 outline-none resize-none overflow-hidden"
                        style={{ minHeight: '130px' }}
                      />
                    </motion.div>

                    {/* Footer Action Area */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="text-red-500 text-sm font-medium">
                            An error occurred. Please try again.
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative px-9 py-4 rounded-full bg-zinc-900 text-white text-[15px] font-medium tracking-wide overflow-hidden transition-shadow duration-500 hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.5)] disabled:opacity-70 disabled:pointer-events-none w-full sm:w-auto min-w-[220px] ml-auto"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <span className="relative flex items-center justify-center gap-3 z-10">
                          <AnimatePresence mode="wait">
                            {status === 'loading' ? (
                              <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </motion.div>
                            ) : (
                              <motion.div key="text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                                Submit Registration
                                <motion.svg 
                                  className="w-4 h-4" 
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </motion.svg>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </span>
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              </motion.div>
            ) : (
              /* Elevated Success Animation State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/70 backdrop-blur-3xl border border-white shadow-[0_20px_80px_-20px_rgba(0,0,0,0.06)] rounded-[2.5rem] p-16 flex flex-col items-center justify-center min-h-[550px] text-center relative overflow-hidden"
              >
                {/* Subtle success pulse background */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.5, opacity: 0.1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute w-[400px] h-[400px] bg-green-500 rounded-full blur-[60px]"
                />

                <div className="relative mb-10 z-10">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.1 }}
                    className="w-28 h-28 rounded-full bg-zinc-900 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                  >
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                  </motion.div>
                </div>
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl sm:text-4xl font-medium text-zinc-900 mb-4 z-10"
                >
                  Registration Successful
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-zinc-500 max-w-sm text-[16px] leading-relaxed z-10"
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

// Ultra-premium Tactile Floating Input
function FloatInput({ 
  label, name, type = 'text', value, onChange, required = false, isFocused, setFocused
}: { 
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; isFocused: boolean; setFocused: (name: string | null) => void;
}) {
  const isActive = isFocused || value.length > 0;
  const isFilled = value.length > 2;

  return (
    <motion.div 
      layout
      className="relative w-full group h-[68px]"
    >
      {/* Input Background & Tactile Border */}
      <div 
        className={`absolute inset-0 rounded-[1.25rem] transition-all duration-400 ease-out pointer-events-none bg-white
          ${isFocused 
            ? 'ring-[2.5px] ring-zinc-900 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)]' 
            : 'border border-zinc-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] group-hover:border-zinc-300 group-hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.06)]'
          }
        `}
      />
      
      <label 
        htmlFor={name}
        className={`absolute left-5 transition-all duration-300 ease-out pointer-events-none font-medium z-10
          ${isActive 
            ? 'top-3 text-[10px] text-zinc-500 uppercase tracking-widest' 
            : 'top-[24px] text-[15px] text-zinc-400'
          }
        `}
      >
        {label} {required && isActive && <span className="text-zinc-300 ml-0.5">*</span>}
      </label>
      
      <input
        id={name} type={type} name={name} required={required} value={value} onChange={onChange}
        onFocus={() => setFocused(name)} onBlur={() => setFocused(null)}
        className="relative z-10 w-full h-full bg-transparent pt-6 pb-2 px-5 text-[15px] text-zinc-900 font-medium transition-colors duration-300 outline-none shadow-none rounded-[1.25rem]"
      />

      {/* Validation Micro-interaction */}
      <AnimatePresence>
        {isFilled && !isFocused && (
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -45 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            exit={{ opacity: 0, scale: 0, rotate: 45 }}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20"
          >
            <div className="bg-green-500/10 p-1 rounded-full">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
