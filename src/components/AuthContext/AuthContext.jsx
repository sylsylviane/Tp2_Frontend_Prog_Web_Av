import { createContext, useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(); // Create a context object for authentication data storage and sharing between components and pages in the application.
 
function AuthContextProvider( props) {
  const { children } = props;
  let [jeton, setJeton] = useState(null);
  let [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const jetonSauvegarde = localStorage.getItem('jeton');
    if (jetonSauvegarde && validerJeton(jetonSauvegarde)) {
      setJeton(jetonSauvegarde);
    } else {
      deconnexion();
    }
  }, []);

  useEffect(() => {
    if(validerJeton(jeton)){
      const {courriel, mdp } = jwtDecode(jeton);
      setUtilisateur({courriel, mdp});
    }else{
      setUtilisateur(null);
    }
  }, [jeton]);

  function validerJeton(jeton){
    if(!jeton){
      return false;
    }
    try{
      const decoded = jwtDecode(jeton);
      return decoded.exp * 1000 > Date.now();
    }catch{erreur}
    return false;
  }

  function check(){
    const jetonSauvegarde = localStorage.getItem('jeton');
    if (jetonSauvegarde && validerJeton(jetonSauvegarde)) {
      setJeton(jetonSauvegarde);
    } else {
      deconnexion();
    }
  }

  function connexion(nouveauJeton){
    if(validerJeton(nouveauJeton)){
      //Enregistrer le jeton dans le stockage local  
      localStorage.setItem('jeton', nouveauJeton)
      setJeton(nouveauJeton)
    }
  }
  function deconnexion(){
    //Supprimer le jeton du stockage local
    localStorage.removeItem('jeton');
    setJeton(null);
  }

  return (
    <AuthContext.Provider value={{ jeton, utilisateur, validerJeton, connexion, deconnexion }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContextProvider