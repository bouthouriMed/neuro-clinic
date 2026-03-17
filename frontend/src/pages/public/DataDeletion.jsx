import { doctor } from '../../data/mockData'

export default function DataDeletion() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Politique de Suppression des Données</h1>
      <p className="text-sm text-slate-400 mb-10">Dernière mise à jour : 17 mars 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Introduction</h2>
          <p>
            Chez <strong>NeuroClinic</strong>, nous respectons votre droit à la vie privée et à la protection de vos données personnelles.
            Cette politique décrit comment vous pouvez demander la suppression de vos données personnelles de notre système,
            conformément à la législation tunisienne en vigueur (Loi organique n° 2004-63) et aux exigences des plateformes tierces (Facebook, Google).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Données collectées</h2>
          <p>Lorsque vous utilisez notre site, nous pouvons collecter les données suivantes :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Historique des rendez-vous</li>
            <li>Identifiant de connexion sociale (Google ou Facebook), le cas échéant</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Comment demander la suppression de vos données</h2>
          <p>
            Vous pouvez demander la suppression complète de vos données personnelles en nous contactant par l'un des moyens suivants :
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-4 space-y-3">
            <h3 className="font-semibold text-slate-900">Option 1 : Par e-mail</h3>
            <p>
              Envoyez un e-mail à <a href={`mailto:${doctor.contact.email}`} className="text-indigo-600 hover:underline font-medium">{doctor.contact.email}</a> avec
              l'objet <strong>"Demande de suppression de données"</strong> en précisant :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Votre nom complet</li>
              <li>L'adresse e-mail associée à votre compte</li>
              <li>La raison de votre demande (facultatif)</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-4 space-y-3">
            <h3 className="font-semibold text-slate-900">Option 2 : Par téléphone</h3>
            <p>
              Appelez-nous au <strong>{doctor.contact.phone}</strong> pendant les heures d'ouverture ({doctor.contact.hours}).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Traitement de votre demande</h2>
          <p>
            Une fois votre demande reçue, nous nous engageons à :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Vérifier votre identité pour protéger vos données</li>
            <li>Supprimer toutes vos données personnelles dans un délai de <strong>30 jours</strong></li>
            <li>Vous envoyer une confirmation de suppression par e-mail</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Données supprimées</h2>
          <p>La suppression inclut :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Votre compte utilisateur et toutes les informations associées</li>
            <li>Votre historique de rendez-vous</li>
            <li>Toute connexion avec des services tiers (Google, Facebook)</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500">
            Note : Certaines données peuvent être conservées si la loi l'exige (par exemple, les dossiers médicaux selon la réglementation en vigueur).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Utilisateurs connectés via Facebook</h2>
          <p>
            Si vous vous êtes connecté via Facebook, vous pouvez également supprimer l'accès de notre application depuis les paramètres de votre compte Facebook :
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Accédez à <strong>Paramètres Facebook</strong> &gt; <strong>Applications et sites web</strong></li>
            <li>Trouvez <strong>NeuroClinic</strong> dans la liste</li>
            <li>Cliquez sur <strong>Supprimer</strong></li>
          </ol>
          <p className="mt-2">
            Cette action révoquera l'accès de notre application à votre compte Facebook. Pour supprimer également vos données de notre base de données,
            veuillez suivre la procédure décrite dans la section 3.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Contact</h2>
          <p>Pour toute question concernant cette politique :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Email : <a href={`mailto:${doctor.contact.email}`} className="text-indigo-600 hover:underline">{doctor.contact.email}</a></li>
            <li>Téléphone : {doctor.contact.phone}</li>
            <li>Adresse : {doctor.contact.address}</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
