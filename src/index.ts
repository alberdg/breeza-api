import app from './app';
/**
 * Starts express server
 * * @function
 * */
const start = () => {
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}


start();
