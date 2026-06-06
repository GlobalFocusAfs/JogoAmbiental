export default function Menu() {
  return (
    <nav className="menu">
      <a href="#dashboard">🏠 Início</a>
      <a href="#desafios">🎯 Desafios</a>
      <a href="#ranking">🏆 Ranking</a>

      <div className="credits">
        <span className="credits-copyright">© Paulo Eric e Francinho</span>
        <img
          className="credits-avatar"
          src="/Mimikyu/mimikyu.png"
          loading="lazy"
        />
      </div>
    </nav>
  );
}

