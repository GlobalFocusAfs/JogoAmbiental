const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  // Legado (mantido para compatibilidade do ranking e ações antigas)
  points: { type: Number, default: 0 },
  trees: { type: Number, default: 0 },
  recyclings: { type: Number, default: 0 },
  walks: { type: Number, default: 0 },

  // Bem-estar / humor
  mood: { type: String, default: null },
  moodHistory: [{ date: { type: String }, mood: { type: String } }],

  // Evolução (novo)
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  achievements: { type: [String], default: [] },

  // Jardim virtual (fase posterior, mas deixamos estrutura mínima)
  garden: {
    trees: { type: Number, default: 0 },
    lastWatered: { type: Date },
  },

  // Legado de missão do dia (mantido para não quebrar)
  lastMissionDate: { type: String, default: null },
  missionCompleted: { type: Boolean, default: false },

  // Impacto (limite diário por tipo)
  impact: {
    date: { type: String, default: null },
    treesMarked: { type: Number, default: 0 },
    recyclesMarked: { type: Number, default: 0 },
    walksMarked: { type: Number, default: 0 },
  },

  challenges: {
    recycle: { type: Boolean, default: false },
    walk: { type: Boolean, default: false },
    water: { type: Boolean, default: false },
    lastChallengeDate: { type: String, default: null },
  },
});

module.exports = mongoose.model('User', UserSchema);

