import Accueil from "./Accueil";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect } from "vitest";

//La librairie framer-motion (qui est souvent appelée Motion.js) utilise IntersectionObserver en interne pour gérer les animations basées sur la visibilité d'un élément (ex. whileInView).Pourquoi il y a des erreurs avec Vitest ?
// Vitest ne fournit pas de IntersectionObserver par défaut dans son environnement de test (JSDOM ne l'implémente pas). Du coup, quand on utilise whileInView ou d'autres animations qui reposent sur IntersectionObserver, Vitest plante en disant qu'il ne reconnaît pas cette API.
// Solution: mocker IntersectionObserver dans tes tests avant d'exécuter le code. 
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Accueil", () => {
    it("rend correctement les titres et descriptions des fonctionnalités", () => {
        render(<Accueil />);
        expect(screen.getByText("Bienvenue sur Libra System")).toBeInTheDocument();
        expect(screen.getByText("Fonctionnalités Clés")).toBeInTheDocument();
    });
});