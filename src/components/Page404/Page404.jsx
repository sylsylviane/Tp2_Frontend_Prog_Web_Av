import React from 'react'
import { Helmet } from 'react-helmet-async';

function Page404() {
  return (
    <>
    <Helmet>
      <title>Libra System - Page 404</title>
      <meta name="description" content="Page non trouvée" />
      <meta name="keywords" content="Erreur 404, page non trouvée" />
    </Helmet>
      <div>Page404</div>
    </>
  );
}

export default Page404