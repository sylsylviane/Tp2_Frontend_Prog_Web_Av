// IMPORTER LES STYLES CSS DE LA CARTE D'UN LIVRE ICI

import { useNavigate } from "react-router-dom";

function CarteLivre(props) {
  const {livre = {id: "", titre: ""}} = props;
  
  let navigate = useNavigate()

  function cliqueCarte(event) {
    const declencheur = event.currentTarget;
    navigate(`/livres/${declencheur.id}`);
  }
  return (
    <div key={`livre-${livre.id}`} onClick={cliqueCarte} id={livre.id}>     
      <img src={`img/${livre.image}`} alt="{livre.titre}" />
    </div>
  );
}
export default CarteLivre;
