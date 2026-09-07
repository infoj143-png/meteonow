import WeatherDashboard from '../components/WeatherDashboard';
import AdContainer from '../components/AdContainer';
import { HelpCircle, Sparkles, AlertCircle, SunMedium } from 'lucide-react';

export default function Home() {
  const faqList = [
    {
      q: 'Comment MeteoNow détecte-t-il les alertes canicule en France ?',
      a: 'MeteoNow surveille en continu les températures mesurées en temps réel via les stations météorologiques françaises de l\'API Open-Meteo. Dès que la température atteint ou dépasse 30°C dans une ville partenaire (Paris, Marseille, Lyon, Toulouse, Nice, Nantes, Bordeaux), un badge animé d\'Alerte Canicule est déclenché avec les recommandations de sécurité sanitaire.',
    },
    {
      q: 'D\'où proviennent les données météorologiques de MeteoNow ?',
      a: 'Toutes nos données météorologiques sont alimentées par l\'API Open-Meteo, fournissant gratuitement des prévisions haute précision basées sur les modèles numériques de Météo-France (AROME, ARPEGE) et les centres météorologiques européens.',
    },
    {
      q: 'Quels sont les bons réflexes lors d\'une forte chaleur ou d\'un pépinière de canicule ?',
      a: 'En période de forte chaleur, il est recommandé d\'hydrater son corps régulièrement (eau potable sans attendre la soif), d\'éviter les sorties et activités physiques entre 11h et 18h, de garder l\'habitat frais en fermant les volets le jour, et de prendre des nouvelles des proches vulnérables.',
    },
    {
      q: 'Quelles sont les villes françaises couvertes par MeteoNow ?',
      a: 'MeteoNow propose un suivi direct et des prévisions à 7 jours pour les 7 métropoles françaises principales : Paris, Marseille, Lyon, Toulouse, Nice, Nantes et Bordeaux.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="space-y-12 my-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Banner Ad Container */}
      <section className="my-6">
        <AdContainer type="native" slot="header-banner" label="Publicité Météo" />
      </section>

      {/* Weather Dashboard Component */}
      <section className="my-8">
        <WeatherDashboard />
      </section>

      {/* Middle Banner Ad Container */}
      <section className="my-10">
        <AdContainer type="native" slot="inline-content" label="Partenaire Météo" />
      </section>

      {/* AI Search Optimization & FAQ Section */}
      <section className="my-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Foire Aux Questions & Informations Météorologiques (FAQ)
            </h2>
            <p className="text-xs text-slate-400">
              Informations certifiées adaptées aux requêtes des moteurs de recherche et agents IA.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqList.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
            >
              <h3 className="text-base font-bold text-white flex items-start gap-2">
                <span className="text-orange-500 font-extrabold">Q.</span>
                {item.q}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed pl-5">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
