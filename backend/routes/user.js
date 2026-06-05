const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/init', async (req, res) => {
  const { name } = req.body;
  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name });
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
    const user = await User.findOneAndUpdate(
      { name },
      { mood },
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
        break;
      case 'addRecycle':
        user.recyclings += 1;
        user.points += 10;
        break;
      case 'addWalk':
        user.walks += 1;
        user.points += 12;
        break;
      case 'completeMission':
        if (user.lastMissionDate === today && user.missionCompleted) {
          return res.status(400).json({ error: 'Missão já concluída hoje' });
        }
        user.trees += 1;
        user.points += 50;
        if (user.mood === 'ansioso') {
          user.walks += 1;
          user.points += 10;
        }
        if (user.mood === 'feliz') {
          user.recyclings += 1;
          user.points += 5;
        }
        user.missionCompleted = true;
        user.lastMissionDate = today;
        break;
      case 'completeChallenge': {
        const { challengeType, points, incrementField } = req.body;
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
        } else {
          user[incrementField] += 1;
          user.points += points;
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
