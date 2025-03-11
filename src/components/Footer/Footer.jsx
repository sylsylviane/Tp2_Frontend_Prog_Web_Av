import { QuestionMarkCircleIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
function Footer() {
  return (
    <footer className="py-5 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl tracking-tight text-white">
              Inscrivez-vous à notre infolettre
            </h2>
            <div className="flex items-baseline gap-2">
              <h1 className="d-block text-2xl font-bold text-neutral-50">
                <strong>Libra </strong>
                <small>System </small>
              </h1>
              <p className="text-lg text-gray-300">
                La clé de votre bibliothèque numérique.
              </p>
            </div>

            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse courriel
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Entrez votre courriel"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-yellow-700 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                S'abonner
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <QuestionMarkCircleIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <h4 className="mt-4 text-base font-semibold text-white">
                Support
              </h4>
              <a href="#" className="mt-2 text-base/7 text-gray-400">
                Documentation
              </a>
              <a href="#" className="mt-2 text-base/7 text-gray-400">
                Guide
              </a>
              <a href="#" className="mt-2 text-base/7 text-gray-400">
                FAQs
              </a>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <h4 className="mt-4 text-base font-semibold text-white">
                Compagnie
              </h4>
              <a href="#" className="mt-2 text-base/7 text-gray-400">
                À propos
              </a>
              <a href="#" className="mt-2 text-base/7 text-gray-400">
                Blog
              </a>
              <a href="#" className="mt-2 text-base/7 text-gray-400">
                Presse
              </a>
            </div>
          </dl>
        </div>
      </div>
      <div className="border-t border-gray-400/20 mt-16 sm:mt-24 lg:mt-32">
        <h5 className="text-center mt-5">
          2025 Libra System inc. Tous droits réservés.
        </h5>
      </div>
    </footer>
  );
}
export default Footer;
