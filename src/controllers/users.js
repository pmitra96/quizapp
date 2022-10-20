
import {authenticate,
  find,
  create,
  IncorrectPasswordError} from '../services/users';
import {signUpSchemaValidator,
  loginSchemaValidator} from '../schema/userSchemas';
import {valiateReq} from './utils';

const handleSignup = async (req, res, next) => {
  try {
    const errors = valiateReq({req, schemaValidator: signUpSchemaValidator});
    if (errors) {
      res.status(400).json({errors: errors});
      return;
    }
    const {username, email, password} = req.body;
    const user = await find({email});
    if (user) {
      res.status(409).json({'error': 'user already exists'});
      return;
    }
    const {token} = await create({email, username, password});
    res.json({token});
  } catch (error) {
    res.status(500).json({'error': error});
    next(error);
  }
};

const handleLogin = async (req, res, next) => {
  try {
    const errors = valiateReq({req, schemaValidator: loginSchemaValidator});
    if (errors) {
      res.status(400).json({errors: errors});
      return;
    }
    const {email, password} = req.body;
    const user = await find({email});
    if (!user) {
      res.status(404).json({'error': 'user doesnt exist'});
    } else {
      const {token} = await authenticate({email, password});
      res.json({token});
    }
  } catch (error) {
    if (error instanceof IncorrectPasswordError) {
      res.status(401).json({'error': error.message});
    } else {
      res.status(500).json({'error': error.message});
    }
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.redirect('/');
  } catch (error) {
    res.status(401).json({'error': error.message});
  }
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};
