import request from 'supertest';
import app from '../../app';
import { User } from '../../models/user';

const body = {
"email": "test@test.com",
"password": "1234",
"username": "username",
"firstname": "Jonh12",
"lastname": "Doe",
"address": "267 Shenley Road, London, WD6 1TJ",
"typeOfUser": "1",
"profession": "Plumber",
"longitude": 40.336800,
"latitude": -3.651330
};

it('Returns a 201 on successful sign up', async () => {
  return request(app)
    .post('/users/signup')
    .send(body)
  .expect(201);
});

it('Returns a 400 on bad sign up request with not valid email ', async () => {
  return request(app)
    .post('/users/signup')
    .send({
    "email": "test@test.",
    "password": "1234",
  })
  .expect(400);
});


it('Returns a 400 on bad sign up request with no password ', async () => {
  return request(app)
    .post('/users/signup')
    .send({
    "email": "test@test.com",
    "password": "",
  })
  .expect(400);
});

it('Disallows duplicate emails', async () => {
  await request(app)
    .post('/users/signup')
    .send(body)
    .expect(201);
  await request(app)
    .post('/users/signup')
    .send(body)
    .expect(400);
});

it('Sets a cookie after successful sign up', async () => {
  const response = await request(app)
    .post('/users/signup')
    .send(body)
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
})

it('Creates a User after successful sign up', async () => {
  await request(app)
    .post('/users/signup')
    .send(body)
    .expect(201);
  const result = await User.findOne({ email: 'test@test.com' });
  expect(result).toBeDefined();
  expect(result?.email).toBe('test@test.com');
  expect(result?.password).not.toBe('1234');
  expect(result?.username).toBe('username');
  expect(result?.firstname).toBe('Jonh12');
  expect(result?.lastname).toBe('Doe');
  expect(result?.address).toBe('267 Shenley Road, London, WD6 1TJ');
  expect(result?.typeOfUser).toBe('1');
  expect(result?.profession).toBe('Plumber');
  expect(result?.location.coordinates[0]).toBe(40.336800);
  expect(result?.location.coordinates[1]).toBe(-3.65133);
});
