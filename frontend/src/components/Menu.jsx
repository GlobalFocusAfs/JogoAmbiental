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
          src="https://dinopixel.com/wp-content/uploads/2024/07/mimikyu-pixel-art.png"
          alt="Francionho"
          loading="lazy"
        />
      </div>
    </nav>
  );
}

