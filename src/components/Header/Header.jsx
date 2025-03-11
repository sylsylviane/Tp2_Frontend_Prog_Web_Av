import Nav from "../Nav/Nav";

function Header() {
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <Nav />
      </header>
    </div>
  );
}

export default Header;
