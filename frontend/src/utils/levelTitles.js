export function getTitleByLevel(nivel) {
  const lvl = Number.isFinite(Number(nivel)) ? Number(nivel) : 0;

  // Ajuste para deixar os níveis mais fáceis de alcançar:
  // “adianta” a progressão dos títulos com uma escala menor.
  const escalado = Math.ceil(lvl * 0.7);

  if (escalado <= 10) return '🌱 Iniciante Verde';
  if (escalado <= 20) return '🍃 Aprendiz Sustentável';
  if (escalado <= 30) return '🌿 Guardião Ambiental';
  if (escalado <= 40) return '🌳 Protetor da Natureza';
  if (escalado <= 50) return '♻️ Mestre da Reciclagem';
  if (escalado <= 60) return '🌎 Embaixador EcoMente';
  if (escalado <= 70) return '🧠 Mestre do Equilíbrio';
  if (escalado <= 80) return '🚀 Líder da Transformação';
  if (escalado <= 90) return '⭐ Lenda Sustentável';
  if (escalado <= 99) return '💎 Guardião Supremo';

  return '👑 Lenda EcoMente';
}

