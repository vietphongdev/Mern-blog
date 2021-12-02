import mongoose from "mongoose";

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@mern-cluster.cg8gu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
