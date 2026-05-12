import React, { useState } from 'react';

const WEBHOOK_URL = 'https://activepieces.gpul.org/api/v1/webhooks/sRVC9EweweIgSTqg4zHUp/sync';

export default function RsvpForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      // Expect: 200 { success: true }
      const data = (await res.json()) as { success?: boolean };
      if (!data?.success) throw new Error('Unsuccessful');

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('No se ha podido enviar. Inténtalo de nuevo en unos segundos.');
    }
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

      {status === 'error' && (
        <p className="text-xs font-bold uppercase text-red-700 text-center">
          {errorMessage ?? 'Error al enviar.'}
        </p>
      )}
      
      <p className="text-[10px] uppercase opacity-50 text-center">
        Al hacer clic, aceptas que tus datos se utilicen únicamente para la gestión de este evento.
      </p>
    </form>
  );
}
