import { Scale, Building, Globe, Server } from 'lucide-react';

export const metadata = {
  title: 'Mentions Légales — MeteoNow',
  description: 'Mentions légales, éditeur et hébergeur du site MeteoNow.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Mentions Légales
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Conformément à l&apos;article 6 de la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-400" />
              1. Éditeur du Site
            </h2>
            <p>
              Le site <strong>MeteoNow</strong> (<span className="text-orange-400 font-mono">https://meteonow.fr</span>) est édité et géré par le service indépendant MeteoNow France.
            </p>
            <p>
              Directeur de la publication : Équipe de rédaction MeteoNow France.
            </p>
            <p>
              Contact E-mail : <span className="text-orange-400 font-mono">contact@meteonow.fr</span>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-orange-400" />
              2. Hébergement du Site
            </h2>
            <p>
              Le site MeteoNow est hébergé par :
            </p>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-mono text-xs space-y-1 text-slate-300">
              <p>Vercel Inc.</p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              <p>Site Web : https://vercel.com</p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-400" />
              3. Source des Données Météo
            </h2>
            <p>
              Les prévisions et données climatiques présentées sur MeteoNow proviennent de l&apos;API ouverte <strong>Open-Meteo</strong>. Ces données réutilisent les prévisions scientifiques publiques fournies par Météo-France et le CEPMMT (ECMWF) sous licence libre CC-BY 4.0.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              4. Propriété Intellectuelle
            </h2>
            <p>
              L&apos;ensemble de la structure, de la mise en page, des visuels et de la charte graphique de MeteoNow est protégé par le droit d&apos;auteur. Toute reproduction ou représentation non autorisée constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
