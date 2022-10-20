/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import mongoose from 'mongoose';
import QuizModel from '../models/quizzes';

class QuizNotFoundError extends Error {}
class UnAuthorizedQuizOperation extends Error {}
class QuizValidationError extends Error {}


const get = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid quiz id');
  }
  const quiz = await QuizModel.findById(id, {title: 1, questions: 1, isPublished: 1});
  if (!quiz) {
    const error = new Error('Quiz with id not found');
    error.code = 404;
    throw error;
  }
  const {questions} = quiz;
  for (const question of questions) {
    for (const option of question.options) {
      option.isCorrect = undefined;
    }
  }
  return {quiz};
};

const validateQuiz = ({quiz}) => {
  const questionNos = quiz.questions.map((question) => {
    return question.sNo;
  });
  if (questionNos.length >= 10) {
    throw new QuizValidationError(`Max limit ${10} reached for questions`);
  }
  // check if sNos are unique
  if (new Set(questionNos).size !== questionNos.length) {
    throw new QuizValidationError('The Questions have duplicate serial numbers');
  }
  for (const question of quiz.questions) {
    const optionNos = question.options.map((option) => {
      return option.sNo;
    });
    if (optionNos.length == 0) {
      throw new QuizValidationError('A question must have atleast 1 option');
    }
    if (new Set(optionNos).size !== optionNos.length) {
      throw new QuizValidationError(`The options form question ${question.sNo} duplicate serial numbers`);
    }
    const numCorrect = question.options.reduce(
        (n, option) => option.isCorrect == true ? n+1 : n, 0);
    if (numCorrect == 0) {
      return false;
    }
    if (!question.isMultiple) {
      if (numCorrect > 1 || numCorrect == 0) {
        return false;
      }
    }
  }
  return true;
};

const create = async ({createdBy, title, questions, isPublished}) => {
  try {
    const quiz = {createdBy, title, questions, isPublished};
    if (validateQuiz({quiz})) {
      const newQuiz = await QuizModel.create(quiz);
      const quizId = newQuiz.id;
      return {quizId};
    } else {
      throw new QuizValidationError('Quiz validation failed');
    }
  } catch (error) {
    throw Error(error.message);
  }
};

const update = async ({user, id, questions, isPublished}) => {
  // A quiz can be updated only if the created user
  // is same as the user issuing an edit request.
  try {
    const quiz = await QuizModel.findById(id);
    if (!quiz) {
      throw new QuizNotFoundError('Cannot update because the quiz is not found');
    }
    if (quiz.createdBy != user.id) {
      throw new UnAuthorizedQuizOperation('This user is not authorized to modify the quiz');
    }
    if (quiz.isPublished==true) {
      throw new UnAuthorizedQuizOperation('The quiz cannot be modified because it is alredy published');
    }
    const newQuiz = {questions, isPublished};
    if (validateQuiz({quiz: newQuiz})) {
      await QuizModel.findByIdAndUpdate(id, {questions, isPublished});
      return {quizId: id};
    } else {
      throw new Error('A single answer question has multiple answers');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const publish = async ({user, id}) => {
  try {
    const quiz = await QuizModel.findById(id);
    if (!quiz) {
      throw new QuizNotFoundError('Cannot update because the quiz is not found');
    }
    if (quiz.createdBy != user.id) {
      throw new UnAuthorizedQuizOperation('This user is not authorized to modify the quiz');
    }
    if (quiz.isPublished==true) {
      throw new UnAuthorizedQuizOperation('The quiz cannot be modified because it is alredy published');
    }
    await QuizModel.findByIdAndUpdate(id, {isPublished: true});
    return {quizId: id};
  } catch (error) {
    throw new Error(error.message);
  }
};

const remove = async ({user, id}) => {
  try {
    const quiz = await QuizModel.findById(id);
    if (!quiz) {
      throw new QuizNotFoundError('Cannot remove because the quiz is not found');
    }
    if (quiz.createdBy != user.id) {
      throw new UnAuthorizedQuizOperation('This user is not authorized to modify the quiz');
    }
    await QuizModel.findByIdAndRemove(id);
    return {message: 'quiz deleted successfully'};
  } catch (error) {
    throw new QuizNotFoundError(error.message);
  }
};

const getAll = async () => {
  try {
    // return only published quizzes
    const allQuizzes = await QuizModel.find({isPublished: true}, {title: 1});
    return {allQuizzes};
  } catch (error) {
    throw new Error(error.message);
  }
};

// find all the quizzes which are created by the given user
const getQuizzesCreatedByUser = async ({user}) => {
  try {
    const allQuizzes = await QuizModel.find({createdBy: user.id}, {title: 1});
    return {allQuizzes};
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
  getAll,
  getQuizzesCreatedByUser,
  validateQuiz,
  publish,
};
