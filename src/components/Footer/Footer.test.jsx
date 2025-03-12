//Importer le composant
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect } from "vitest";

describe("Footer", () => {
    it("should have the current year", () => {  
        const annee = new Date().getFullYear();
        render(<Footer />);
        expect(
          screen.getByText(`${annee} Libra System inc. Tous droits réservés.`)
        ).toBeInTheDocument();
});
});