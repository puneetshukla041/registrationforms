// app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

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
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setFormData({
        firstName: '', lastName: '', email: '', phoneNumber: '', hospital: '', specialty: '', remark: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-slate-200 selection:text-slate-900">
      
      <div className="w-full flex-grow flex items-center justify-center py-12 px-6 sm:px-12 lg:px-24">
        
        {/* Main Form Container - Full Width, Pure White */}
        <div className="w-full max-w-[1200px] animate-in fade-in duration-700 ease-out">
          
          {/* Header Section */}
          <div className="flex flex-col mb-16">
            {/* Logo */}
            <div className="flex justify-start mb-12">
              <div className="relative h-12 w-12 opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <Image 
                  src="/tab.png" 
                  alt="Logo" 
                  fill
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-[32px] sm:text-[44px] font-semibold text-slate-900 tracking-tight leading-tight mb-4 max-w-2xl">
              Register your interest
            </h1>
            <p className="text-slate-500 text-[15px] sm:text-[17px] max-w-2xl leading-relaxed font-light">
              Please provide your details below. Our team will contact you shortly to discuss how we can support your practice.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            
            {/* Grid for standard inputs - Horizontal Layout Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 mb-16">
              <FloatInput 
                label="First name" name="firstName" value={formData.firstName} 
                onChange={handleChange} required 
                isFocused={focusedField === 'firstName'} setFocused={setFocusedField} 
              />
              <FloatInput 
                label="Last name" name="lastName" value={formData.lastName} 
                onChange={handleChange} required 
                isFocused={focusedField === 'lastName'} setFocused={setFocusedField} 
              />
              <FloatInput 
                label="Email address" name="email" type="email" value={formData.email} 
                onChange={handleChange} required 
                isFocused={focusedField === 'email'} setFocused={setFocusedField} 
              />
              <FloatInput 
                label="Phone number" name="phoneNumber" type="tel" value={formData.phoneNumber} 
                onChange={handleChange} required 
                isFocused={focusedField === 'phoneNumber'} setFocused={setFocusedField} 
              />
              <FloatInput 
                label="Hospital / Institution" name="hospital" value={formData.hospital} 
                onChange={handleChange} required 
                isFocused={focusedField === 'hospital'} setFocused={setFocusedField} 
              />
              <FloatInput 
                label="Specialty (Optional)" name="specialty" value={formData.specialty} 
                onChange={handleChange} 
                isFocused={focusedField === 'specialty'} setFocused={setFocusedField} 
              />
            </div>

            {/* Textarea - Full width below the grid */}
            <div className="mb-16 relative max-w-3xl">
              <label 
                className={`absolute left-0 transition-all duration-200 ease-out pointer-events-none text-slate-500 font-light ${
                  formData.remark || focusedField === 'remark' 
                    ? '-top-6 text-[13px]' 
                    : 'top-3 text-[15px]'
                }`}
              >
                Additional remarks or requirements
              </label>
              <textarea
                name="remark"
                rows={1}
                value={formData.remark}
                onChange={handleChange}
                onFocus={() => setFocusedField('remark')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-slate-200 py-3 text-[15px] text-slate-900 focus:border-slate-800 transition-colors duration-300 outline-none resize-none overflow-hidden"
                style={{ minHeight: '44px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <div className={`absolute bottom-0 left-0 h-[1px] bg-slate-800 transition-all duration-300 ease-out ${focusedField === 'remark' ? 'w-full' : 'w-0'}`}></div>
            </div>

            {/* Footer Action Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-8 pt-8 border-t border-slate-100">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative px-10 py-4 rounded-full bg-slate-900 text-white text-[15px] font-medium tracking-wide overflow-hidden transition-all duration-300 hover:bg-slate-800 hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98] w-full sm:w-auto min-w-[200px] cursor-pointer"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <span className="relative flex items-center justify-center gap-3">
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </span>
              </button>
            </div>

            {/* Status Messages */}
            <div className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out ${status === 'success' || status === 'error' ? 'max-h-24 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 text-[14px]">
                  <div className="h-2 w-2 rounded-full bg-slate-900"></div>
                  Registration received successfully. We will be in touch shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50/50 border border-red-100 text-red-600 text-[14px]">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  An error occurred. Please try submitting again.
                </div>
              )}
            </div>
            
          </form>
        </div>
      </div>
      
      {/* Minimal Footer */}
      <div className="w-full py-8 px-6 sm:px-12 lg:px-24 text-[13px] text-slate-400 tracking-wide font-light animate-in fade-in duration-1000 delay-500 flex justify-center border-t border-slate-50">
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </div>
  );
}

// Minimalist Floating Label Input Component
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
    <div className="relative group w-full">
      <label 
        htmlFor={name}
        className={`absolute left-0 transition-all duration-200 ease-out pointer-events-none font-light ${
          isActive 
            ? '-top-6 text-[12px] text-slate-500 tracking-wide' 
            : 'top-2.5 text-[15px] text-slate-400'
        }`}
      >
        {label} {required && isActive && <span className="text-slate-300 ml-0.5">*</span>}
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
        className="w-full bg-transparent border-b border-slate-200 py-2.5 text-[15px] text-slate-900 transition-colors duration-300 outline-none focus:border-slate-800 shadow-none rounded-none"
      />
      {/* Animated bottom border on focus */}
      <div className={`absolute bottom-0 left-0 h-[1px] bg-slate-800 transition-all duration-300 ease-out ${isFocused ? 'w-full' : 'w-0'}`}></div>
    </div>
  );
}