import { Link } from 'react-router-dom'
import { doctor } from '../../data/mockData'

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Conditions Générales d'Utilisation</h1>
      <p className="text-sm text-slate-400 mb-10">Dernière mise à jour : 17 mars 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Présentation</h2>
          <p>
            Le site <strong>NeuroClinic</strong> est exploité par le cabinet de neurologie du {doctor.name}, situé à {doctor.contact.address}.
            En accédant à ce site et en utilisant nos services, vous acceptez les présentes conditions générales d'utilisation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Services proposés</h2>
          <p>
            Le site permet aux utilisateurs de :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Consulter les informations relatives au cabinet et aux prestations neurologiques proposées</li>
            <li>Prendre rendez-vous en ligne</li>
            <li>Créer un compte patient pour gérer leurs rendez-vous</li>
            <li>Se connecter via un compte Google ou Facebook</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Inscription et compte utilisateur</h2>
          <p>
            Pour prendre rendez-vous, l'utilisateur peut créer un compte en fournissant son nom, prénom, adresse e-mail et numéro de téléphone.
            L'utilisateur est responsable de la confidentialité de ses identifiants de connexion.
            L'inscription via Google ou Facebook est soumise aux conditions d'utilisation respectives de ces plateformes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Prise de rendez-vous</h2>
          <p>
            La prise de rendez-vous en ligne ne constitue pas une consultation médicale. Elle permet uniquement de réserver un créneau horaire.
            Le cabinet se réserve le droit de confirmer, reporter ou annuler un rendez-vous selon les disponibilités.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Protection des données personnelles</h2>
          <p>
            Les données personnelles collectées sont traitées conformément à la législation tunisienne en vigueur relative à la protection des données personnelles (Loi organique n° 2004-63).
            Les données sont utilisées exclusivement pour la gestion des rendez-vous et la communication avec les patients.
            Pour plus d'informations sur la suppression de vos données, consultez notre{' '}
            <Link to="/data-deletion" className="text-indigo-600 hover:underline">Politique de Suppression des Données</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site (textes, images, logo, design) est protégé par le droit de la propriété intellectuelle.
            Toute reproduction ou utilisation sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Responsabilité</h2>
          <p>
            Le cabinet s'efforce de maintenir le site accessible et à jour, mais ne garantit pas l'absence d'erreurs ou d'interruptions.
            Les informations médicales présentes sur le site sont fournies à titre informatif et ne remplacent pas une consultation médicale.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">8. Contact</h2>
          <p>
            Pour toute question relative aux présentes conditions, vous pouvez nous contacter :
          </p>
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
