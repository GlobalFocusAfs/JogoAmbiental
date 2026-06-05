const XP_PER_LEVEL = 500;

function getLevelFromXP(xp) {
  const safeXp = Number.isFinite(Number(xp)) ? Number(xp) : 0;
  return Math.floor(safeXp / XP_PER_LEVEL) + 1;
}

function getProgressToNextLevel(xp) {
  const safeXp = Number.isFinite(Number(xp)) ? Number(xp) : 0;
  const level = getLevelFromXP(safeXp);
  const levelStart = (level - 1) * XP_PER_LEVEL;
  const levelEnd = level * XP_PER_LEVEL;
  const inLevel = safeXp - levelStart;
  return Math.max(0, Math.min(100, (inLevel / (levelEnd - levelStart)) * 100));
}

module.exports = {
  XP_PER_LEVEL,
  getLevelFromXP,
  getProgressToNextLevel,
};

