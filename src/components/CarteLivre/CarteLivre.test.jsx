import CarteLivre from "./CarteLivre";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  return {
    useNavigate: vi.fn(),
  };
});

describe("CarteLivre", () => {
  const livreTest = {
    id: 1,
    titre: "Le Trône de fer T.01 L'intégrale",
    description:
      "Après avoir tué le monarque dément Aerys II Targayen, Robert Baratheon est devenu le souverain du royaume des Sept couronnes.",
    editeur: "J'ai lu",
    isbn: "9782290019436",
    pages: "785",
    date: "2010",
    image: "trone-fer.jpg",
    categories: ["Fantastique"],
    auteur: "George R R Martin",
  };

  it("should exist"),
    () => {
      const { container } = render(<CarteLivre livre={livreTest} />);
      const { containerLivre } = container.querySelector(".carteLivre");
      const { containerImage } = containerLivre.querySelector("img");
      expect(containerLivre).toBeInTheDocument();
      expect(containerImage.src).toContain("trone-fer.jpg");
    };

  it("should navigate to the book details page when clicked"),
    async () => {
      const mockedNavigate = vi.fn();
      useNavigate.mockReturnValue(mockedNavigate);

      const { container } = render(<CarteLivre livre={livreTest} />);
      const { containerLivre } = container.querySelector(".carteLivre");
      await userEvent.click(containerLivre);
      expect(mockedNavigate).toHaveBeenCalledWith("/livres/1");
    };

    it("should display the book title"),
    () => {
      const { container } = render(<CarteLivre livre={livreTest} />);
      const { containerEnversLivre } = container.querySelector(".carteEnvers");
      const { containerTitre } = containerEnversLivre.querySelector("h2");
      expect(containerTitre).toHaveTextContent("Le Trône de fer T.01 L'intégrale");
    };

    it("should display the book author"),
    () => {
      const { container } = render(<CarteLivre livre={livreTest} />);
      const { containerEnversLivre } = container.querySelector(".carteEnvers");
      const { containerAuteur } = containerEnversLivre.querySelector("p");
      expect(containerAuteur).toHaveTextContent("George R R Martin");
    };

        it("should display the book description"),
          () => {
            const { container } = render(<CarteLivre livre={livreTest} />);
            const { containerEnversLivre } =
              container.querySelector(".carteEnvers");
            const { containerDescription } = containerEnversLivre.querySelector("p");
            expect(containerAuteur).toHaveTextContent(
              "Après avoir tué le monarque dément Aerys II Targayen, Robert Baratheon est devenu le souverain du royaume des Sept couronnes."
            );
          };
});
