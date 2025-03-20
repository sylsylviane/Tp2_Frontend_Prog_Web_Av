import FormAjoutLivre from "./FormAjoutLivre";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";

// Mock de useNavigate pour éviter les erreurs lors de l'exécution des tests.
vi.mock("react-router-dom", () => ({
  // Fonction vide pour simuler useNavigate
  useNavigate: vi.fn(),
}));

describe("FormAjoutLivre", () => {
  it("affiche le formulaire d'ajout de livre", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(<FormAjoutLivre />);
    expect(document.querySelector("form")).toBeInTheDocument();
  });
});
