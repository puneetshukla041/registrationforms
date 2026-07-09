// app/page.tsx
'use client';

import { useState } from 'react';

export default function PhysicianIntakeForm() {
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
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <svg className="w-8 h-8 text-teal-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/>
          </svg>
          SSInnovations
        </div>
        <span className="px-4 py-1 text-xs font-semibold tracking-wider text-slate-500 uppercase border border-slate-200 rounded-full bg-white shadow-sm">
          Physician Intake
        </span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100">
        
        {/* Card Header */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 px-8 py-10 border-b border-slate-100 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-400"></div>
          <span className="text-teal-600 font-semibold tracking-widest text-xs uppercase mb-2 block">
            Get in touch
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Register your interest
          </h1>
          <p className="text-slate-600 max-w-xl text-sm leading-relaxed">
            Share your details and our team will reach out to discuss how SSInnovations can support your practice.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InputGroup label="First name" name="firstName" placeholder="Ananya" required value={formData.firstName} onChange={handleChange} />
            <InputGroup label="Last name" name="lastName" placeholder="Rao" required value={formData.lastName} onChange={handleChange} />
            <InputGroup label="Email" name="email" type="email" placeholder="you@hospital.com" required value={formData.email} onChange={handleChange} />
            <InputGroup label="Phone number" name="phoneNumber" type="tel" placeholder="+91 98765 43210" required value={formData.phoneNumber} onChange={handleChange} />
            <InputGroup label="Hospital" name="hospital" placeholder="Hospital or institution name" required value={formData.hospital} onChange={handleChange} />
            <InputGroup label="Specialty" name="specialty" placeholder="e.g. General Surgery" value={formData.specialty} onChange={handleChange} />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Remark</label>
            <textarea
              name="remark"
              rows={4}
              placeholder="Tell us a little about what you're looking for (optional)"
              value={formData.remark}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 ease-in-out resize-none outline-none text-slate-700 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold text-sm shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit registration'}
            </button>
            <span className="text-xs text-slate-400">Your information is kept confidential.</span>
          </div>

          {status === 'success' && (
            <p className="mt-4 text-sm text-emerald-600 font-medium">Thank you! Your registration has been submitted.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-sm text-red-500 font-medium">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs text-slate-400">
        © 2026 SSInnovations. All rights reserved.
      </div>
    </div>
  );
}

// Reusable Input Component
function InputGroup({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  required = false, 
  value, 
  onChange 
}: { 
  label: string; 
  name: string; 
  type?: string; 
  placeholder: string; 
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-teal-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 ease-in-out outline-none text-slate-700 text-sm"
      />
    </div>
  );
}