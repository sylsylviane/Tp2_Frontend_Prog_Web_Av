import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import he from "he";

// Composant qui permet d'afficher la carte d'un livre dans la liste des livres (Composant ListeLivres)
function CarteLivre(props) {
  const { livre = { id: "", titre: "" } } = props;
  // Fonction qui permet de décoder les caractères HTML
  const d = (text) => he.decode(text);
  let navigate = useNavigate();

  // Fonction qui permet de naviguer vers la page de détail d'un livre
  function cliqueCarte(event) {
    const declencheur = event.currentTarget;
    navigate(`/livres/${declencheur.id}`);
  }

  // Définition des états de la carte d'un livre (normal et survol) et des animations associées
  const etats = {
    normal: {},
    survol: {},
  };
  const etatImage = {
    normal: { rotateY: 0, zIndex: 1, transition: { duration: 0.5 } },
    survol: { rotateY: 180, zIndex: 0, transition: { duration: 0.5 } },
  };
  const etatTexte = {
    normal: {
      opacity: 0,
      rotateY: 180,
      zIndex: 0,
      transition: { duration: 0.5 },
    },
    survol: {
      opacity: 1,
      rotateY: 0,
      zIndex: 1,
      transition: { duration: 0.5 },
    },
  };

  // Afficher la carte d'un livre
  return (
    <motion.div
      initial="normal"
      whileHover="survol"
      exit="normal"
      variants={etats}
      className="relative min-h-[550px] min-w-[350px] max-w-[400px] overflow-hidden cursor-pointer "
      key={`livre-${livre.id}`}
      onClick={cliqueCarte}
      id={livre.id}
    >
      <div className="carteLivre absolute min-h-[549px] min-w-[349px]">
        <motion.img
          src={`img/${livre.image}`}
          alt="{livre.titre}"
          className="absolute top-0 w-full h-full object-cover rounded-sm"
          variants={etatImage}
        />
        <motion.div
          className="carteEnvers absolute bg-neutral-50 top-0 p-4 w-full h-full rounded-lg"
          variants={etatTexte}
        >
          <h2 className="text-lg font-[700] text-gray-500 pb-2">
            {d(livre.titre)}
          </h2>
          <p className="text-sm font-[500] text-gray-500 mb-1">
            {d(livre.auteur)}
          </p>
          <p className="w-full text-sm text-gray-500 overflow-y-hidden line-clamp-15">
            {d(livre.description)}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
export default CarteLivre;
