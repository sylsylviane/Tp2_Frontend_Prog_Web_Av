
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/livres">Liste des livres</NavLink>
      <NavLink to="livres/ajout">Ajouter un livre</NavLink>
    </nav>
  );
}

export default Nav;