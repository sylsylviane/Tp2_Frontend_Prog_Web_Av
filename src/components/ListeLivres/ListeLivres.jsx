// TODO: IMPORTER CSS

import { useState, useEffect } from "react";
import { useAnimation } from "motion/react";
import CarteLivre from "../CarteLivre/CarteLivre";
import LoadingCircleSpinner from "../LoadingCircleSpinner/LoadingCircleSpinner";
import { Helmet } from "react-helmet-async";
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

    const direction = declencheur.value;

    const clone = [...livres];

    clone.sort((a, b) => {
      if (direction == "ascendant") {
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

    const direction = declencheur.value;

    const clone = [...livres];

    clone.sort((a, b) => {
      if (direction == "ascendant") {
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
          <meta name="description" content="Liste de livres disponibles dans notre API." />
          <meta name="keywords" content="Api rest, livre, bibliothèque, gestion de livres, catalogue, recherche de livres" />
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
      <section className="flex flex-col md:flex-row gap-x-20 justify-center mx-[50px] mb-[50px]">
        <div className="mt-[150px] flex flex-col  ">
          <div>
            <label htmlFor="recherche" className="mt-3 ">
              Rechercher
            </label>
            <input
              onChange={(e) => setRecherche(e.target.value)}
              id="recherche"
              type="search"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
          </div>
          <div className="flex gap-x-5 mt-5">
            <div className="">
              <label htmlFor="parTitre" className="block text-sm/6 font-medium">
                Par titre
              </label>

              <select
                name="ordre"
                id="parTitre"
                onChange={trierTitre}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
              >
                <option value="ascendant">Ascendant</option>
                <option value="descendant">Descendant</option>
              </select>
            </div>
            <div className="">
              <label
                htmlFor="parAuteur"
                className="block text-sm/6 font-medium"
              >
                Par auteur
              </label>

              <select
                name="ordre"
                id="parAuteur"
                onChange={trierAuteur}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
              >
                <option value="ascendant">Ascendant</option>
                <option value="descendant">Descendant</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid mt-[50px] md:mt-[150px] sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-15 gap-y-20 ">
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
