import { useEffect, useState, useRef } from "react";
// AJOUTER STYLE CSS ICI

// Composant qui permet d'ajouter un livre à la base de données 
function FormAjoutLivre() {
    // Référence au formulaire
    const formRef = useRef();

    const [categories, setCategories] = useState([]);
    const [donneesLivre, setDonneesLivre] = useState({
        titre:"",
        description:"",
        editeur:"",
        isbn:"",
        pages:"",
        date:"",
        image:"",
        categories:[],
        auteur:""
    })

    // Gestion des messages d'erreur
    const [message, setMessage] = useState("");

    // Récupérer les catégories de la base de données pour les afficher dans le formulaire d'ajout de livre 
    useEffect(() => {
        const donnees = {...donneesLivre, categories};
        setDonneesLivre(donnees);
    }, [categories]);

    // Fonction qui permet de gérer les changements dans les champs du formulaire
    function onInputChange(e) {
        const champ = e.currentTarget;
        const nom = champ.name;
        const valeur = champ.value; 
        const nouvellesValeurs = {...donneesLivre, [nom]: valeur};
        setDonneesLivre(nouvellesValeurs);
    }

    // Fonction qui permet de gérer les changements dans les catégories du formulaire
    function onCategorieChange(e){
        const checkbox = e.currentTarget;
        const valeur = checkbox.value;
        const estCoche = checkbox.checked;
        let nouvellesCategories = [...categories];

        // Si la catégorie est cochée et n'est pas déjà dans le tableau, on l'ajoute
        // Si la catégorie n'est pas cochée et est déjà dans le tableau, on la retire
        if(estCoche && !nouvellesCategories.includes(valeur)){
            nouvellesCategories.push(valeur);
        } else if(!estCoche && nouvellesCategories.includes(valeur)){
            nouvellesCategories = nouvellesCategories.filter((categorie) => {
                // On garde toutes les catégories sauf celle qui est décochée
                return categorie !== valeur;
            });
        }
        // On met à jour les catégories
        setCategories(nouvellesCategories);
    }

    // Fonction qui permet de gérer la soumission du formulaire 
    async function onSubmit(e){
        e.preventDefault();
        // Vérifier que le formulaire est valide
        if(formRef.current.checkValidity()){
            let url = import.meta.env.VITE_DEV_URL;

            if (import.meta.env.VITE_MODE == "PRODUCTION") {
              url = import.meta.env.VITE_PROD_URL;
            }

            // On prépare les données à envoyer
            const objDonnees = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donneesLivre),
            };
            // On envoie les données
            const reponse = await fetch(`${url}/livres`, objDonnees);
            // On récupère les données de la réponse
            await reponse.json();

            // On affiche un message en fonction de la réponse
            if(reponse.ok){
                setMessage("Le livre a été ajouté avec succès");
                setTimeout(() => {
                    setMessage("");
                }, 2000)
            }else{
                setMessage("Une erreur s'est produite lors de l'ajout du livre");
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            }
        }
    }

    return (
      <>
        <h1>Ajouter un livre</h1>
        {message ? <p>{message}</p> : ""}
        <form action="" onSubmit={onSubmit} ref={formRef}>
          <div>
            <label htmlFor="titre">Titre</label>
            <input
              type="text"
              name="titre"
              onChange={onInputChange}
              id="titre"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={onInputChange}
              id="description"
            ></textarea>
          </div>
          <div>
            <label htmlFor="editeur">Editeur</label>
            <input
              type="text"
              name="editeur"
              onChange={onInputChange}
              id="editeur"
            />
          </div>
          <div>
            <label htmlFor="isbn">ISBN</label>
            <input type="text" name="isbn" onChange={onInputChange} id="isbn" />
          </div>
          <div>
            <label htmlFor="pages">Nombre de pages</label>
            <input
              type="number"
              name="pages"
              onChange={onInputChange}
              id="pages"
            />
          </div>
          <div>
            <label htmlFor="date">Date de publication</label>
            <input type="text" name="date" onChange={onInputChange} id="date" />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              onChange={onInputChange}
              id="image"
            />
          </div>
          <fieldset>
            <legend>Catégories</legend>
            <label htmlFor="categorie-thriller">Thriller</label>
            <input
              type="checkbox"
              id="categorie-thriller"
              value="Thriller"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-policier">Policier</label>
            <input
              type="checkbox"
              id="categorie-policier"
              value="Policier"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-science-fiction">Science-Fiction</label>
            <input
              type="checkbox"
              id="categorie-science-fiction"
              value="Science Fiction"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-drame">Drame</label>
            <input
              type="checkbox"
              id="categorie-drame"
              value="Drame"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-politique">Politique</label>
            <input
              type="checkbox"
              id="categorie-politique"
              value="Politique"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-litterature-americaine">
              Littérature Américaine
            </label>
            <input
              type="checkbox"
              id="categorie-litterature-americaine"
              value="Litterature Americaine"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-horreur">Horreur</label>
            <input
              type="checkbox"
              id="categorie-horreur"
              value="Horreur"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-fantastique">Fantastique</label>
            <input
              type="checkbox"
              id="categorie-fantastique"
              value="Fantastique"
              onChange={onCategorieChange}
            />
            <label htmlFor="categorie-litterature-quebecoise">
              Littérature québécoise
            </label>
            <input
              type="checkbox"
              id="categorie-litterature-quebecoise"
              value="Littérature québécoise"
              onChange={onCategorieChange}
            />
          </fieldset>
          <div>
            <label htmlFor="auteur">Auteur</label>
            <input
              type="text"
              name="auteur"
              onChange={onInputChange}
              id="auteur"
            />
          </div>
          <input type="submit" value="Ajouter un livre" />
        </form>
      </>
    );
}

export default FormAjoutLivre;
