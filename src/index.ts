import app from './app';
/**
 * Starts express server
 * * @function
 * */
const start = () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be initialized with a value');
  }
  
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}


start();
