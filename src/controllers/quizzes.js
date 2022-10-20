import {create, update, remove,
  get, getAll, getQuizzesCreatedByUser, publish} from '../services/quizzes';
import {createQuizSchemaValidator} from '../schema/quizSchemas';
import {valiateReq} from './utils';

require('dotenv').config();
const createQuiz = async (req, res, next) => {
  try {
    const createdBy = req.user.id;
    const errors = valiateReq({req,
      schemaValidator: createQuizSchemaValidator});
    if (errors) {
      res.status(400).json({errors: errors});
    }
    const {title, questions, isPublished} = req.body;
    const {quizId} = await create({createdBy, title, questions, isPublished});
    res.json({quizId: quizId});
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};

const updateQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const errors = valiateReq({req,
      schemaValidator: createQuizSchemaValidator});
    if (errors) {
      res.status(400).json({errors: errors});
    }
    const {title, questions, isPublished} = req.body;
    const {quizId} = await update({user, id, title, questions, isPublished});
    res.json({'quizId': quizId});
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};

const publishQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const {quizId} = await publish({user, id});
    res.json({'quizId': quizId});
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};


const getAllQuizzes = async (req, res, next) => {
  try {
    const {allQuizzes} = await getAll();
    res.json({allQuizzes});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const getAllQuizzesByUser = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    const {allQuizzes} = await getQuizzesCreatedByUser({user});
    res.json({allQuizzes});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {quiz} = await get(id);
    res.json(quiz);
  } catch (error) {
    res.status(error.code ? error.code : 500).json({error: error.message});
  }
};

const removeQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const {success} = await remove({user, id});
    res.json(success);
  } catch (error) {
    res.status(403).json({error: error.message});
  }
};

module.exports = {
  createQuiz,
  updateQuiz,
  getQuiz,
  removeQuiz,
  getAllQuizzes,
  getAllQuizzesByUser,
  publishQuiz,
};
