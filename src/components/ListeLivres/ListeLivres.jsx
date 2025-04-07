import { useState, useEffect } from "react";
import { useAnimation } from "motion/react";
import CarteLivre from "../CarteLivre/CarteLivre";
import LoadingCircleSpinner from "../LoadingCircleSpinner/LoadingCircleSpinner";
import { Helmet } from "react-helmet-async";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Composant qui permet d'afficher la liste des livres
function ListeLivres() {
  const controls = useAnimation(); //Permet de gérer les animations manuellement
  // Déclaration des variables d'état
  let [livres, setLivres] = useState([]);
  const [recherche, setRecherche] = useState("");
  let [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Récupérer les livres de la base de données
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        let url = import.meta.env.VITE_DEV_URL;

        if (import.meta.env.VITE_MODE == "PRODUCTION") {
          url = import.meta.env.VITE_PROD_URL;
        }

        const reponse = await fetch(`${url}/livres`);
        const donneesLivres = await reponse.json();
        if (reponse.ok) {
          setLivres(donneesLivres);
          setLoading(false);
        } else {
          setMessage(donneesLivres.message);
          setLoading(false);
        }
        //Permet d'attendre le chargement avant de déclencher l'animation
        controls.start("visible");
      } catch (erreur) {
        setMessage(
          "Erreur lors de la récupération des livres. Veuillez réessayer plus tard."
        );
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /**
   * Fonction qui permet de trier les livres par titre
   * @param {*} e Événement déclencheur
   */
  function trierTitre(e) {
    const declencheur = e.target;

    const direction = Number(declencheur.dataset.direction);

    const clone = [...livres];

    clone.sort((a, b) => {
      if (direction == "1") {
        return a.titre.localeCompare(b.titre);
      } else {
        return b.titre.localeCompare(a.titre);
      }
    });
    setLivres(clone);
  }

  /**
   *  Fonction qui permet de trier les livres par auteur
   * @param {*} e Événement déclencheur
   */
  function trierAuteur(e) {
    const declencheur = e.target;

    const direction = Number(declencheur.dataset.direction);

    const clone = [...livres];

    clone.sort((a, b) => {
      if (direction == "1") {
        return a.auteur.localeCompare(b.auteur);
      } else {
        return b.auteur.localeCompare(a.auteur);
      }
    });
    setLivres(clone);
  }

  return (
    <>
      <Helmet>
        <title>Libra System - Liste de livres</title>
        <meta
          name="description"
          content="Liste de livres disponibles dans notre API."
        />
        <meta
          name="keywords"
          content="Api rest, livre, bibliothèque, gestion de livres, catalogue, recherche de livres"
        />
      </Helmet>
      {/* Message */}
      {message ? (
        <div className="border rounded-md p-3 mt-[150px] mx-[50px] bg-red-100 text-red-900">
          <p>{message}</p>
        </div>
      ) : (
        ""
      )}
      {/* Loading */}
      {loading && <LoadingCircleSpinner />}

      <div className="flex items-baseline justify-between mt-24 px-5 flex-wrap gap-3">
        {/* Barre de tri et de recherche */}
        <div className="flex items-center ">
          <Menu
            as="div"
            className="relative inline-block justify-center text-left"
          >
            <div>
              <MenuButton className="group inline-flex text-md font-medium">
                Trier
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 size-5 shrink-0 group-hover:text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute z-10 mt-2 w-[305px] origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1 w-full">
                <MenuItem
                  key="Par titre ascendant"
                  className="text-gray-700 font-medium block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  <p
                    onClick={trierTitre}
                    data-direction="1"
                    className="font-[Cormorant Garamond] uppercase"
                  >
                    Trier par titre ascendant
                  </p>
                </MenuItem>
                <MenuItem
                  key="Par titre descendant"
                  className="text-gray-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  <p
                    onClick={trierTitre}
                    data-direction="-1"
                    className="font-[Cormorant Garamond] uppercase"
                  >
                    Trier par titre descendant
                  </p>
                </MenuItem>
                <MenuItem
                  key="Par auteur ascendant"
                  className="text-gray-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  <p
                    onClick={trierAuteur}
                    data-direction="1"
                    className="font-[Cormorant Garamond] uppercase"
                  >
                    Trier par auteur ascendant
                  </p>
                </MenuItem>
                <MenuItem
                  key="Par auteur descendant"
                  className="text-gray-700 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                >
                  <p
                    onClick={trierAuteur}
                    data-direction="-1"
                    className="font-[Cormorant Garamond] uppercase"
                  >
                    Trier par auteur descendant
                  </p>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div>
          <input
            aria-label="Rechercher un livre"
            placeholder="Rechercher un livre"
            onChange={(e) => setRecherche(e.target.value)}
            id="recherche"
            type="search"
            className="bg-gray-400/10 min-w-[300px] block w-full rounded-md px-3 py-1.5 text-neutral-50 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
          />
        </div>
      </div>

      {/* Grille de produits */}
      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <div className="grid grid-cols-1 gap-x-15 gap-y-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center">
          {livres
            .filter((livre) => {
              if (recherche == "") {
                return livre;
              } else if (
                livre.auteur.toLowerCase().includes(recherche.toLowerCase())
              ) {
                return livre;
              } else if (
                livre.titre.toLowerCase().includes(recherche.toLowerCase())
              ) {
                return livre;
              } else if (
                livre.isbn.toLowerCase().includes(recherche.toLowerCase())
              ) {
                return livre;
              }
            })
            .map((livre) => {
              return <CarteLivre key={livre.id} livre={livre} />;
            })}
          {livres.length == 0 && "Aucun livre trouvé."}
        </div>
      </section>
    </>
  );
}
export default ListeLivres;
