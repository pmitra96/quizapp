/* eslint-disable max-len */
import {authenticate} from '../middleware/auth';
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
import {createQuiz, updateQuiz, removeQuiz, getQuiz, getAllQuizzes, getAllQuizzesByUser, publishQuiz} from '../controllers/quizzes';

// Add user crud end points
router.get('/', authenticate(), getAllQuizzes);
router.get('/my-quizzes', authenticate(), getAllQuizzesByUser);
router.get('/:id', authenticate(), getQuiz);
router.post('/', authenticate(), createQuiz);
router.put('/:id', authenticate(), updateQuiz);
router.put('/publish/:id', authenticate(), publishQuiz);
router.delete('/:id', authenticate(), removeQuiz);

module.exports = router;
