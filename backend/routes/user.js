const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getLevelFromXP, getProgressToNextLevel } = require('../utils/leveling');

function creditXPAndRecalc(user, xpDelta) {
  const safeDelta = Number.isFinite(Number(xpDelta)) ? Number(xpDelta) : 0;
  user.xp = (user.xp || 0) + safeDelta;
  user.level = getLevelFromXP(user.xp);
  return user;
}

function getMinXpForLevel(level) {
  const lvl = Number.isFinite(Number(level)) ? Number(level) : 1;
  // level = floor(xp / XP_PER_LEVEL) + 1
  // => xp_min = (level - 1) * XP_PER_LEVEL
  const XP_PER_LEVEL = 500;
  return Math.max(0, (lvl - 1) * XP_PER_LEVEL);
}


router.post('/init', async (req, res) => {
  const { name } = req.body;
  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name });
      await user.save();
    } else {
      // migração suave: se já existe e campos novos vieram nulos, normaliza
      if (typeof user.xp !== 'number') user.xp = 0;
      if (typeof user.level !== 'number') user.level = getLevelFromXP(user.xp);
      if (!user.moodHistory) user.moodHistory = [];
      if (!user.garden) user.garden = { trees: 0, lastWatered: null };

      // Impacto (limite diário)
      if (!user.impact) {
        user.impact = {
          date: null,
          treesMarked: 0,
          recyclesMarked: 0,
          walksMarked: 0,
        };
      } else {
        if (typeof user.impact.treesMarked !== 'number') user.impact.treesMarked = 0;
        if (typeof user.impact.recyclesMarked !== 'number') user.impact.recyclesMarked = 0;
        if (typeof user.impact.walksMarked !== 'number') user.impact.walksMarked = 0;
        if (typeof user.impact.date !== 'string') user.impact.date = null;
      }

      await user.save();
    }
    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/mood', async (req, res) => {
  const { name, mood } = req.body;
  try {
    const today = new Date().toDateString();

    const user = await User.findOneAndUpdate(
      { name },
      {
        mood,
        $push: { moodHistory: { date: today, mood } },
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/action', async (req, res) => {
  const { name, actionType } = req.body;
  try {
    let user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const today = new Date().toDateString();

    switch (actionType) {
      case 'addTree': {
        // Limite diário: 5 marcações/dia por usuário (tipo independente)
        if (user.impact?.date !== today) {
          user.impact = {
            date: today,
            treesMarked: 0,
            recyclesMarked: 0,
            walksMarked: 0,
          };
        }

        const used = user.impact?.treesMarked || 0;
        if (used >= 5) {
          return res.status(400).json({ error: 'Limite diário de 🌳 atingido (5/5).' });
        }

        user.trees += 1;
        user.points += 15;
        creditXPAndRecalc(user, 15 * 10);

        user.impact.treesMarked = used + 1;
        break;
      }
      case 'addRecycle': {
        // Limite diário: 5 marcações/dia por usuário (tipo independente)
        if (user.impact?.date !== today) {
          user.impact = {
            date: today,
            treesMarked: 0,
            recyclesMarked: 0,
            walksMarked: 0,
          };
        }

        const used = user.impact?.recyclesMarked || 0;
        if (used >= 5) {
          return res.status(400).json({ error: 'Limite diário de ♻️ atingido (5/5).' });
        }

        user.recyclings += 1;
        user.points += 10;
        creditXPAndRecalc(user, 10 * 10);

        user.impact.recyclesMarked = used + 1;
        break;
      }
      case 'addWalk': {
        // Limite diário: 5 marcações/dia por usuário (tipo independente)
        if (user.impact?.date !== today) {
          user.impact = {
            date: today,
            treesMarked: 0,
            recyclesMarked: 0,
            walksMarked: 0,
          };
        }

        const used = user.impact?.walksMarked || 0;
        if (used >= 5) {
          return res.status(400).json({ error: 'Limite diário de 🚶 atingido (5/5).' });
        }

        user.walks += 1;
        user.points += 12;
        creditXPAndRecalc(user, 12 * 10);

        user.impact.walksMarked = used + 1;
        break;
      }
      case 'completeMission': {
        // Garante que a missão do dia só possa ser completada UMA vez por dia.
        // (mood/ajustes continuam funcionando, mas não repetem a recompensa se já foi feita hoje)
        if (user.lastMissionDate === today) {
          return res.status(400).json({ error: 'Missão já concluída hoje' });
        }

        user.trees += 1;
        user.points += 50;

        // Missão do Dia: pular exatamente +9 níveis
        const currentLevel = user.level || getLevelFromXP(user.xp);
        const targetLevel = currentLevel + 9;
        const minXpForTarget = getMinXpForLevel(targetLevel);
        const xpDelta = Math.max(0, minXpForTarget - (user.xp || 0));
        creditXPAndRecalc(user, xpDelta);

        // Extras pelo humor continuam funcionando (mantendo regra de 1x/dia)
        if (user.mood === 'ansioso') {
          user.walks += 1;
          user.points += 10;
          creditXPAndRecalc(user, 10 * 10);
        }
        if (user.mood === 'feliz') {
          user.recyclings += 1;
          user.points += 5;
          creditXPAndRecalc(user, 5 * 10);
        }

        user.lastMissionDate = today;
        user.missionCompleted = true;
        break;
      }
      case 'completeChallenge': {
        const { challengeType, points, incrementField } = req.body;

        // Garante que TODOS os desafios diários (cada tipo) só possam ser completados UMA vez por dia.

        if (user.challenges.lastChallengeDate !== today) {
          user.challenges.recycle = false;
          user.challenges.walk = false;
          user.challenges.water = false;
          user.challenges.lastChallengeDate = today;
        }

        const alreadyDone = user.challenges[challengeType];
        if (alreadyDone) {
          return res.status(400).json({ error: 'Desafio já concluído hoje' });
        }

        // XP dos desafios diários: creditar a quantidade EXATA para subir +2 níveis
        // (ou seja, levar o usuário até o XP mínimo do nível-alvo)
        const currentLevel = user.level || getLevelFromXP(user.xp);
        const targetLevel = currentLevel + 2;
        const minXpForTarget = getMinXpForLevel(targetLevel);
        const xpToCredit = Math.max(0, minXpForTarget - (user.xp || 0));

        if (incrementField === 'points') {
          user.points += points;
          creditXPAndRecalc(user, xpToCredit);
        } else {
          user[incrementField] += 1;
          user.points += points;
          creditXPAndRecalc(user, xpToCredit);
        }


        user.challenges[challengeType] = true;
        break;
      }
      default:
        return res.status(400).json({ error: 'Ação inválida' });
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

