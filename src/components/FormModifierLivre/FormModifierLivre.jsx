import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { trim, isLength, isISBN, isInt, isEmpty } from "validator";
import he from "he";
import { AuthContext } from "../AuthContext/AuthContext";

function FormModifierLivre() {
  const { jeton } = useContext(AuthContext);

  // Récupérer l'identifiant du livre à modifier
  const { id } = useParams();

  // Référence pour le formulaire
  const formRef = useRef();

  // Utiliser le hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Définition des états
  const [categories, setCategories] = useState([]);
  const [formulaireValide, setFormulaireValide] = useState(false);
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
  const [erreurs, setErreurs] = useState({
    titre: "",
    description: "",
    editeur: "",
    isbn: "",
    pages: "",
    date: "",
    image: "",
    categories: "",
    auteur: "",
  });
  const [message, setMessage] = useState("");

  // Fonction qui permet de décoder les caractères spéciaux
  const d = (text) => he.decode(text);

  // Récupérer les détails d'un livre de la base de données
  useEffect(() => {
    async function getData() {
      try {
        let url = import.meta.env.VITE_DEV_URL;

        if (import.meta.env.VITE_MODE == "PRODUCTION") {
          url = import.meta.env.VITE_PROD_URL;
        }
        const reponse = await fetch(`${url}/livres/${id}`);
        const donneesLivre = await reponse.json();

        setDonneesLivre(donneesLivre);
        setCategories(donneesLivre.categories);
      } catch (erreur) {
        setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    }
    getData();
  }, []);

  // Mettre à jour les catégories du livre
  useEffect(() => {
    const donnees = { ...donneesLivre, categories };
    setDonneesLivre(donnees);
  }, [categories]);

  /**
   * Fonction qui permet de gérer le changement des champs du formulaire
   * @param {*} e
   */
  function onInputChange(e) {
    const champ = e.currentTarget;
    const nom = champ.name;
    let valeur = champ.value;

    valeur = trim(valeur);

    const nouvellesValeurs = { ...donneesLivre, [nom]: valeur };
    setDonneesLivre(nouvellesValeurs);
  }

  /**
   * Fonction qui permet de gérer le changement de catégorie
   * @param {*} e Événement déclenché lors de l'interaction avec une case à cocher.
   */
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

  /**
   * Fonction qui permet de valider le formulaire
   */
  function validerFormulaire() {
    const nouvellesErreurs = {};
    const dateCourante = new Date().getFullYear();

    if (isEmpty(donneesLivre.titre)) {
      nouvellesErreurs.titre = "Le titre ne peut pas être vide";
    } else if (!isLength(donneesLivre.titre, { max: 250 })) {
      nouvellesErreurs.titre =
        "Le titre est trop long. (maximum: 250 caractères)";
    }

    if (!isLength(donneesLivre.description, { max: 2000 })) {
      nouvellesErreurs.description =
        "La description est trop longue. (maximum: 2000 caractères)";
    }

    if (!isLength(donneesLivre.editeur, { max: 100 })) {
      nouvellesErreurs.editeur =
        "L'éditeur doit contenir maximum 100 caractères.";
    }

    if (isEmpty(donneesLivre.auteur)) {
      nouvellesErreurs.auteur = "L'auteur ne peut pas être vide";
    } else if (!isLength(donneesLivre.auteur, { max: 100 })) {
      nouvellesErreurs.auteur =
        "Le champ auteur est trop long. (maximum: 100 caractères)";
    }

    if (isEmpty(donneesLivre.isbn)) {
      nouvellesErreurs.isbn = "L'isbn ne peut pas être vide";
    } else if (!isISBN(donneesLivre.isbn)) {
      nouvellesErreurs.isbn =
        "Veuillez entrer un ISBN valide (10 ou 13 caractères)";
    }

    if (!isLength(donneesLivre.pages, { max: 10 })) {
      nouvellesErreurs.page =
        "Le nombre de page ne peut dépasser 10 caractères";
    }

    if (
      !isEmpty(donneesLivre.date) &&
      !isInt(donneesLivre.date, { min: 1900, max: dateCourante })
    ) {
      nouvellesErreurs.date =
        "L'année de publication doit être une date valide entre 1900 et aujourd'hui.";
    }

    if (isEmpty(donneesLivre.image)) {
      nouvellesErreurs.image = "Le champ image ne peut pas être vide";
    } else if (
      !donneesLivre.image.endsWith(".jpg") &&
      !donneesLivre.image.endsWith(".jpeg") &&
      !donneesLivre.image.endsWith(".png") &&
      !donneesLivre.image.endsWith(".gif")
    ) {
      nouvellesErreurs.image =
        "Veuillez entrer une image de format .jpeg, .gif, .png ou .jpg.";
    }

    setErreurs(nouvellesErreurs); // On met à jour les erreurs

    // On vérifie si le formulaire est valide en vérifiant s'il n'y a pas d'erreurs et si le formulaire est valide selon les règles de validation de HTML 5 (required, type, etc.).
    return (
      formRef.current.checkValidity() &&
      Object.keys(nouvellesErreurs).length === 0
    );
  }

  /**
   * Fonction qui permet de soumettre le formulaire de modification d'un livre
   * @param {*} e
   */
  async function onSubmit(e) {
    e.preventDefault();
    const formulaireValide = validerFormulaire();
    try {
      if (formulaireValide) {
        let url = import.meta.env.VITE_DEV_URL;

        if (import.meta.env.VITE_MODE == "PRODUCTION") {
          url = import.meta.env.VITE_PROD_URL;
        }

        const objDonnees = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jeton}`,
          },
          body: JSON.stringify(donneesLivre),
        };

        const reponse = await fetch(`${url}/livres/${id}`, objDonnees);
        const resultat = await reponse.json();
        if (reponse.ok) {
          navigate(`/livres/${id}`);
        } else {
          setMessage(resultat.message);
        }
      }
    } catch (erreur) {
      setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  }

  return (
    <form
      action=""
      onSubmit={onSubmit}
      ref={formRef}
      className="isolate px-6 mb-[100px] mt-[150px]"
    >
      <div className="mx-auto max-w-2xl space-y-12 mt-[100px]">
        <div className="border-b border-neutral-50 pb-12">
          <h1 className="text-2xl">Modifier un livre</h1>
          <p className="mt-1 text-sm/6 text-gray-400">
            Veuillez entrer les informations requises
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="titre" className="block text-sm/6">
                Titre <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-red-400">
                  <input
                    id="titre"
                    name="titre"
                    type="text"
                    placeholder="Entrez le titre du livre"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    onChange={onInputChange}
                    value={d(donneesLivre.titre)}
                  />
                </div>
                {erreurs.titre && (
                  <div className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                    {erreurs.titre}
                  </div>
                )}
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
                  rows={15}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  onChange={onInputChange}
                  value={d(donneesLivre.description)}
                />
              </div>
              {erreurs.description && (
                <div className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.description}
                </div>
              )}

              <p className="mt-3 text-sm/6 text-gray-400">
                Écrivez la description du livre
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-neutral-50 pb-12">
          <h2 className="text-lg">Informations détaillées du livre</h2>
          <p className="mt-1 text-sm/6 text-gray-400">
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
                  onChange={onInputChange}
                  value={d(donneesLivre.editeur)}
                />
              </div>
              {erreurs.editeur && (
                <div className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.editeur}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="auteur" className="block text-sm/6">
                Auteur <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="auteur"
                  name="auteur"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  onChange={onInputChange}
                  value={d(donneesLivre.auteur)}
                />
              </div>
              {erreurs.auteur && (
                <div className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.auteur}
                </div>
              )}
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="isbn" className="block text-sm/6">
                ISBN <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  onChange={onInputChange}
                  value={d(donneesLivre.isbn)}
                />
              </div>
              {erreurs.isbn && (
                <div className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.isbn}
                </div>
              )}
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="date" className="block text-sm/6">
                Année de publication
              </label>
              <div className="mt-2">
                <input
                  id="date"
                  name="date"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  onChange={onInputChange}
                  value={d(donneesLivre.date)}
                />
              </div>
              {erreurs.date && (
                <div className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.date}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm/6">
                Image <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  onChange={onInputChange}
                  value={d(donneesLivre.image)}
                />
              </div>
              {erreurs.image && (
                <p className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.image}
                </p>
              )}
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
                  onChange={onInputChange}
                  value={d(donneesLivre.pages)}
                  min="0"
                />
              </div>
              {erreurs.pages && (
                <p className="border rounded-md mt-1 p-3 bg-red-100 text-red-900">
                  {erreurs.pages}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION CATÉGORIES - CHECKBOXES */}
        <div className="border-b border-neutral-50 pb-12 ">
          <h2 className="text-lg ">Catégories</h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Veuillez choisir un choix minimum parmi ces catégories.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-md text-gray-400">Genres</legend>
              <div className="mt-6 space-y-6vmt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="categorie-thriller"
                        value="Thriller"
                        type="checkbox"
                        onChange={onCategorieChange}
                        checked={categories.includes("Thriller")}
                        aria-describedby="categorie-thriller"
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
                    <label htmlFor="categorie-thriller" className="font-medium">
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
                        checked={categories.includes("Policier")}
                        aria-describedby="categorie-policier"
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
                    <label htmlFor="categorie-policier" className="font-medium">
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
                        checked={categories.includes("Science Fiction")}
                        aria-describedby="categorie-science-fiction"
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
                    <label
                      htmlFor="categorie-science-fiction"
                      className="font-medium"
                    >
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
                        checked={categories.includes("Drame")}
                        aria-describedby="categorie-drame"
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
                    <label htmlFor="categorie-drame" className="font-medium">
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
                        checked={categories.includes("Politique")}
                        aria-describedby="categorie-politique"
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
                    <label
                      htmlFor="categorie-politique"
                      className="font-medium"
                    >
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
                        checked={categories.includes("Litterature Americaine")}
                        aria-describedby="categorie-litterature-americaine"
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
                    <label
                      htmlFor="categorie-litterature-americaine"
                      className="font-medium"
                    >
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
                        checked={categories.includes("Horreur")}
                        aria-describedby="categorie-horreur"
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
                    <label htmlFor="categorie-horreur" className="font-medium">
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
                        checked={categories.includes("Fantastique")}
                        aria-describedby="categorie-fantastique"
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
                    <label
                      htmlFor="categorie-fantastique"
                      className="font-medium"
                    >
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
                        checked={categories.includes("Litterature quebecoise")}
                        aria-describedby="categorie-litterature-quebecoise"
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
                    <label
                      htmlFor="categorie-litterature-quebecoise"
                      className="font-medium"
                    >
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
        <input
          type="submit"
          className="rounded-md bg-yellow-700 px-3 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          value="Sauvegarder"
        />
        <Link to={`/livres/${id}`} className="text-sm/6">
          Retour au livre
        </Link>
      </div>

      {/* Message */}
      {message ? (
        <div className="border rounded-md p-3 mt-3 ">
          <p>{message}</p>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}

export default FormModifierLivre;
