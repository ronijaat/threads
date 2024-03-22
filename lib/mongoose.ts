import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('MongoDB URI is missing');
  }

  if (isConnected) {
    console.log('Already connected to DB');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'Thread',
    });
    isConnected = true;
    console.log('Connected to DB');
  } catch (err) {
    console.log('Error connecting to DB', err);
  }
};
