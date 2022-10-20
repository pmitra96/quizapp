import Ajv from 'ajv';

const createSchemaValidator = (schema) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return validate;
};

module.exports = {
  createSchemaValidator,
};
