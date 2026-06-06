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
      case 'addTree':
        user.trees += 1;
        user.points += 15;
        creditXPAndRecalc(user, 15);
        break;
      case 'addRecycle':
        user.recyclings += 1;
        user.points += 10;
        creditXPAndRecalc(user, 10);
        break;
      case 'addWalk':
        user.walks += 1;
        user.points += 12;
        creditXPAndRecalc(user, 12);
        break;
      case 'completeMission': {
        // Garante que a missão do dia só possa ser completada UMA vez por dia.
        // (mood/ajustes continuam funcionando, mas não repetem a recompensa se já foi feita hoje)
        if (user.lastMissionDate === today) {
          return res.status(400).json({ error: 'Missão já concluída hoje' });
        }

        user.trees += 1;
        user.points += 50;
        creditXPAndRecalc(user, 50);

        if (user.mood === 'ansioso') {
          user.walks += 1;
          user.points += 10;
          creditXPAndRecalc(user, 10);
        }
        if (user.mood === 'feliz') {
          user.recyclings += 1;
          user.points += 5;
          creditXPAndRecalc(user, 5);
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

        if (incrementField === 'points') {
          user.points += points;
          creditXPAndRecalc(user, points);
        } else {
          user[incrementField] += 1;
          user.points += points;
          creditXPAndRecalc(user, points);
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

