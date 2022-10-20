

const computeWeightsForQuestion = ({question}) => {
  let correctWeight = 0;
  let wrongWeight = 0;
  if (question.isMultiple) {
    let numCorrect = 0;
    let numWrong = 0;
    for (const option of question.options) {
      if (option.isCorrect) {
        numCorrect += 1;
      } else {
        numWrong += 1;
      }
    }
    correctWeight = 1 / numCorrect;
    wrongWeight = -1 / numWrong;
  } else {
    correctWeight = 1;
    wrongWeight = -1;
  }
  return {correctWeight, wrongWeight};
};

const computeCorrectnessPercentage = ({quiz, answers}) => {
  // max score for each question is 1
  const totalAchievableScore = quiz.questions.length;
  const {score, questionScoreList} = computeScore({quiz, answers});
  const correctnessScore = (score/totalAchievableScore);
  return {score: correctnessScore*100, questionScoreList};
};

const computeScore = ({quiz, answers}) => {
  const answerMap = {};
  for (const answer of answers) {
    answerMap[answer.question] = answer.answers;
  }
  const questionScoreList = [];
  let score = 0;
  for (const question of quiz.questions) {
    const {correctWeight, wrongWeight} = computeWeightsForQuestion({question});
    const optionsMap = {};
    for (const option of question.options) {
      optionsMap[option.sNo] = option.isCorrect;
    }
    const answerForQuestion = answerMap[question.sNo];
    let selCorrect = 0;
    let selWrong = 0;
    for (const ans of answerForQuestion) {
      if (optionsMap[ans] == true) {
        selCorrect += 1;
      } else {
        selWrong += 1;
      }
    }
    const questionScore = correctWeight * selCorrect + wrongWeight * selWrong;
    questionScoreList.push({question: question.sNo, score: questionScore});
    score = score + questionScore;
  }
  return {score, questionScoreList};
};


module.exports = {
  computeWeightsForQuestion,
  computeScore,
  computeCorrectnessPercentage,
};
