
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/livres">Liste des livres</NavLink>

        {/* <NavLink href="#">Ajouter un livre</NavLink>
        <NavLink href="#">S'inscrire</NavLink>
        <NavLink href="#">Mon profil</NavLink> */}
    </nav>
  );
}

export default Nav;