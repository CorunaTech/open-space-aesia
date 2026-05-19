import React from 'react';

export default function RsvpForm() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <form
        className="brutalist-card soldout-form space-y-6 pointer-events-none select-none"
        aria-disabled="true"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="block font-black uppercase text-sm">
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            disabled
            className="w-full border-4 border-black p-3 font-bold bg-white/80 text-black/50"
            placeholder="JANE DOE"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-black uppercase text-sm">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            disabled
            className="w-full border-4 border-black p-3 font-bold bg-white/80 text-black/50"
            placeholder="TU@EMAIL.COM"
          />
        </div>

        <button
          type="button"
          disabled
          className="brutalist-button w-full text-xl py-4 opacity-50"
        >
          Inscripciones cerradas
        </button>

        <p className="text-[10px] uppercase opacity-40 text-center">
          El aforo está completo y el formulario ya no admite nuevas solicitudes.
        </p>
      </form>

      <div className="soldout-stamp" aria-hidden="true">
        <span className="soldout-stamp__title">Sold Out</span>
        <span className="soldout-stamp__note">Aforo completo</span>
      </div>
    </div>
  );
}
