import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(); // Create a context object for authentication data storage and sharing between components and pages in the application.
 
function AuthContextProvider( props) {
  const { children } = props;
  let [jeton, setJeton] = useState(null);
  useEffect(() => {
    const jetonSauvegarde = localStorage.getItem('jeton');
    if (jetonSauvegarde && validerJeton(jetonSauvegarde)) {
      setJeton(jetonSauvegarde);
    } else {
      deconnexion();
    }
  }, []);

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
    <AuthContext.Provider value={{ jeton, validerJeton, connexion, deconnexion }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContextProvider