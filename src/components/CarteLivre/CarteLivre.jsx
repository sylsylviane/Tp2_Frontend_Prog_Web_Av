// IMPORTER LES STYLES CSS DE LA CARTE D'UN LIVRE ICI

import { useNavigate } from "react-router-dom";

// Composant qui permet d'afficher la carte d'un livre
function CarteLivre(props) {
  const {livre = {id: "", titre: ""}} = props;
  
  let navigate = useNavigate()

  // Fonction qui permet de naviguer vers la page de détail d'un livre
  function cliqueCarte(event) {
    const declencheur = event.currentTarget;
    navigate(`/livres/${declencheur.id}`);
  }

  // Afficher la carte d'un livre
  return (
    <div key={`livre-${livre.id}`} onClick={cliqueCarte} id={livre.id}>
      <img
        src={`img/${livre.image}`}
        alt="{livre.titre}"
        className="w-full h-full rounded-sm"
      />
    </div>
  );
}
export default CarteLivre;
