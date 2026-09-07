'use client';

export default function AdContainer({ slot = 'banner', label = 'Publicité partenaire' }) {
  return (
    <div className="my-6 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center relative overflow-hidden group">
        <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest mb-2 px-1">
          <span>Espace Sponsorisé</span>
          <span>{label}</span>
        </div>

        {/* Ad Placeholder Content */}
        <div className="min-h-[90px] sm:min-h-[120px] rounded-xl bg-slate-950/80 border border-dashed border-slate-800 flex flex-col items-center justify-center p-4 transition-colors group-hover:border-slate-700">
          <span className="text-xs font-semibold text-slate-400 mb-1">
            MeteoNow Native Ads — {slot.toUpperCase()}
          </span>
          <p className="text-[11px] text-slate-400 max-w-md">
            Emplacement réservé aux campagnes d&apos;informations météo, équipements solaires et partenaires.
          </p>
        </div>
      </div>
    </div>
  );
}
