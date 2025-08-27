import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(chalk.green("MongoDB connected"));
  } catch (error) {
    console.error(chalk.red("MongoDB connection failed:"), error);
    process.exit(1);
  }
};

export default connectDB;
