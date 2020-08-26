import app from './app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

/**
 * Connects to in memory mongo db instance
 * @function
 */
const connectToMongoDB = async () => {
  const mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

/**
 * Starts express server
 * * @function
 * */
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be initialized with a value');
  }

  try {
    await connectToMongoDB();

    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  } catch (err) {
    console.error(err);
  }
}


start();
