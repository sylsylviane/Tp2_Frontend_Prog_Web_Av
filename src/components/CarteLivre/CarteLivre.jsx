// IMPORTER LES STYLES CSS DE LA CARTE D'UN LIVRE ICI

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import he from "he";
// Composant qui permet d'afficher la carte d'un livre
function CarteLivre(props) {
  const {livre = {id: "", titre: ""}} = props;
  const d = (text) => he.decode(text);
  let navigate = useNavigate()

  // Fonction qui permet de naviguer vers la page de détail d'un livre
  function cliqueCarte(event) {
    const declencheur = event.currentTarget;
    navigate(`/livres/${declencheur.id}`);
  }

  // Afficher la carte d'un livre
  return (
    <motion.div
      whileHover={{ rotateY: 180, transition: { duration: 0.5 } }}
      className="relative"
      key={`livre-${livre.id}`}
      onClick={cliqueCarte}
      id={livre.id}
    >
      <img
        src={`img/${livre.image}`}
        alt="{livre.titre}"
        className="w-full h-full object-cover"
      />
      <div className="absolute bg-neutral-50 top-0 p-4 w-full h-full rotate-y-180 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-lg font-bold text-gray-500 pb-2">{d(livre.titre)}</h2>
        <p className="text-sm text-gray-500 mb-1">{d(livre.auteur)}</p>
        <p className="w-full text-sm text-gray-500 overflow-y-hidden line-clamp-15">{d(livre.description)}</p>
      </div>
    </motion.div>
  );
}
export default CarteLivre;
