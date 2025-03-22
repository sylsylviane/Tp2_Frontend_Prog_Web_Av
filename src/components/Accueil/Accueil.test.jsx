import Accueil from "./Accueil";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, it, expect } from "vitest";

// Ajouter un mock pour IntersectionObserver pour éviter les erreurs
// lors de l'exécution des tests
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