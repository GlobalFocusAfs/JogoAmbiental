export default function Menu() {
  return (
    <nav className="menu">
      <a href="#dashboard">🏠 Início</a>
      <a href="#desafios">🎯 Desafios</a>
      <a href="#ranking">🏆 Ranking</a>

      <div className="credits">
        <span className="credits-copyright">© Paulo Eric e Francinho</span>
        <span className="credits-author">Francionho</span>
        <img
          className="credits-avatar"
          src="https://dinopixel.com/mimikyu-pixel-art-17382"
          loading="lazy"
        />
      </div>
    </nav>
  );
}

