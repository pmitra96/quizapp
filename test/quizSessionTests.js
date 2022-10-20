/* eslint-disable max-len */
import {validateAnswers} from '../src/services/quizSessions';
import {expect} from 'chai';
import _ from 'lodash';
import {narutoQuiz} from './mockData';

const answers = [
  {
    question: 1,
    answers: [2],
  },
  {
    question: 2,
    answers: [1, 2, 3],
  },
  {
    question: 3,
    answers: [1],
  },
];

describe('Answer validation tests', () => {
  describe('validateAnswers()', () => {
    it('When all the answers are valid', () => {
      const isValid = validateAnswers({quiz: narutoQuiz, answers});
      expect(isValid).to.be.equal(true);
    });
    it('when multiple options are selected for a single answer questions', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[0].answers = [1, 2, 3];
      const isValid = validateAnswers({quiz: narutoQuiz, answers: answersClone});
      expect(isValid).to.be.equal(false);
    });
    it('when single answer is selected for multiple questions', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[1].answers = [1];
      const isValid = validateAnswers({quiz: narutoQuiz, answers: answersClone});
      expect(isValid).to.be.equal(true);
    });
    it('when selected answer is not valid', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[1].answers = [7];
      const isValid = validateAnswers({quiz: narutoQuiz, answers: answersClone});
      expect(isValid).to.be.equal(false);
    });
  });
});
