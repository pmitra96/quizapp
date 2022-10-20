/* eslint-disable guard-for-in */
import QuizSessionModel from '../models/quizSessions';
import QuizModel from '../models/quizzes';
import {computeCorrectnessPercentage} from '../services/scoring';
import _ from 'lodash';

const create = async ({user, quizId, answers}) => {
  try {
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      throw Error('Quiz not found');
    }
    const quizState = 'IN_PROGRESS';
    const newQuizSession = {quizRef: quizId,
      userRef: user.id,
      quiz: quizId,
      user: user.id,
      answers, quizState};
    const exitsingQuizSession = await QuizSessionModel.
        find({quiz: quizId, user: user.id});
    console.log(exitsingQuizSession);
    if (exitsingQuizSession.length > 0) {
      throw new Error('A quiz session already exists');
    }
    const quizSession = await QuizSessionModel.create(newQuizSession);
    const quizSessionId = quizSession.id;
    return {quizSessionId};
  } catch (error) {
    throw Error(error.message);
  }
};

const validateAnswers = ({quiz, answers}) => {
  const answerMap = {};
  for (const index in answers) {
    const answer = answers[index];
    answerMap[answer.question] = answer.answers;
  }
  let isValidAnswerSet = true;
  for (const idx in quiz.questions) {
    const question = quiz.questions[idx];
    if (!question.isMultiple) {
      const ans = answerMap[question.sNo] ?? [];
      if (ans.length == 0) {
        return true;
      }
      if (ans) {
        const isValidAnswer = ans.length == 1 &&
        ans[0] >= 1 &&
         ans[0] <= question.options.length;
        isValidAnswerSet = isValidAnswerSet && isValidAnswer;
      }
    } else {
      const ans = answerMap[question.sNo];
      if (ans.length == 0) {
        isValidAnswerSet = isValidAnswerSet && isValidAnswer;
      }
      if (ans) {
        const isValidAnswer = _.every(ans, (a) => {
          return a >= 1 && a <= question.options.length;
        });
        isValidAnswerSet = isValidAnswerSet &&
         ans.length <= question.options.length && isValidAnswer;
      }
    }
  }
  return isValidAnswerSet;
};

const updateAnswers = async ({user, id, answers}) => {
  // A quiz can be updated only if the created user
  // is same as the user issuing an edit request.
  try {
    const quizSession = await QuizSessionModel.findById(id).populate('quizRef');
    if (!quizSession) {
      throw new Error('Cannot update because the quiz session is not found');
    }
    if (quizSession.quizState == 'COMPLETED') {
      throw new Error('Cannot updated answers to a submitted');
    }
    if (quizSession.user != user.id) {
      throw new Error('Unauthorized operation');
    }
    const quiz = quizSession.quizRef;
    const isAnswerFormatValid = validateAnswers({quiz, answers});
    if (isAnswerFormatValid) {
      // eslint-disable-next-line no-unused-vars
      const _updatedQuizSession =
      await QuizSessionModel.findByIdAndUpdate(id, {answers});
      return {quizSessionId: id};
    } else {
      throw new
      Error('Multiple choices are selected for a single answer question');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const get = async ({id}) => {
  try {
    const quizSession = await QuizSessionModel.findById(id);
    return {quizSession};
  } catch (error) {
    throw new Error(error.message);
  }
};

const getQuizzesAnsweredByUser = async ({user}) => {
  try {
    const result = await QuizSessionModel.
        find({user: user.id, quizState: 'COMPLETED'})
        .populate('quizRef');
    console.log(result);
    if (result.length == 0 || result == undefined || result == null) {
      return {result: []};
    }
    const [{score: CorrectnessScore, questionScores,
      quizState, quizRef: {title, _id}, answers}] = result;
    return {result: [{score: CorrectnessScore, questionScores,
      quizState, quizTitle: title, quizId: _id, answers}]};
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOngoingForUser = async ({user}) => {
  try {
    const result = await QuizSessionModel.
        find({user: user.id, quizState: 'IN_PROGRESS'})
        .populate('quizRef');
    console.log(result);
    if (result.length == 0 || result == undefined || result == null) {
      return {result: []};
    }
    const [{score: CorrectnessScore, questionScores,
      quizState, quizRef: {title, _id}, answers}] = result;
    return {result: [{score: CorrectnessScore, questionScores,
      quizState, quizTitle: title, quizId: _id, answers}]};
  } catch (error) {
    throw new Error(error.message);
  }
};

const submit = async ({user, id}) => {
  try {
    const quizSession = await QuizSessionModel.findById(id).populate('quizRef');
    if (!quizSession) {
      throw new Error('Quiz session not found');
    }
    if (quizSession.quizState == 'COMPLETED') {
      throw new Error('Cannot submit a quiz which is already submitted');
    }
    if (quizSession.user != user.id) {
      throw new Error('Unauthorized operation');
    }
    const quiz = quizSession.quizRef;
    const answers = quizSession.answers;
    const {score, questionScoreList} =
    computeCorrectnessPercentage({quiz, answers});
    const result = await QuizSessionModel.findByIdAndUpdate(id,
        {score, quizState: 'COMPLETED', questionScores: questionScoreList},
        {quiz: 1,
          user: 1,
          answers: 1, quizState: 1, questionScores: 1, score: 1, new: true}).
        populate('quizRef');
    const {score: CorrectnessScore, questionScores,
      quizState, quizRef: {title, _id}, answers: userAnswers} = result;
    return {result: {CorrectnessScore, questionScores,
      quizState, quizTitle: title, quizId: _id, userAnswers}};
  } catch (error) {
    throw new Error(error.message);
  }
};

// get the responses to all the quizzes published by this user
const getResponsesForQuizzesCreatedByUser = async ({user}) => {
  try {
    const userQuizzes = await QuizModel.find({createdBy: user.id}, {_id: 1});
    if (userQuizzes.length == 0 ||
      userQuizzes == undefined ||
      userQuizzes == null) {
      return {quizSessions: []};
    }
    const userQuizzesIds = userQuizzes.map(({_id: quizObjId})=>{
      return quizObjId.toString();
    });
    const quizSessions = await QuizSessionModel.
        find({quiz: {$in: userQuizzesIds}}).populate('userRef').
        populate('quizRef');
    const [{userRef: {username, _id}, quizRef: {title: quizTitle, _id: quizId},
      score, questionScores, title, answers}] = quizSessions;
    return {quizSessions: [{user: {username, _id}, quiz: {quizTitle, quizId},
      score, questionScores, title, answers}]};
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  get,
  create,
  updateAnswers,
  getQuizzesAnsweredByUser,
  submit,
  validateAnswers,
  getResponsesForQuizzesCreatedByUser,
  getOngoingForUser,
};
