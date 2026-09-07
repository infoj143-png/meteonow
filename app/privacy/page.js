import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité — MeteoNow',
  description: 'Politique de confidentialité et protection des données personnelles sur MeteoNow.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Politique de Confidentialité
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Dernière mise à jour : Mars 2025
            </p>
          </div>
        </div>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-400" />
              1. Collecte des Données Personnelles
            </h2>
            <p>
              MeteoNow respecte la vie privée de ses utilisateurs. Notre service de consultation météorologique fonctionne sans aucune obligation de création de compte ni de fourniture d&apos;informations nominatives (nom, prénom, adresse e-mail ou téléphone).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-400" />
              2. Traitement des requêtes Météo & API
            </h2>
            <p>
              Lorsque vous consultez la météo pour une ville (Paris, Marseille, Lyon, Toulouse, Nice, Nantes, Bordeaux), la requête est directement transmise de manière anonyme à l&apos;API ouverte Open-Meteo. Aucune coordonnée géographique personnelle n&apos;est stockée sur nos serveurs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              3. Cookies et Publicités
            </h2>
            <p>
              MeteoNow peut intégrer des espaces publicitaires partenaires via le composant Native AdContainer. Des cookies de mesure d&apos;audience anonymes ou publicitaires peuvent être déposés conformément au RGPD pour assurer l&apos;affichage de publicités non intrusives.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              4. Vos Droits
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant. Pour toute question, contactez notre équipe à : <span className="text-orange-400 font-mono">contact@meteonow.fr</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
