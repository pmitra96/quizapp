import {createSchemaValidator} from '../schema/schemaValidator';

const createQuizSchema = {
  'type': 'object',
  'default': {},
  'title': 'Create Quiz Schema',
  'required': [
    'title',
    'questions',
    'isPublished',
  ],
  'properties': {
    'title': {
      'type': 'string',
      'default': '',
      'title': 'The title Schema',
      'examples': [
        'One piece Quiz',
      ],
    },
    'questions': {
      'type': 'array',
      'default': [],
      'title': 'The questions Schema',
      'items': {
        'type': 'object',
        'title': 'A Schema',
        'required': [
          'sNo',
          'title',
          'options',
          'isMultiple',
        ],
        'properties': {
          'sNo': {
            'type': 'integer',
            'title': 'The sNo Schema',
            'examples': [
              1,
              2,
            ],
          },
          'title': {
            'type': 'string',
            'title': 'The title Schema',
            'examples': [
              'Who gave luffy the straw hat',
              'Who all are in luffy\'s crew',
            ],
          },
          'options': {
            'type': 'array',
            'title': 'The options Schema',
            'items': {
              'type': 'object',
              'title': 'A Schema',
              'required': [
                'sNo',
                'text',
                'isCorrect',
              ],
              'properties': {
                'sNo': {
                  'type': 'integer',
                  'title': 'The sNo Schema',
                  'examples': [
                    1,
                    2,
                    3,
                    4,
                  ],
                },
                'text': {
                  'type': 'string',
                  'title': 'The text Schema',
                  'examples': [
                    'black beard',
                    'White beard',
                    'Shanks',
                    'Zoro',
                    'Nami',
                    'Chopper',
                    'law',
                  ],
                },
                'isCorrect': {
                  'type': 'boolean',
                  'title': 'The isCorrect Schema',
                  'examples': [
                    false,
                    true,
                  ],
                },
              },
              'examples': [{
                'sNo': 1,
                'text': 'black beard',
                'isCorrect': false,
              },
              {
                'sNo': 2,
                'text': 'White beard',
                'isCorrect': false,
              },
              {
                'sNo': 3,
                'text': 'Shanks',
                'isCorrect': true,
              },
              {
                'sNo': 1,
                'text': 'Zoro',
                'isCorrect': true,
              },
              {
                'sNo': 2,
                'text': 'Nami',
                'isCorrect': true,
              },
              {
                'sNo': 3,
                'text': 'Chopper',
                'isCorrect': true,
              },
              {
                'sNo': 4,
                'text': 'law',
                'isCorrect': false,
              }],
            },
            'examples': [
              [{
                'sNo': 1,
                'text': 'black beard',
                'isCorrect': false,
              },
              {
                'sNo': 2,
                'text': 'White beard',
                'isCorrect': false,
              },
              {
                'sNo': 3,
                'text': 'Shanks',
                'isCorrect': true,
              }],
              [{
                'sNo': 1,
                'text': 'Zoro',
                'isCorrect': true,
              },
              {
                'sNo': 2,
                'text': 'Nami',
                'isCorrect': true,
              },
              {
                'sNo': 3,
                'text': 'Chopper',
                'isCorrect': true,
              },
              {
                'sNo': 4,
                'text': 'law',
                'isCorrect': false,
              }],
            ],
          },
          'isMultiple': {
            'type': 'boolean',
            'default': false,
            'title': 'The isMultiple Schema',
            'examples': [
              true,
            ],
          },
        },
        'examples': [{
          'sNo': 1,
          'title': 'Who gave luffy the straw hat',
          'options': [{
            'sNo': 1,
            'text': 'black beard',
            'isCorrect': false,
          },
          {
            'sNo': 2,
            'text': 'White beard',
            'isCorrect': false,
          },
          {
            'sNo': 3,
            'text': 'Shanks',
            'isCorrect': true,
          }],
        },
        {
          'sNo': 2,
          'title': 'Who all are in luffy\'s crew',
          'isMultiple': true,
          'options': [{
            'sNo': 1,
            'text': 'Zoro',
            'isCorrect': true,
          },
          {
            'sNo': 2,
            'text': 'Nami',
            'isCorrect': true,
          },
          {
            'sNo': 3,
            'text': 'Chopper',
            'isCorrect': true,
          },
          {
            'sNo': 4,
            'text': 'law',
            'isCorrect': false,
          }],
        }],
      },
      'examples': [
        [{
          'sNo': 1,
          'title': 'Who gave luffy the straw hat',
          'options': [{
            'sNo': 1,
            'text': 'black beard',
            'isCorrect': false,
          },
          {
            'sNo': 2,
            'text': 'White beard',
            'isCorrect': false,
          },
          {
            'sNo': 3,
            'text': 'Shanks',
            'isCorrect': true,
          }],
        },
        {
          'sNo': 2,
          'title': 'Who all are in luffy\'s crew',
          'isMultiple': true,
          'options': [{
            'sNo': 1,
            'text': 'Zoro',
            'isCorrect': true,
          },
          {
            'sNo': 2,
            'text': 'Nami',
            'isCorrect': true,
          },
          {
            'sNo': 3,
            'text': 'Chopper',
            'isCorrect': true,
          },
          {
            'sNo': 4,
            'text': 'law',
            'isCorrect': false,
          }],
        }],
      ],
    },
    'isPublished': {
      'type': 'boolean',
      'default': false,
      'title': 'The isPublished Schema',
      'examples': [
        false,
      ],
    },
  },
  'examples': [{
    'title': 'One piece Quiz',
    'questions': [{
      'sNo': 1,
      'title': 'Who gave luffy the straw hat',
      'options': [{
        'sNo': 1,
        'text': 'black beard',
        'isCorrect': false,
      },
      {
        'sNo': 2,
        'text': 'White beard',
        'isCorrect': false,
      },
      {
        'sNo': 3,
        'text': 'Shanks',
        'isCorrect': true,
      }],
    },
    {
      'sNo': 2,
      'title': 'Who all are in luffy\'s crew',
      'isMultiple': true,
      'options': [{
        'sNo': 1,
        'text': 'Zoro',
        'isCorrect': true,
      },
      {
        'sNo': 2,
        'text': 'Nami',
        'isCorrect': true,
      },
      {
        'sNo': 3,
        'text': 'Chopper',
        'isCorrect': true,
      },
      {
        'sNo': 4,
        'text': 'law',
        'isCorrect': false,
      }],
    }],
    'isPublished': false,
  }],
};


module.exports = {
  createQuizSchemaValidator: createSchemaValidator(createQuizSchema),
};
