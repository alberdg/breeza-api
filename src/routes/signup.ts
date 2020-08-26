import express, { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-requests';
import { BadRequestError } from '../errors/bad-request-error';
import { JWT } from '../services/jwt';

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/alberto/Downloads/ticketing-dev-12e5e40bc4c8.json"
const router = express.Router();

router.post('/users/signup', checkSchema({
  email: {
    in: ['body'],
    errorMessage: 'Email must be valid',
    isEmail: true,
  },
  password: {
    in: ['body'],
    errorMessage: 'Password must be between 4 and 20 characters',
    notEmpty: true,
  },
  username: {
    in: ['body'],
    errorMessage: 'User name cannot be empty',
    notEmpty: true
  },
  firstname: {
    in: ['body'],
    errorMessage: 'First name cannot be empty',
    notEmpty: true
  },
  lastname: {
    in: ['body'],
    errorMessage: 'Last name cannot be empty',
    notEmpty: true
  },
  address: {
    in: [ 'body' ],
    errorMessage: 'Address cannot be empty',
    notEmpty: true
  },
  typeOfUser: {
    in: [ 'body' ],
    errorMessage: 'Type of user cannot be empty',
    isInt: true
  },
  profession: {
    in: [ 'body' ],
    errorMessage: 'profession cannot be empty',
    notEmpty: true
  },
  longitude: {
    in: [ 'body' ],
    errorMessage: 'Longitude cannot be empty',
    notEmpty: true
  },
  latitude: {
    in: [ 'body' ],
    errorMessage: 'Latitude cannot be empty',
    notEmpty: true
  }
}),
validateRequest, async (req: Request, res: Response) => {
  const {
    email,
    password,
    username,
    firstname,
    lastname,
    address,
    typeOfUser,
    profession,
    longitude,
    latitude
  } = req.body;

  // Let's check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('Email is in use');
  }
  // Use factory to build a new user document
  const user = User.build({
    email,
    password,
    username,
    firstname,
    lastname,
    address,
    typeOfUser,
    profession,
    longitude,
    latitude
   });
  await user.save();


  // Generate json web token
  JWT.sign(req, user);

  // Succes, let's return the new user
  res.status(201).send(User.transform(user));
});

export { router as  signupRouter };
