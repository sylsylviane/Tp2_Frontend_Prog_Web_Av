import { useEffect, useState, useRef } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

// Composant qui permet d'ajouter un livre à la base de données 
function FormAjoutLivre() {
  // Référence au formulaire
  const formRef = useRef();

  const [categories, setCategories] = useState([]);
  const [donneesLivre, setDonneesLivre] = useState({
    titre: "",
    description: "",
    editeur: "",
    isbn: "",
    pages: "",
    date: "",
    image: "",
    categories: [],
    auteur: "",
  });

  // Gestion des messages d'erreur
  const [message, setMessage] = useState("");

  // Récupérer les catégories de la base de données pour les afficher dans le formulaire d'ajout de livre
  useEffect(() => {
    const donnees = { ...donneesLivre, categories };
    setDonneesLivre(donnees);
  }, [categories]);

  // Fonction qui permet de gérer les changements dans les champs du formulaire
  function onInputChange(e) {
    const champ = e.currentTarget;
    const nom = champ.name;
    const valeur = champ.value;
    const nouvellesValeurs = { ...donneesLivre, [nom]: valeur };
    setDonneesLivre(nouvellesValeurs);
  }

  // TODO: VALIDATION AVANCÉE AVEC NPM INSTALL VALIDATOR. VOIR NOTE DE COURS ENVOIDEDEONNEES.PDF

  // Fonction qui permet de gérer les changements dans les catégories du formulaire
  function onCategorieChange(e) {
    const checkbox = e.currentTarget;
    const valeur = checkbox.value;
    const estCoche = checkbox.checked;
    let nouvellesCategories = [...categories];

    // Si la catégorie est cochée et n'est pas déjà dans le tableau, on l'ajoute
    // Si la catégorie n'est pas cochée et est déjà dans le tableau, on la retire
    if (estCoche && !nouvellesCategories.includes(valeur)) {
      nouvellesCategories.push(valeur);
    } else if (!estCoche && nouvellesCategories.includes(valeur)) {
      nouvellesCategories = nouvellesCategories.filter((categorie) => {
        // On garde toutes les catégories sauf celle qui est décochée
        return categorie !== valeur;
      });
    }
    // On met à jour les catégories
    setCategories(nouvellesCategories);
  }

  // Fonction qui permet de gérer la soumission du formulaire
  async function onSubmit(e) {
    e.preventDefault();
    // Vérifier que le formulaire est valide
    if (formRef.current.checkValidity()) {
      let url = import.meta.env.VITE_DEV_URL;

      if (import.meta.env.VITE_MODE == "PRODUCTION") {
        url = import.meta.env.VITE_PROD_URL;
      }

      // On prépare les données à envoyer
      const objDonnees = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donneesLivre),
      };
      // On envoie les données
      const reponse = await fetch(`${url}/livres`, objDonnees);
      // On récupère les données de la réponse
      await reponse.json();

      // On affiche un message en fonction de la réponse
      if (reponse.ok) {
        setMessage("Le livre a été ajouté avec succès");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage("Une erreur s'est produite lors de l'ajout du livre");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className="isolate px-6 mt-[100px] mb-[100px]"
    >
      <div className="mx-auto max-w-2xl space-y-12 mt-[100px]">
        <div className="border-b border-neutral-50 pb-12">
          <h1 className="text-2xl">Ajouter un livre</h1>
          <p className="mt-1 text-sm/6">
            Veuillez entrer les informations requises
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="titre" className="block text-sm/6">
                Titre
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-400">
                  {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                    workcation.com/
                  </div> */}
                  <input
                    id="titre"
                    name="titre"
                    type="text"
                    placeholder="Entrez le titre du livre"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm/6 ">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400">
                Écrivez la description du livre
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7">Informations détaillées du livre</h2>
          <p className="mt-1 text-sm/6 ">
            Veuillez entrer toutes les informations suivantes
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="editeur" className="block text-sm/6">
                Éditeur
              </label>
              <div className="mt-2">
                <input
                  id="editeur"
                  name="editeur"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="auteur" className="block text-sm/6">
                Auteur
              </label>
              <div className="mt-2">
                <input
                  id="auteur"
                  name="auteur"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="isbn" className="block text-sm/6">
                ISBN
              </label>
              <div className="mt-2">
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="date" className="block text-sm/6">
                Année de publication
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm/6">
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pages" className="block text-sm/6">
                Nombre de pages
              </label>
              <div className="mt-2">
                <input
                  id="pages"
                  name="pages"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12 ">
          <h2 className="text-base/7 ">Catégories</h2>
          <p className="mt-1 text-sm/6">
            Veuillez choisir un choix minimum parmi ces catégories.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6">Genres</legend>
              <div className="mt-6 space-y-6vmt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id="categorie-thriller"
                        value="Thriller"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="comments-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="comments" className="font-medium">
                      Thriller
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-policier"
                        value="Policier"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="candidates-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="candidates" className="font-medium">
                      Policier
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-science-fiction"
                        value="Science Fiction"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Science-Fiction
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-drame"
                        value="Drame"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Drame
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-politique"
                        value="Politique"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Politique
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-litterature-americaine"
                        value="Littérature Americaine"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Littérature Américaine
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-horreur"
                        value="Horreur"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Horreur
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-fantastique"
                        value="Fantastique"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Fantastique
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-litterature-quebecoise"
                        value="Litterature quebecoise"
                        type="checkbox"
                        onChange={onCategorieChange}
                        aria-describedby="offers-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-400 checked:bg-red-400 indeterminate:border-red-400 indeterminate:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium">
                      Littérature Québécoise
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button type="button" className="text-sm/6">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-yellow-700 px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default FormAjoutLivre;
