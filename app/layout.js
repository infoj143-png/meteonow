import './globals.css';
import Link from 'next/link';
import { CloudSun, ShieldAlert, Thermometer, MapPin } from 'lucide-react';
import AdContainer from '../components/AdContainer';

export const metadata = {
  metadataBase: new URL('https://meteonow.fr'),
  title: 'MeteoNow - Météo en Direct & Alertes Canicule en France',
  description: 'Consultez la météo en temps réel et les alertes de fortes chaleurs / canicule pour les principales villes de France (Paris, Marseille, Lyon, Toulouse, Nice, Nantes, Bordeaux). Données temps réel via Open-Meteo.',
  keywords: ['Météo France', 'Alerte Canicule', 'Météo Paris', 'Météo Marseille', 'Météo Lyon', 'Prévisions météo', 'Open-Meteo', 'Forte chaleur', 'MeteoNow'],
  authors: [{ name: 'MeteoNow' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'MeteoNow - Météo en Direct & Alertes Canicule',
    description: 'Suivi météorologique en direct et bulletins d\'alerte canicule pour la France.',
    url: 'https://meteonow.fr',
    siteName: 'MeteoNow',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeteoNow - Météo en Direct & Alertes Canicule',
    description: 'Suivi météorologique en direct et bulletins d\'alerte canicule pour la France.',
  },
};

export default function RootLayout({ children }) {
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Données Météorologiques et Alertes Canicule France - MeteoNow',
    description: 'Données météorologiques en temps réel et prévisions à 7 jours pour les villes de Paris, Marseille, Lyon, Toulouse, Nice, Nantes et Bordeaux.',
    url: 'https://meteonow.fr',
    sameAs: 'https://open-meteo.com',
    keywords: ['Météo', 'Canicule', 'France', 'Température', 'Prévisions Météo'],
    creator: {
      '@type': 'Organization',
      name: 'MeteoNow',
      url: 'https://meteonow.fr',
      logo: 'https://meteonow.fr/icon.png',
    },
    spatialCoverage: 'France',
    temporalCoverage: '2025/2026',
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MeteoNow',
    url: 'https://meteonow.fr',
    description: 'Service officiel de suivi météorologique en direct et alertes canicule en France.',
    knowsAbout: ['Météorologie', 'Alerte Canicule', 'Prévisions météo France', 'Climatologie'],
  };

  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
              <CloudSun className="w-8 h-8 text-orange-500 animate-pulse" />
              <span className="tracking-tight text-white">
                Meteo<span className="text-orange-500">Now</span>
              </span>
            </Link>

            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                Villes
              </Link>
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-white transition-colors hidden sm:inline"
              >
                Confidentialité
              </Link>
              <Link
                href="/mentions-legales"
                className="text-slate-400 hover:text-white transition-colors hidden sm:inline"
              >
                Mentions Légales
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <AdContainer type="social" />

        {/* Monetag Ad Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11746625',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11746634',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />

        <footer className="border-t border-slate-800 bg-slate-900 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-orange-500" />
              <p>© {new Date().getFullYear()} MeteoNow — Service météo et alerte canicule en France. Données Open-Meteo.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-slate-200 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/mentions-legales" className="hover:text-slate-200 transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
