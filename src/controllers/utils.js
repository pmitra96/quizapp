const valiateReq = ({req, schemaValidator}) => {
  const valid = schemaValidator(req.body);
  if (!valid) {
    return schemaValidator.errors.map((error) => error.message);
  } else {
    return null;
  }
};

module.exports = {
  valiateReq,
};
