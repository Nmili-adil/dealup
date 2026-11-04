import type { LegalContent } from "./types";

export const legalFR: LegalContent = {
  privacy: {
    hero: {
      title: 'Politique de Confidentialité',
      summary: 'Comment Dealup collecte, utilise et protège vos données personnelles conformément à la réglementation applicable en matière de protection des données.',
      lastUpdated: 'Dernière mise à jour : 27 août 2024',
    },
    sections: [
      {
        title: '1. Introduction',
        blocks: [
        { kind: "p", text: 'Dealup S.A.R.L. (« Dealup », « nous », « notre ») s\'engage à protéger votre vie privée et vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web (dealup.ma), utilisez notre plateforme ou interagissez avec nos services.' },
        { kind: "p", text: 'Cette politique est rédigée conformément au cadre juridique applicable en matière de protection des données, ainsi qu\'aux directives des autorités de contrôle compétentes.' },
        { kind: "p", text: 'En utilisant notre site web ou nos services, vous reconnaissez avoir lu et compris cette Politique de Confidentialité. Si vous n\'acceptez pas les termes de cette politique, veuillez cesser immédiatement l\'utilisation de notre site web et de nos services.' },
        ],
      },
      {
        title: '2. Informations que Nous Collectons',
        blocks: [
        { kind: "p", text: 'Nous collectons les informations que vous nous fournissez directement, les informations générées par votre utilisation de nos services et les informations provenant de sources tiers.' },
        { kind: "h2", text: 'Informations que Vous Fournissez' },
        { kind: "list", items: [
              'Nom complet, adresse e-mail, numéro de téléphone et nom de l\'entreprise',
              'Titre, rôle et informations sur l\'entreprise',
              'Identifiants de compte (nom d\'utilisateur, mot de passe)',
              'Informations de facturation et de paiement (traitées en toute sécurité via nos prestataires)',
              'Contenu que vous téléchargez ou transmettez via notre plateforme (messages, médias, listes de contacts)',
              'Communications que vous nous envoyez (demandes d\'assistance, commentaires, réponses aux enquêtes)',
            ] },
        { kind: "h2", text: 'Informations Collectées Automatiquement' },
        { kind: "list", items: [
              'Adresse IP, type et version du navigateur, système d\'exploitation',
              'Informations sur l\'appareil (type, modèle, résolution d\'écran, paramètres de langue)',
              'Données d\'utilisation (pages visitées, fonctionnalités utilisées, horodatages, schémas de clics)',
              'URLs de référence et pages de sortie',
              'Données de journalisation et rapports d\'erreurs',
            ] },
        { kind: "h2", text: 'Informations des Tiers' },
        { kind: "list", items: [
              'Données de la Plateforme WhatsApp Business (statut de livraison des messages, métadonnées de conversation)',
              'Données Meta Platforms (performance des publicités, métriques click-to-WhatsApp)',
              'Données du processeur de paiement (confirmations de transaction, statut de facturation)',
              'Bases de données publiques et annuaires professionnels',
            ] },
        ],
      },
      {
        title: '3. Base Juridique du Traitement',
        blocks: [
        { kind: "p", text: 'Conformément à la réglementation applicable en matière de protection des données, nous ne traitons vos données personnelles que lorsque nous disposons d\'une base juridique valide. Les bases juridiques sur lesquelles nous nous appuyons comprennent :' },
        { kind: "list", items: [
              'Consentement : Vous nous avez donné un consentement clair, éclairé et explicite pour traiter vos données à des fins spécifiques. Vous pouvez retirer votre consentement à tout moment sans affecter la licéité du traitement effectué avant le retrait.',
              'Nécessité contractuelle : Le traitement est nécessaire à l\'exécution d\'un contrat auquel vous êtes partie, ou à la prise de mesures précontractuelles à votre demande.',
              'Obligation légale : Le traitement est nécessaire pour se conformer à une obligation légale à laquelle nous sommes soumis.',
              'Intérêt légitime : Le traitement est nécessaire pour nos intérêts légitimes ou ceux d\'un tiers, à condition que ces intérêts ne prévalent pas sur vos droits et libertés fondamentaux.',
            ] },
        { kind: "p", text: 'Lorsque nous traitons des données personnelles sensibles (que nous ne collectons généralement pas), nous obtenons votre consentement explicite préalable ou nous nous appuyons sur une autre base juridique valide selon la réglementation applicable en matière de protection des données.' },
        ],
      },
      {
        title: '4. Utilisation de Vos Informations',
        blocks: [
        { kind: "p", text: 'Nous utilisons vos données personnelles aux fins suivantes :' },
        { kind: "list", items: [
              'Fournir, exploiter et maintenir notre plateforme et nos services',
              'Traiter les transactions et gérer votre abonnement',
              'Créer et authentifier votre compte',
              'Envoyer des communications liées aux services (mises à jour, alertes de sécurité, messages d\'assistance)',
              'Personnaliser votre expérience et améliorer notre plateforme',
              'Analyser les schémas d\'utilisation pour développer de nouvelles fonctionnalités',
              'Prévenir la fraude, l\'accès non autorisé et autres menaces de sécurité',
              'Se conformer aux obligations légales et répondre aux demandes légitimes des autorités',
              'Exécuter des campagnes, des automatisations et la livraison de messages en votre nom via WhatsApp',
              'Fournir une assistance client et répondre à vos demandes',
            ] },
        ],
      },
      {
        title: '5. Partage et Divulgation des Données',
        blocks: [
        { kind: "p", text: 'Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations dans les circonstances limitées suivantes :' },
        { kind: "list", items: [
              'Prestataires de services : Nous partageons les données avec des fournisseurs tiers de confiance qui nous aident à exploiter notre plateforme (hébergement, traitement des paiements, analyse, outils d\'assistance client). Ces fournisseurs sont liés par des obligations contractuelles de protection de vos données.',
              'WhatsApp / Meta Platforms : Lorsque vous utilisez nos services liés à WhatsApp, les données nécessaires sont transmises à Meta Platforms pour permettre la livraison des messages, l\'analyse et le suivi de la performance publicitaire.',
              'Exigences légales : Nous pouvons divulguer vos données lorsque la loi, la réglementation, une procédure judiciaire ou une demande gouvernementale l\'exige dans le cadre de la juridiction compétente.',
              'Transferts d\'entreprise : En cas de fusion, d\'acquisition ou de vente d\'actifs, vos données peuvent être transférées dans le cadre de cette transaction, sous les mêmes protections de confidentialité.',
              'Avec votre consentement : Nous pouvons partager vos données à des fins non décrites ici uniquement avec votre consentement explicite préalable.',
            ] },
        { kind: "p", text: 'Tous les prestataires de services tiers sont tenus de mettre en place des mesures de sécurité adéquates et de traiter vos données uniquement sur nos instructions.' },
        ],
      },
      {
        title: '6. Transferts Internationaux de Données',
        blocks: [
        { kind: "p", text: 'Vos données peuvent être transférées et traitées en dehors de votre pays de résidence, y compris dans des pays qui ne fournissent pas le même niveau de protection des données. Lorsque nous transférons des données à l\'international, nous nous assurons que des garanties appropriées sont en place, notamment :' },
        { kind: "list", items: [
              'Clauses contractuelles types approuvées par l\'autorité de contrôle compétente ou des organes équivalents',
              'Décisions d\'adéquation pour les juridictions reconnues comme offrant une protection adéquate',
              'Votre consentement explicite lorsque requis',
              'La nécessité du transfert pour l\'exécution de notre contrat avec vous',
            ] },
        { kind: "p", text: 'En utilisant nos services, vous reconnaissez et consentez à ces transferts, sous les garanties décrites dans cette politique.' },
        ],
      },
      {
        title: '7. Conservation des Données',
        blocks: [
        { kind: "p", text: 'Nous ne conservons vos données personnelles que pour la durée nécessaire à l\'accomplissement des finalités pour lesquelles elles ont été collectées, notamment :' },
        { kind: "list", items: [
              'Données de compte : Conservées pendant la durée de votre compte plus 36 mois après la dernière activité.',
              'Données de transaction : Conservées pendant 5 ans conformément aux réglementations fiscales et commerciales applicables.',
              'Données de campagnes et de messages : Conservées pendant 24 mois pour permettre l\'analyse et le reporting.',
              'Communications d\'assistance : Conservées pendant 12 mois après la dernière interaction.',
              'Données de journalisation et d\'utilisation : Conservées pendant 12 mois à des fins de sécurité et de débogage.',
            ] },
        { kind: "p", text: 'Lorsque les données ne sont plus nécessaires, elles sont supprimées de manière sécurisée ou anonymisées de sorte qu\'elles ne puissent plus être associées à votre personne.' },
        ],
      },
      {
        title: '8. Sécurité des Données',
        blocks: [
        { kind: "p", text: 'Nous mettons en place des mesures de sécurité organisationnelles et techniques pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Ces mesures comprennent :' },
        { kind: "list", items: [
              'Chiffrement des données en transit (TLS/SSL) et au repos',
              'Audits de sécurité réguliers et évaluations de vulnérabilités',
              'Contrôles d\'accès et mécanismes d\'authentification',
              'Formation des employés aux pratiques de protection des données',
              'Procédures de réponse aux incidents en cas de violation de données',
            ] },
        { kind: "p", text: 'Bien que nous nous efforcions de protéger vos données personnelles, aucune méthode de transmission sur Internet ou de stockage électronique n\'est totalement sécurisée. Nous ne pouvons garantir une sécurité absolue mais nous nous engageons à vous informer et à informer l\'autorité de contrôle compétente de toute violation de données présentant un risque pour vos droits et libertés.' },
        ],
      },
      {
        title: '9. Vos Droits en Matière de Protection des Données',
        blocks: [
        { kind: "p", text: 'Conformément à la réglementation applicable en matière de protection des données, vous disposez des droits suivants concernant vos données personnelles :' },
        { kind: "list", items: [
              'Droit d\'accès : Demander une copie des données personnelles que nous détenons à votre sujet.',
              'Droit de rectification : Demander la correction de données inexactes ou incomplètes.',
              'Droit d\'effacement : Demander la suppression de vos données lorsqu\'elles ne sont plus nécessaires pour les finalités collectées, ou lorsque vous retirez votre consentement.',
              'Droit à la limitation du traitement : Demander que nous limitions le traitement de vos données dans certaines circonstances.',
              'Droit à la portabilité : Recevoir vos données dans un format structuré, couramment utilisé et lisible par machine.',
              'Droit d\'opposition : Vous opposer au traitement de vos données à des fins de marketing direct ou pour des motifs liés à votre situation particulière.',
              'Droit de retrait du consentement : Retirer votre consentement à tout moment lorsque le traitement est basé sur le consentement.',
            ] },
        { kind: "p", text: 'Pour exercer l\'un de ces droits, veuillez contacter notre Délégué à la Protection des Données à l\'adresse ou à l\'e-mail indiqués ci-dessous. Nous répondrons à votre demande dans un délai de 30 jours.' },
        ],
      },
      {
        title: '10. Cookies et Suivi',
        blocks: [
        { kind: "p", text: 'Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience sur notre site web. Les cookies sont de petits fichiers de données stockés sur votre appareil qui nous aident à comprendre comment vous utilisez notre site et à améliorer nos services.' },
        { kind: "p", text: 'Pour des détails complets sur les cookies que nous utilisons, la gestion de vos préférences et les options de désabonnement, veuillez consulter notre Politique de Cookies dédiée.' },
        { kind: "list", items: [
              'Cookies essentiels : Nécessaires au fonctionnement de base du site web (authentification, gestion de session).',
              'Cookies analytiques : Nous aident à comprendre comment les visiteurs interagissent avec notre site web (par exemple, Google Analytics).',
              'Cookies marketing : Utilisés pour afficher des publicités pertinentes et suivre la performance des campagnes.',
              'Cookies de préférence : Mémorisent vos paramètres et préférences (langue, région).',
            ] },
        { kind: "p", text: 'Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter le fonctionnement de notre site web.' },
        ],
      },
      {
        title: '11. Confidentialité des Enfants',
        blocks: [
        { kind: "p", text: 'Nos services ne s\'adressent pas aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles auprès d\'enfants. Si nous avons connaissance que nous avons collecté des données d\'un enfant sans le consentement parental, nous prendrons des mesures pour supprimer ces informations rapidement.' },
        { kind: "p", text: 'Si vous êtes parent ou tuteur et que vous pensez que votre enfant nous a fourni des données personnelles, veuillez nous contacter immédiatement.' },
        ],
      },
      {
        title: '12. Délégué à la Protection des Données',
        blocks: [
        { kind: "p", text: 'Nous avons nommé un Délégué à la Protection des Données (DPD) responsable de la supervision de notre conformité à la réglementation applicable en matière de protection des données et à cette Politique de Confidentialité.' },
        { kind: "p", text: 'Contactez notre DPD à :' },
        { kind: "list", items: [
              'E-mail : support@dealup.ma',
              'Adresse : Dealup S.A.R.L., siège social communiqué sur demande',
              'Téléphone : disponible sur demande',
            ] },
        { kind: "p", text: 'Vous pouvez également introduire une réclamation auprès de l\'autorité de protection des données de votre pays de résidence.' },
        ],
      },
      {
        title: '13. Modifications de cette Politique',
        blocks: [
        { kind: "p", text: 'Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Lorsque nous apportons des modifications importantes, nous vous en informerons en affichant un avis sur notre site web ou en vous envoyant un e-mail. La date de « Dernière mise à jour » en haut de cette page indique quand cette politique a été révisée pour la dernière fois.' },
        { kind: "p", text: 'Nous vous encourageons à consulter périodiquement cette politique pour rester informé de la façon dont nous protégeons vos données.' },
        ],
      },
      {
        title: '14. Nous Contacter',
        blocks: [
        { kind: "p", text: 'Si vous avez des questions, des préoccupations ou des demandes concernant cette Politique de Confidentialité ou nos pratiques en matière de données, veuillez nous contacter :' },
        { kind: "list", items: [
              'E-mail : support@dealup.ma',
              'Site web : dealup.ma/contact',
              'Adresse : Dealup S.A.R.L., siège social communiqué sur demande',
            ] },
        ],
      },
    ],
  },
  terms: {
    hero: {
      title: 'Conditions d\'Utilisation',
      summary: 'Les règles et conditions régissant votre utilisation de la plateforme et des services de Dealup.',
      lastUpdated: 'Dernière mise à jour : 27 août 2024',
    },
    sections: [
      {
        title: '1. Introduction',
        blocks: [
        { kind: "p", text: 'Ces Conditions d\'Utilisation (« Conditions ») régissent votre accès à et votre utilisation du site web (dealup.ma), de la plateforme, des applications mobiles et des services connexes de Dealup (collectivement, les « Services »). En accédant aux Services ou en les utilisant, vous acceptez d\'être lié par ces Conditions.' },
        { kind: "p", text: 'Dealup S.A.R.L. (« Dealup », « nous », « notre ») est une société dûment constituée conformément au droit applicable.' },
        { kind: "p", text: 'Veuillez lire attentivement ces Conditions avant d\'utiliser nos Services. Si vous n\'acceptez pas ces Conditions, vous ne devez pas accéder aux Services ni les utiliser.' },
        ],
      },
      {
        title: '2. Éligibilité',
        blocks: [
        { kind: "p", text: 'Pour utiliser nos Services, vous devez :' },
        { kind: "list", items: [
              'Avoir au moins 18 ans ou l\'âge de la majorité légale dans votre juridiction',
              'Avoir la capacité juridique de conclure un engagement contraignant',
              'Ne pas être interdit d\'utilisation des Services par la loi applicable',
              'Se trouver dans une juridiction où nos Services sont disponibles',
            ] },
        { kind: "p", text: 'En utilisant les Services, vous déclarez et garantissez que vous remplissez ces conditions d\'éligibilité.' },
        ],
      },
      {
        title: '3. Inscription au Compte',
        blocks: [
        { kind: "p", text: 'Pour accéder à certaines fonctionnalités des Services, vous devez créer un compte. En vous inscrivant, vous acceptez de :' },
        { kind: "list", items: [
              'Fournir des informations exactes, actuelles et complètes',
              'Maintenir et mettre à jour rapidement les informations de votre compte',
              'Garder votre mot de passe en sécurité et en confidentialité',
              'Assumer la responsabilité de toutes les activités survenant sous votre compte',
              'Nous signaler immédiatement toute utilisation non autorisée de votre compte',
            ] },
        { kind: "p", text: 'Nous nous réservons le droit de suspendre ou de résilier les comptes fournissant des informations fausses ou trompeuses, ou violant ces Conditions.' },
        ],
      },
      {
        title: '4. Description des Services',
        blocks: [
        { kind: "p", text: 'Dealup fournit une plateforme de commerce WhatsApp qui permet aux entreprises de :' },
        { kind: "list", items: [
              'Envoyer des campagnes marketing et des diffusions via WhatsApp',
              'Automatiser les conversations clients grâce à des chatbots alimentés par l\'IA',
              'Gérer des boîtes de réception partagées pour les conversations WhatsApp',
              'Créer et gérer des listes et segments de contacts WhatsApp',
              'Lancer des campagnes publicitaires click-to-WhatsApp via les plateformes Meta',
              'Suivre les analyses et les métriques de performance des communications WhatsApp',
              'Gérer les intégrations de l\'API WhatsApp Business',
            ] },
        { kind: "p", text: 'Les fonctionnalités peuvent varier selon votre plan d\'abonnement et peuvent être modifiées à notre discrétion avec un préavis raisonnable.' },
        ],
      },
      {
        title: '5. Abonnements et Paiements',
        blocks: [
        { kind: "p", text: 'Nos Services sont proposés via différents plans d\'abonnement. En souscrivant à un plan payant, vous acceptez ce qui suit :' },
        { kind: "list", items: [
              'Les frais sont facturés d\'avance sur une base mensuelle ou annuelle, selon votre cycle de facturation.',
              'Tous les paiements sont traités dans la devise affichée lors du paiement.',
              'Les méthodes de paiement acceptées incluent Visa, Mastercard et d\'autres méthodes affichées lors du paiement.',
              'Les abonnements se renouvellent automatiquement à la fin de chaque cycle de facturation sauf annulation.',
              'Nous nous réservons le droit de modifier les tarifs avec un préavis d\'au moins 30 jours.',
              'Les retards de paiement peuvent entraîner la suspension de votre accès aux Services.',
            ] },
        { kind: "p", text: 'Une version gratuite avec des fonctionnalités limitées est disponible. Un essai gratuit de 14 jours des fonctionnalités premium peut être proposé de temps en temps. Aucun frais n\'est facturé pendant la période d\'essai.' },
        ],
      },
      {
        title: '6. Politique de Remboursement',
        blocks: [
        { kind: "p", text: 'En raison de la nature numérique de nos Services, les remboursements ne sont généralement pas fournis. Cependant :' },
        { kind: "list", items: [
              'Si vous rencontrez des problèmes techniques continus que nous ne pouvons pas résoudre, vous pouvez être éligible à un remboursement partiel ou total à notre discrétion.',
              'Pour les frais non autorisés ou frauduleux, contactez-nous immédiatement pour une investigation et un éventuel remboursement.',
              'Les annulations prennent effet à la fin de la période de facturation en cours ; aucun remboursement n\'est émis pour la période restante.',
            ] },
        { kind: "p", text: 'Pour demander un remboursement, contactez-nous à support@dealup.ma avec les détails de votre transaction et une description du problème.' },
        ],
      },
      {
        title: '7. Contenu Utilisateur',
        blocks: [
        { kind: "p", text: 'Vous conservez la propriété de tout contenu que vous soumettez, téléchargez ou transmettez via les Services (« Contenu Utilisateur »), y compris les messages, images, médias et listes de contacts.' },
        { kind: "p", text: 'En soumettant du Contenu Utilisateur, vous accordez à Dealup une licence non exclusive, mondiale, libre de droits d\'utiliser, reproduire, modifier et distribuer ce contenu uniquement dans le but de fournir et d\'améliorer les Services.' },
        { kind: "p", text: 'Vous déclarez et garantissez que vous avez tous les droits et autorisations nécessaires pour soumettre le Contenu Utilisateur, et qu\'il ne viole aucune loi applicable ou droits de tiers.' },
        ],
      },
      {
        title: '8. Utilisation Acceptable',
        blocks: [
        { kind: "p", text: 'Vous acceptez d\'utiliser les Services conformément à toutes les lois applicables, y compris le droit applicable et la Politique WhatsApp Business. Vous ne devez pas :' },
        { kind: "list", items: [
              'Envoyer du spam, des messages non sollicités ou des communications de masse en violation des politiques WhatsApp',
              'Utiliser les Services à des fins illégales, frauduleuses ou non autorisées',
              'Usurper l\'identité de toute personne ou entité, ou représenter faussement votre affiliation',
              'Télécharger ou transmettre des logiciels malveillants, des virus ou d\'autres codes nuisibles',
              'Tenter d\'accéder sans autorisation à nos systèmes ou aux comptes d\'autres utilisateurs',
              'Interférer avec ou perturber l\'intégrité ou les performances des Services',
              'Ingénierie inverse, décompiler ou désassembler toute partie des Services',
              'Revendre, sous-licencier ou distribuer les Services sans notre consentement écrit',
              'Utiliser des systèmes automatisés (robots, extracteurs) pour accéder aux Services sauf via notre API',
              'Collecter ou récolter des données personnelles d\'autres utilisateurs sans leur consentement',
            ] },
        ],
      },
      {
        title: '9. Propriété Intellectuelle',
        blocks: [
        { kind: "p", text: 'Tous les droits de propriété intellectuelle dans les Services, y compris les logiciels, textes, graphiques, logos, marques et éléments de design, appartiennent à Dealup ou à ses concédants de licence.' },
        { kind: "p", text: 'Nous vous concédons une licence limitée, non exclusive, non transférable et révocable d\'accéder aux Services et de les utiliser à des fins commerciales internes, sous réserve de ces Conditions.' },
        { kind: "p", text: 'Vous ne pouvez pas copier, modifier, distribuer, vendre ou louer une partie des Services, ni effectuer une ingénierie inverse ou tenter d\'extraire le code source, sauf dans la mesure permise par la loi applicable.' },
        ],
      },
      {
        title: '10. Services Tiers',
        blocks: [
        { kind: "p", text: 'Nos Services s\'intègrent à des plateformes tiers, notamment WhatsApp (Meta Platforms), des processeurs de paiement et des fournisseurs d\'analyse. Votre utilisation de ces services tiers est soumise à leurs conditions et politiques de confidentialité respectives.' },
        { kind: "p", text: 'Nous ne sommes pas responsables de la disponibilité, de l\'exactitude ou des pratiques des services tiers. Nous vous encourageons à consulter leurs conditions avant de les utiliser via notre plateforme.' },
        ],
      },
      {
        title: '11. Protection des Données',
        blocks: [
        { kind: "p", text: 'Votre vie privée est importante pour nous. Notre collecte et utilisation des données personnelles est régie par notre Politique de Confidentialité, qui est incorporée à ces Conditions par référence.' },
        { kind: "p", text: 'Nous traitons les données personnelles conformément aux réglementations applicables en matière de protection des données. Pour plus de détails, veuillez consulter notre Politique de Confidentialité.' },
        ],
      },
      {
        title: '12. Limitation de Responsabilité',
        blocks: [
        { kind: "p", text: 'Dans la mesure maximale permise par le droit applicable, Dealup et ses dirigeants, employés et agents ne seront pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris mais sans s\'y limiter la perte de profits, de données, d\'utilisation ou de clientèle, résultant de ou en relation avec votre utilisation des Services.' },
        { kind: "p", text: 'Notre responsabilité totale pour toute réclamation découlant des Services ne dépassera pas le montant que vous avez payé à Dealup au cours des douze (12) mois précédant la réclamation.' },
        ],
      },
      {
        title: '13. Indemnisation',
        blocks: [
        { kind: "p", text: 'Vous acceptez d\'indemniser, de défendre et de dégager de toute responsabilité Dealup et ses dirigeants, administrateurs, employés et agents de et contre toute réclamation, responsabilité, dommage, perte et dépense (y compris les honoraires d\'avocat raisonnables) découlant de :' },
        { kind: "list", items: [
              'Votre utilisation des Services',
              'Votre violation de ces Conditions',
              'Votre violation de toute loi applicable ou de droits de tiers',
              'Tout Contenu Utilisateur que vous soumettez via les Services',
            ] },
        ],
      },
      {
        title: '14. Résiliation',
        blocks: [
        { kind: "p", text: 'Nous pouvons suspendre ou résilier votre accès aux Services à tout moment, avec ou sans motif, avec ou sans préavis. Les motifs de résiliation comprennent notamment :' },
        { kind: "list", items: [
              'Violation de ces Conditions ou de toute loi applicable',
              'Non-paiement des frais à leur échéance',
              'Abus des Services ou préjudice causé à d\'autres utilisateurs',
              'Demandes des forces de l\'ordre ou des autorités gouvernementales',
            ] },
        { kind: "p", text: 'À la suite de la résiliation, votre droit d\'utiliser les Services cesse immédiatement. Les dispositions qui, par leur nature, doivent survivre à la résiliation (y compris la propriété intellectuelle, la limitation de responsabilité et l\'indemnisation) restent en vigueur.' },
        ],
      },
      {
        title: '15. Droit Applicable et Litiges',
        blocks: [
        { kind: "p", text: 'Ces Conditions sont régies et interprétées conformément au droit applicable. Tout litige découlant de ou en relation avec ces Conditions sera soumis aux tribunaux compétents du lieu d\'immatriculation de la société.' },
        { kind: "p", text: 'Avant d\'engager toute procédure judiciaire, vous acceptez de tenter de résoudre le litige par voie de négociation de bonne foi en nous contactant à support@dealup.ma.' },
        ],
      },
      {
        title: '16. Divisibilité',
        blocks: [
        { kind: "p", text: 'Si une disposition de ces Conditions est jugée invalide ou inapplicable, cette disposition sera appliquée dans la mesure maximale possible, et les dispositions restantes continueront pleinement en vigueur et effet.' },
        ],
      },
      {
        title: '17. Entente Complète',
        blocks: [
        { kind: "p", text: 'Ces Conditions, ensemble avec notre Politique de Confidentialité et tout terme supplémentaire, constituent l\'entente complète entre vous et Dealup concernant les Services et remplacent tous les accords et compréhensions antérieurs.' },
        { kind: "p", text: 'Notre incapacité à exercer tout droit ou disposition de ces Conditions ne sera pas considérée comme une renonciation à ce droit ou cette disposition.' },
        ],
      },
      {
        title: '18. Modifications de ces Conditions',
        blocks: [
        { kind: "p", text: 'Nous nous réservons le droit de modifier ces Conditions à tout moment. Lorsque nous apportons des modifications importantes, nous vous en informerons en publiant les Conditions mises à jour sur notre site web et en mettant à jour la date de « Dernière mise à jour ». Votre utilisation continue des Services après ces modifications constitue l\'acceptation des Conditions mises à jour.' },
        ],
      },
      {
        title: '19. Nous Contacter',
        blocks: [
        { kind: "p", text: 'Si vous avez des questions concernant ces Conditions, veuillez nous contacter :' },
        { kind: "list", items: [
              'E-mail : support@dealup.ma',
              'Site web : dealup.ma/contact',
              'Adresse : Dealup S.A.R.L., siège social communiqué sur demande',
            ] },
        ],
      },
    ],
  },
  cookies: {
    hero: {
      title: 'Politique de Cookies',
      summary: 'Comment Dealup utilise les cookies et technologies similaires sur notre site web et notre plateforme.',
      lastUpdated: 'Dernière mise à jour : 27 août 2024',
    },
    sections: [
      {
        title: '1. Qu\'est-ce qu\'un Cookie',
        blocks: [
        { kind: "p", text: 'Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette ou téléphone portable) lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web efficacement, améliorer l\'expérience utilisateur et fournir des informations aux propriétaires du site.' },
        { kind: "p", text: 'Les technologies similaires comprennent les balises web, les balises pixel, le stockage local et le stockage de session, qui remplissent des fonctions comparables.' },
        ],
      },
      {
        title: '2. Comment Nous Utilisons les Cookies',
        blocks: [
        { kind: "p", text: 'Nous utilisons les cookies et technologies similaires aux fins suivantes :' },
        { kind: "list", items: [
              'Cookies essentiels : Nécessaires au bon fonctionnement du site web. Ils permettent les fonctionnalités principales telles que l\'authentification, la sécurité et la gestion de session. Sans ces cookies, les Services ne peuvent pas être fournis.',
              'Cookies analytiques : Nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en signalant des informations de manière anonyme. Cela nous permet d\'améliorer le site web et l\'expérience utilisateur.',
              'Cookies marketing : Utilisés pour suivre les visiteurs sur les sites web afin d\'afficher des publicités pertinentes et engageantes. Ils limitent également le nombre d\'affichages d\'une publicité et aident à mesurer l\'efficacité des campagnes publicitaires.',
              'Cookies de préférence : Permettent au site web de mémoriser les choix que vous faites (tels que la langue ou la région) et de fournir des fonctionnalités améliorées et personnalisées.',
            ] },
        ],
      },
      {
        title: '3. Cookies Spécifiques que Nous Utilisons',
        blocks: [
        { kind: "p", text: 'Le tableau suivant répertorie les principaux cookies que nous utilisons et leurs finalités :' },
        { kind: "list", items: [
              'Cookies de session (Essentiels) : Maintiennent votre session connecté. Supprimés lorsque vous fermez le navigateur.',
              'Cookies d\'authentification (Essentiels) : Mémorisent vos identifiants de connexion pour un accès sécurisé. Persistants pendant 30 jours.',
              'Jetons CSRF (Essentiels) : Protègent contre les attaques de falsification de requête inter-sites. Basés sur la session.',
              'Google Analytics (_ga, _gid, _gat) : Collectent des statistiques d\'utilisation anonymes pour améliorer le site web. Persistants jusqu\'à 2 ans.',
              'Meta Pixel (_fbp, _fbc) : Suivent les conversions des publicités Facebook et Instagram. Persistants pendant 90 jours.',
              'Cookies Hotjar (_hj*) : Enregistrent les replays de session et les cartes de chaleur pour l\'amélioration de l\'UX. Persistants jusqu\'à 1 an.',
              'Cookie de préférence linguistique : Mémorise la langue sélectionnée (fr, ar, en). Persistant pendant 1 an.',
            ] },
        ],
      },
      {
        title: '4. Cookies des Tiers',
        blocks: [
        { kind: "p", text: 'Certains cookies sont placés par des services tiers qui apparaissent sur nos pages. Nous utilisons les services tiers suivants qui peuvent placer des cookies :' },
        { kind: "list", items: [
              'Google Analytics : Service d\'analyse web fourni par Google LLC. Politique de cookies : policies.google.com/technologies/cookies',
              'Meta Platforms : Publicité et suivi des conversions. Politique de cookies : www.facebook.com/policies/cookies',
              'Hotjar : Analyse de l\'expérience utilisateur. Politique de cookies : www.hotjar.com/privacy',
              'Stripe : Traitement des paiements. Politique de cookies : stripe.com/cookies',
            ] },
        { kind: "p", text: 'Nous ne contrôlons pas ces cookies tiers. Veuillez vous référer aux politiques de cookies des fournisseurs respectifs pour plus d\'informations.' },
        ],
      },
      {
        title: '5. Gestion de Vos Préférences de Cookies',
        blocks: [
        { kind: "p", text: 'Vous pouvez gérer vos préférences de cookies de plusieurs façons :' },
        { kind: "list", items: [
              'Paramètres du navigateur : La plupart des navigateurs vous permettent de bloquer ou de supprimer les cookies. Consultez la documentation d\'aide de votre navigateur pour des instructions.',
              'Outil de consentement aux cookies : Lors de votre première visite sur notre site web, une bannière de consentement aux cookies vous permet d\'accepter ou de refuser les cookies non essentiels.',
              'Liens de désabonnement : Pour Google Analytics, installez le complément de désabonnement Google Analytics (tools.google.com/dlpage/gaoptout). Pour Meta, ajustez vos préférences publicitaires à www.facebook.com/adpreferences.',
            ] },
        { kind: "p", text: 'Veuillez noter que la désactivation des cookies essentiels peut altérer le fonctionnement de notre site web et de nos Services.' },
        ],
      },
      {
        title: '6. Impact de la Désactivation des Cookies',
        blocks: [
        { kind: "p", text: 'Si vous choisissez de désactiver les cookies, certaines fonctionnalités de notre site web peuvent ne pas fonctionner correctement, notamment :' },
        { kind: "list", items: [
              'La connexion à votre compte',
              'La mémorisation de vos préférences linguistiques et régionales',
              'L\'accès à certaines parties de la plateforme',
              'Les fonctionnalités et contenus personnalisés',
            ] },
        ],
      },
      {
        title: '7. Mises à Jour de cette Politique',
        blocks: [
        { kind: "p", text: 'Nous pouvons mettre à jour cette Politique de Cookies de temps à autre pour refléter les changements technologiques, législatives ou dans nos pratiques commerciales. Lorsque nous apportons des modifications importantes, nous mettrons à jour la date de « Dernière mise à jour » et, le cas échéant, vous en informerons via notre site web ou par e-mail.' },
        { kind: "p", text: 'Nous vous encourageons à consulter périodiquement cette politique pour rester informé de l\'utilisation que nous faisons des cookies.' },
        ],
      },
      {
        title: '8. Nous Contacter',
        blocks: [
        { kind: "p", text: 'Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter :' },
        { kind: "list", items: [
              'E-mail : support@dealup.ma',
              'Site web : dealup.ma/contact',
              'Adresse : Dealup S.A.R.L., siège social communiqué sur demande',
            ] },
        ],
      },
    ],
  },
};
