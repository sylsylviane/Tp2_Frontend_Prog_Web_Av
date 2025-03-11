import {
  PencilIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
const features = [
  {
    name: "Ajout de Livres",
    description:
      "Ajoutez facilement de nouveaux titres à votre collection avec des détails complets, y compris le titre, l'auteur, la date de publication, le genre, et plus encore.",
    icon: PlusCircleIcon,
  },
  {
    name: "Mise à Jour et Suppression",
    description:
      " Modifiez les informations sur les livres existants ou supprimez des titres de votre collection en quelques clics.",
    icon: PencilIcon,
  },
  {
    name: "Recherche Avancée",
    description:
      "Trouvez rapidement des livres spécifiques grâce à des options de recherche avancée par titre, auteur, genre, ou année de publication.",
    icon: MagnifyingGlassIcon,
  },
];
function Accueil() {
  return (
    <>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 ring-1 ring-gray-400/10 hover:ring-gray-400/20">
            Créer votre compte maintenant !{" "}
            <a href="#" className="font-semibold text-red-400">
              <span aria-hidden="true" className="absolute inset-0" />
              S'inscrire <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center m-5">
          <h1 className="text-5xl tracking-tight sm:text-7xl">
            Bienvenue sur Libra System
          </h1>
          <p className="mt-8 text-lg font-medium sm:text-xl/8">
            Libra System est une API de gestion de livres innovante conçue pour
            simplifier le suivi et l'organisation de vos collections de livres.
            Que vous soyez un bibliophile passionné, un bibliothécaire
            professionnel, ou simplement quelqu'un qui souhaite mieux gérer ses
            lectures, Libra System est l'outil qu'il vous faut.
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-yellow-700 px-3.5 py-2.5 text-lg text-black shadow-xs hover:bg-red-400"
          >
            Se connecter
          </a>
          <a href="#" className="text-lg/6">
            Apprenez-en plus <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      {/* *********FEATURES*************** */}
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold">
                  Fonctionnalités Clés
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-prettysm:text-5xl">
                  Conception intuitive et conviviale.
                </p>
                <p className="mt-6 text-lg/8">
                  Une interface utilisateur claire et des fonctionnalités
                  robustes. Notre API est parfaite pour les développeurs qui
                  souhaitent intégrer des fonctionnalités de gestion de livres
                  dans leurs propres applications ou sites web.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-yellow-700">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute top-1 left-1 size-5 text-yellow-700"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              alt="Product screenshot"
              src="../../img/livres.jpg"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Accueil;
