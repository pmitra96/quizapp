import {createSchemaValidator} from '../schema/schemaValidator';

const signUpSchema = {
  'type': 'object',
  'default': {},
  'title': 'Signup Schema',
  'required': [
    'username',
    'email',
    'password',
  ],
  'properties': {
    'username': {
      'type': 'string',
      'default': '',
      'title': 'The username Schema',
      'examples': [
        'Alice',
      ],
    },
    'email': {
      'type': 'string',
      'default': '',
      'title': 'The email Schema',
      'examples': [
        'Alice@gmail.com',
      ],
    },
    'password': {
      'type': 'string',
      'default': '',
      'title': 'The password Schema',
      'examples': [
        'Alice123',
      ],
    },
  },
  'examples': [{
    'username': 'Alice',
    'email': 'Alice@gmail.com',
    'password': 'Alice123',
  }],
};

const loginSchema = {
  'type': 'object',
  'default': {},
  'title': 'Login Schema',
  'required': [
    'email',
    'password',
  ],
  'properties': {
    'email': {
      'type': 'string',
      'default': '',
      'title': 'The email Schema',
      'examples': [
        'Alice@gmail.com',
      ],
    },
    'password': {
      'type': 'string',
      'default': '',
      'title': 'The password Schema',
      'examples': [
        'Alice123',
      ],
    },
  },
  'examples': [{
    'email': 'Alice@gmail.com',
    'password': 'Alice123',
  }],
};

module.exports = {signUpSchemaValidator: createSchemaValidator(signUpSchema),
  loginSchemaValidator: createSchemaValidator(loginSchema)};
