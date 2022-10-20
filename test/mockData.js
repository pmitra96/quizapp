const narutoQuiz = {
  'title': 'Naruto quiz',
  'questions': [
    {
      'sNo': 1,
      'title': 'Who is Naruto\'s first sensei',
      'options': [{
        'sNo': 1,
        'text': 'Minato',
        'isCorrect': false,
      },
      {
        'sNo': 2,
        'text': 'Iruka sensei',
        'isCorrect': true,
      },
      {
        'sNo': 3,
        'text': 'Azuma sensei',
        'isCorrect': false,
      },
      ],
    },
    {
      'sNo': 2,
      'title': 'Who are in team 7',
      'isMultiple': true,
      'options': [{
        'sNo': 1,
        'text': 'sasuke',
        'isCorrect': true,
      },
      {
        'sNo': 2,
        'text': 'Sakura',
        'isCorrect': true,
      },
      {
        'sNo': 3,
        'text': 'Naruto',
        'isCorrect': true,
      },
      {
        'sNo': 4,
        'text': 'Shikamaru',
        'isCorrect': false,
      },
      ],
    },
    {
      'sNo': 3,
      'title': 'Who is naruto\'s god father',
      'options': [{
        'sNo': 1,
        'text': 'Jiraya',
        'isCorrect': true,
      },
      {
        'sNo': 2,
        'text': 'Yamato',
        'isCorrect': false,
      },
      ],
    },
  ],
  'isPublished': true,
};

module.exports = {
  narutoQuiz,
};
