const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  trees: { type: Number, default: 0 },
  recyclings: { type: Number, default: 0 },
  walks: { type: Number, default: 0 },
  mood: { type: String, default: null },
  lastMissionDate: { type: String, default: null },
  missionCompleted: { type: Boolean, default: false },
  challenges: {
    recycle: { type: Boolean, default: false },
    walk: { type: Boolean, default: false },
    water: { type: Boolean, default: false },
    lastChallengeDate: { type: String, default: null }
  }
});

module.exports = mongoose.model('User', UserSchema);
