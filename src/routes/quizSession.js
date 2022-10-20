import {authenticate} from '../middleware/auth';
import {updateQuizAnswers,
  createQuizSession,
  getQuizSession,
  getQuizzes,
  sumbmitQuiz,
  getCreatorDashboard,
  getOngoingQuizzes} from '../controllers/quizSessions';
import express from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/stats', authenticate(), getQuizzes);
router.get('/in-progress', authenticate(), getOngoingQuizzes);
router.get('/dashboard', authenticate(), getCreatorDashboard);
router.get('/:id', authenticate(), getQuizSession);
router.post('/', authenticate(), createQuizSession);
router.put('/answers', authenticate(), updateQuizAnswers);
router.put('/submit', authenticate(), sumbmitQuiz);

module.exports = router;
