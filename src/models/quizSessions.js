const mongoose = require('mongoose');

const QuizSessionSchema = new mongoose.Schema({
  quizRef: {
    type: mongoose.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  userRef: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quiz: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  answers: {
    _id: false,
    type: [{
      question: Number,
      answers: [Number],
    }],
  },
  quizState: {
    type: String,
    enum: ['IN_PROGRESS', 'COMPLETED'],
    message: '{VALUE} is not supported',
  },
  score: {
    type: Number,
  },
  questionScores: {
    _id: false,
    type: [{
      question: Number,
      score: Number,
    }],
  },
});

module.exports = mongoose.model('QuizSession', QuizSessionSchema);
