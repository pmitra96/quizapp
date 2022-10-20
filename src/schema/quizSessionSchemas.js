import {createSchemaValidator} from '../schema/schemaValidator';

const createQuizSessionSchma = {
  'type': 'object',
  'default': {},
  'title': 'Create Quiz Schema',
  'required': [
    'quizId',
  ],
  'properties': {
    'quizId': {
      'type': 'string',
      'default': '',
      'title': 'The quizId Schema',
      'examples': [
        '632b4f5386b52c9af9839529',
      ],
    },
  },
  'examples': [{
    'quizId': '632b4f5386b52c9af9839529',
  }],
};

const submitQuizSessionSchma = {
  'type': 'object',
  'default': {},
  'title': 'Create Quiz Schema',
  'required': [
    'quizSessionId',
  ],
  'properties': {
    'quizSessionId': {
      'type': 'string',
      'default': '',
      'title': 'The quizSessionId Schema',
      'examples': [
        '632b4f5386b52c9af9839529',
      ],
    },
  },
  'examples': [{
    'quizSessionId': '632b4f5386b52c9af9839529',
  }],
};

const updateAnswersSchema = {
  'type': 'object',
  'default': {},
  'title': 'Root Schema',
  'required': [
    'id',
    'answers',
  ],
  'properties': {
    'id': {
      'type': 'string',
      'default': '',
      'title': 'The id Schema',
    },
    'answers': {
      'type': 'array',
      'default': [],
      'title': 'The answers Schema',
      'items': {
        'type': 'object',
        'title': 'A Schema',
        'required': [
          'question',
          'answers',
        ],
        'properties': {
          'question': {
            'type': 'integer',
            'title': 'The question Schema',
          },
          'answers': {
            'type': 'array',
            'title': 'The answers Schema',
            'items': {
              'type': 'integer',
              'title': 'A Schema',
            },
          },
        },
      },
    },
  },
  'examples': [{
    'id': '632b5d1e3ae4ddafcf2ca357',
    'answers': [{
      'question': 1,
      'answers': [
        1,
      ],
    },
    {
      'question': 2,
      'answers': [
        1,
        2,
        3,
      ],
    }],
  }],
};

module.exports = {
  createQuizSessionSchema: createSchemaValidator(createQuizSessionSchma),
  updateAnswersSchema: createSchemaValidator(updateAnswersSchema),
  submitQuizSessionSchma: createSchemaValidator(submitQuizSessionSchma),
};
