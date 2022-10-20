/* eslint-disable max-len */
import {validateQuiz} from '../src/services/quizzes';
import {expect} from 'chai';
import _ from 'lodash';
import {narutoQuiz} from './mockData';

describe('Quizzes', () => {
  describe('validateQuiz()', () => {
    it('should return true', () => {
      const result = validateQuiz({quiz: narutoQuiz});
      expect(result).to.equal(true);
    });
    it('should return false', () => {
      const quizClone = _.cloneDeep(narutoQuiz);
      quizClone.questions[1].isMultiple = false;
      const result = validateQuiz({quiz: quizClone});
      expect(result).to.equal(false);
    });
    it('should return false when there are no correct answers', () => {
      const quizClone = _.cloneDeep(narutoQuiz);
      quizClone.questions[0].options[1].isCorrect = false;
      const result = validateQuiz({quiz: quizClone});
      expect(result).to.equal(false);
    });
    it('should return false when single answer question has multiple correct answers', () => {
      const quizClone = _.cloneDeep(narutoQuiz);
      quizClone.questions[0].options[1].isCorrect = true;
      quizClone.questions[0].options[0].isCorrect = true;
      quizClone.questions[0].options[0].isCorrect = true;
      const result = validateQuiz({quiz: quizClone});
      expect(result).to.equal(false);
    });
    it('should throw error if 2 questions have same serial number', () => {
      const quizClone = _.cloneDeep(narutoQuiz);
      quizClone.questions[0].sNo = quizClone.questions[1].sNo;
      try {
        validateQuiz({quiz: quizClone});
      } catch (error) {
        expect(error.message).to.
            equal('The Questions have duplicate serial numbers');
      }
    });
    it('should throw error if 2 options have same serial number', () => {
      const quizClone = _.cloneDeep(narutoQuiz);
      quizClone.questions[0].options[0].sNo =
      quizClone.questions[0].options[1].sNo;
      try {
        validateQuiz({quiz: quizClone});
      } catch (error) {
        expect(error.message).to.
            equal('The options form question 1 duplicate serial numbers');
      }
    });
  });
});
