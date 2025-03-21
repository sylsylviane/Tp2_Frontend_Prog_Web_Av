// TODO: IMPORTER CSS

import { useState, useEffect } from "react";
import CarteLivre from "../CarteLivre/CarteLivre";

// Composant qui permet d'afficher la liste des livres
function ListeLivres() {
  // Déclaration des variables d'état
  let [livres, setLivres] = useState([]);
  const [recherche, setRecherche] = useState("");

  // Récupérer les livres de la base de données
  useEffect(() => {
    async function fetchData() {
      let url = import.meta.env.VITE_DEV_URL;

      if (import.meta.env.VITE_MODE == "PRODUCTION") {
        url = import.meta.env.VITE_PROD_URL;
      }

      const reponse = await fetch(`${url}/livres`);
      const donneesLivres = await reponse.json();
      setLivres(donneesLivres);
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

      {/* <section className="flex flex-wrap justify-end">
        <div className="mt-[100px] flex flex-col justify-end gap-x-10 mx-[50px] ">
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
          <div className="flex gap-x-10 mt-5">
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
      </section>
      <section className="m-[50px]">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-x-15 xl:gap-10 lg:gap-10 md:gap-25 sm:gap-20 gap-y-20 ">
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
      </section> */}
    </>
  );
}
export default ListeLivres;
