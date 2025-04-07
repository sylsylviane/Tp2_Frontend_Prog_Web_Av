import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from '../AuthContext/AuthContext';
import { useContext } from 'react';
import { motion } from "motion/react";

function Nav() {
  // Référence pour le formulaire
  const formRef = useRef();

  const navigate = useNavigate();

  // Variables d'état
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { jeton, connexion, deconnexion } = useContext(AuthContext);
  // Variable d'état pour la modale de connexion
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Variants pour les animations
  const aVariants = { initial: { x: 0 }, whileHover: { x: 0 } };
  const spanVariants = {
    initial: { x: 0 },
    whileHover: { x: 10, transition: { duration: 0.5 } },
  };
  
  async function envoiFormulaire(e) {
    try{
      e.preventDefault();

      // TODO: Valider les données du formulaire

      // Récupérer les valeurs du formulaire
      const { courriel, mdp } = formRef.current;
      const body = { courriel: courriel.value, mdp: mdp.value };

      const optionsRequete = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }

      // Déterminer l'URL de la requête en fonction de l'environnement
      let url = import.meta.env.VITE_DEV_URL;

      if (import.meta.env.VITE_MODE == "PRODUCTION") {
        url = import.meta.env.VITE_PROD_URL;
      }

      const reponse = await fetch(`${url}/utilisateurs/connexion`, optionsRequete);
      const donnees = await reponse.json();
      console.log(donnees);
      
      if (reponse.ok) {        
        setMessage(donnees.message)
        // setTimeout(() => {
        //   setMessage("");
        // }, 2000);
        connexion(donnees.jeton);
      }else{
        setMessage(donnees.message);
      }

    }catch(erreur){
      setMessage("Une erreur est survenue. Réessayez dans quelques instants.");
    }
  }
  return (
    <>
      {/* NAVIGATION PRINCIPALE GRAND ÉCRAN */}
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b border-gray-400/20">
        <div className="flex lg:flex-1">
          <NavLink to="/">
            <h1 className="d-block text-2xl font-bold text-neutral-50">
              <strong>Libra </strong>
              <small>System</small>
            </h1>
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/livres">Liste de livres</NavLink>
          {jeton && <NavLink to="/livres/ajout">Ajouter un livre</NavLink>}
        </div>
        {!jeton && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.p
              onClick={() => setOpen(true)}
              variants={aVariants}
              initial="initial"
              whileHover="whileHover"
              className="text-sm/6 cursor-pointer"
            >
              Se connecter{" "}
              <motion.span
                variants={spanVariants}
                className="inline-block"
                aria-hidden="true"
              >
                &rarr;
              </motion.span>
            </motion.p>
          </div>
        )}
        {jeton && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <UserCircleIcon
              aria-hidden="true"
              className="size-6 text-neutral-50 mr-4 cursor-pointer"
            />
            <a href="#" className="text-sm/6 " onClick={deconnexion}>
              {/* on pourrait mettre une balise p avec un onClick si on ne veut pas mettre un lien a avec une ancre */}
              Se déconnecter <span>&rarr;</span>
            </a>
          </div>
        )}
      </nav>
      {/* NAVIGATION PRINCIPALE PETIT ÉCRAN */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <h1 className="d-block text-2xl font-bold text-gray-700">
              <strong>Libra </strong>
              <small>System</small>
            </h1>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Accueil
                </NavLink>
                <NavLink
                  to="/livres"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Liste de livres
                </NavLink>
                {jeton && (
                  <NavLink
                    to="/livres/ajout"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Ajouter un livre
                  </NavLink>
                )}
              </div>
              {!jeton && (
                <div className="py-6">
                  <a
                    onClick={() => {
                      setOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Se connecter
                  </a>
                </div>
              )}
              {jeton && (
                <div className="py-6">
                  <NavLink
                    onClick={deconnexion}
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Se déconnecter
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {/* MODAL DE CONNEXION */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-400 sm:mx-0 sm:size-10">
                    <UserCircleIcon
                      aria-hidden="true"
                      className="size-6 text-neutral-50"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Se connecter
                    </DialogTitle>
                    <form
                      action=""
                      onSubmit={envoiFormulaire}
                      ref={formRef}
                      className="mt-2"
                    >
                      <label htmlFor="courriel" className="text-gray-700">
                        Courriel
                      </label>
                      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-400">
                        <input
                          id="courriel"
                          name="courriel"
                          type="email"
                          className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        />
                      </div>
                      <label htmlFor="mdp" className="text-gray-700">
                        Mot de passe
                      </label>
                      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-400">
                        <input
                          id="mdp"
                          name="mdp"
                          type="password"
                          className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        />
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          onClick={() => setOpen(false)}
                          className="inline-flex w-full justify-center rounded-md bg-yellow-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 sm:ml-3 sm:w-auto"
                        >
                          Connexion
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Nav;