/* eslint-disable comma-dangle */
import {get,
  create,
  updateAnswers,
  getQuizzesAnsweredByUser,
  submit,
  getResponsesForQuizzesCreatedByUser,
  getOngoingForUser} from '../services/quizSessions';
import {valiateReq} from './utils';
import {createQuizSessionSchema,
  updateAnswersSchema,
  submitQuizSessionSchma} from '../schema/quizSessionSchemas';

const createQuizSession = async (req, res, next) => {
  try {
    const user = req.user;
    const errors = valiateReq({req,
      schemaValidator: createQuizSessionSchema});
    if (errors) {
      res.status(400).json({errors: errors});
    }
    const {quizId, answers} = req.body;
    const {quizSessionId} = await create({user, quizId, answers});
    res.json({sessionId: quizSessionId, response: 'success'});
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};

const updateQuizAnswers = async (req, res, next) => {
  try {
    const user = req.user;
    const errors = valiateReq({req,
      schemaValidator: updateAnswersSchema});
    if (errors) {
      res.status(400).json({errors: errors});
    }
    const {id, answers} = req.body;
    const {quizSessionId} = await updateAnswers({user, id, answers});
    res.json({quizSessionId});
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};

const getQuizSession = async (req, res, next) => {
  try {
    const user = req.user;
    const {id} = req.params.id;
    const quizSession = await get({user, id});
    res.json({quizSession});
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};

const getQuizzes = async (req, res, next) => {
  try {
    const user = req.user;
    const {result} = await getQuizzesAnsweredByUser({user});
    res.json({result});
  } catch (error) {
    res.status(500).json({error: error.message});
    next(error);
  }
};

const getOngoingQuizzes = async (req, res, next) => {
  try {
    const user = req.user;
    const {result} = await getOngoingForUser({user});
    res.json({result});
  } catch (error) {
    res.status(500).json({error: error.message});
    next(error);
  }
};

const getCreatorDashboard = async (req, res, next) => {
  try {
    const user = req.user;
    const {quizSessions} = await getResponsesForQuizzesCreatedByUser({user});
    res.json({quizSessions});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const sumbmitQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const errors = valiateReq({req,
      schemaValidator: submitQuizSessionSchma});
    if (errors) {
      res.status(400).json({errors: errors});
    }
    const {quizSessionId} = req.body;
    const {result} = await submit({user, id: quizSessionId});
    res.json({result});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = {
  updateQuizAnswers,
  createQuizSession,
  getQuizSession,
  getQuizzes,
  sumbmitQuiz,
  getCreatorDashboard,
  getOngoingQuizzes
};
