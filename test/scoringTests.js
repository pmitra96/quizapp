/* eslint-disable max-len */
import {computeScore, computeCorrectnessPercentage} from '../src/services/scoring';
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


describe('Scoring', () => {
  describe('computeScore()', () => {
    it('should return complete score when all are correct', () => {
      const {score} = computeScore({quiz: narutoQuiz, answers});
      expect(score).to.equal(3);
    });
    it('should deduct negative marks for wrong single answers', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[0].answers = [1];
      const {score} = computeScore({quiz: narutoQuiz, answers: answersClone});
      expect(score).to.equal(1);
    });
    it('should compute weightage properly and award negative marks', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[1].answers = [1, 2, 4];
      const {score} = computeScore({quiz: narutoQuiz, answers: answersClone});
      expect(score).to.be.approximately(1.66, 0.01);
    });
    it('The total score can go below zero', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[1].answers = [1, 2, 4];
      answersClone[0].answers = [3];
      const {score} = computeScore({quiz: narutoQuiz, answers: answersClone});
      expect(score).to.be.approximately(-0.33, 0.01);
    });
  });
});

describe('verify the correctness of score computed for each question', () => {
  describe('computeCorrectnessPercentage()', () => {
    it('should compute correctness percentage for each question accurately', () => {
      const answersClone = _.cloneDeep(answers);
      answersClone[1].answers = [1, 2, 4];
      answersClone[0].answers = [3];
      const {questionScoreList} = computeCorrectnessPercentage({quiz: narutoQuiz, answers: answersClone});
      expect(questionScoreList).to.eql([{question: 1, score: -1},
        {question: 2, score: -0.33333333333333337},
        {question: 3, score: 1}]);
    });
  });
});


describe('Scoring scenarios in single question', () => {
  describe('computeScore()', () => {
    const temperatureQuestion = {
      'title': 'Quiz on temperature',
      'isPublished': true,
      'questions': [{
        'sNo': 1,
        'text': 'Temperature is measured on',
        'isMultiple': true,
        'options': [
          {
            'sNo': 1,
            'text': 'Kelvin',
            'isCorrect': true,

          },
          {
            'sNo': 2,
            'text': 'Fahrenheit',
            'isCorrect': true,
          },
          {
            'sNo': 3,
            'text': 'Gram',
            'isCorrect': false,
          },
          {
            'sNo': 4,
            'text': 'Celsius',
            'isCorrect': true,
          },
          {
            'sNo': 5,
            'text': 'Liters',
            'isCorrect': false,
          },
        ],
      }],
    };
    it('should return complete score when all are correct', () => {
      const answers = [{
        'question': 1,
        'answers': [1, 2, 4],
      }];
      const {score} = computeScore({quiz: temperatureQuestion, answers});
      expect(score).to.equal(1);
    });
    it('should compute score correctly if partial answers are given', () => {
      const answers = [{
        'question': 1,
        'answers': [1, 2],
      }];
      const {score} = computeScore({quiz: temperatureQuestion, answers});
      expect(score).to.be.approximately(0.66, 0.01);
    });
    it('should compute score correctly if both correct and wrong answers are included', () => {
      const answers = [{
        'question': 1,
        'answers': [1, 2, 3],
      }];
      const {score} = computeScore({quiz: temperatureQuestion, answers});
      expect(score).to.be.approximately(0.166, 0.01);
    });
    it('should compute score correctly if both correct and wrong answers are included : case 2', () => {
      const answers = [{
        'question': 1,
        'answers': [1, 2, 3, 5, 4],
      }];
      const {score} = computeScore({quiz: temperatureQuestion, answers});
      expect(score).to.equal(0);
    });
    it('should compute score correctly if only wrong options are picked', () => {
      const answers = [{
        'question': 1,
        'answers': [3, 5],
      }];
      const {score} = computeScore({quiz: temperatureQuestion, answers});
      expect(score).to.equal(-1);
    });
  });
});
