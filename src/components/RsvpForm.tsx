import React, { useState } from 'react';

export default function RsvpForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1000);
  };

  if (status === 'success') {
    return (
      <div className="brutalist-card bg-black text-white text-center py-12 animate-in fade-in zoom-in duration-300">
        <h3 className="text-3xl mb-4">¡ESTÁS DENTRO!</h3>
        <p className="uppercase font-bold">Te hemos enviado un correo de confirmación.</p>
        <p className="text-xs mt-8 opacity-70">NOS VEMOS EL 19 DE MAYO</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="brutalist-card space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="name" className="block font-black uppercase text-sm">Nombre Completo</label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-100 font-bold transition-colors"
          placeholder="JANE DOE"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block font-black uppercase text-sm">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-100 font-bold transition-colors"
          placeholder="TU@EMAIL.COM"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="brutalist-button w-full text-xl py-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'PROCESANDO...' : 'CONFIRMAR ASISTENCIA'}
      </button>
      
      <p className="text-[10px] uppercase opacity-50 text-center">
        Al hacer clic, aceptas que tus datos se utilicen únicamente para la gestión de este evento.
      </p>
    </form>
  );
}
